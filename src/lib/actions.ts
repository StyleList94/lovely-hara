'use server';

import sharp from 'sharp';

export const convertToICO = async (file: File) => {
  const ICO_SIZE_GROUP = [16, 24, 32, 48, 64, 128, 256];

  // 1. 파일 유효성 검사
  if (!file.type.startsWith('image/png')) {
    throw new Error('PNG 이미지만 업로드 가능합니다');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('5MB 이하 파일만 허용됩니다');
  }

  // 2. 이미지 메타데이터 추출
  const buffer = Buffer.from(await file.arrayBuffer());
  const metadata = await sharp(buffer).metadata();

  if (metadata.width === undefined || metadata.height === undefined) {
    throw new Error('이미지 크기를 읽을 수 없습니다');
  }

  // 3. 생성할 ICO 크기 계산 (원본 크기 이하만 선택)
  const targetSizes = ICO_SIZE_GROUP.filter(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (size) => size <= metadata.width! && size <= metadata.height!,
  );

  if (targetSizes.length === 0) {
    throw new Error('최소 16x16px 이상 이미지가 필요합니다');
  }

  // 4. 모든 크기로 리사이즈
  const resizePromises = targetSizes.map(async (size) =>
    sharp(buffer).resize(size, size, { fit: 'cover' }).png().toBuffer(),
  );

  const pngBuffers = await Promise.all(resizePromises);

  // 5. ICO 헤더 생성 (6바이트)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved (0)
  header.writeUInt16LE(1, 2); // Type: 1=ICO
  header.writeUInt16LE(pngBuffers.length, 4); // 이미지 개수

  // 6. 디렉토리 엔트리 & 이미지 데이터 준비
  let offset = 6 + pngBuffers.length * 16; // 헤더 + 디렉토리 엔트리 총 크기
  const directoryEntries: Buffer[] = [];
  const imageBuffers: Buffer[] = [];
  targetSizes.forEach((size, index) => {
    const entry = Buffer.alloc(16);
    const width = size >= 256 ? 0 : size; // 256px 이상은 0으로 표기

    const pngBuffer = pngBuffers[index];

    entry.writeUInt8(width, 0); // Width
    entry.writeUInt8(width, 1); // Height
    entry.writeUInt8(0, 2); // Color count (0: 256+ colors)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel (32bpp)
    entry.writeUInt32LE(pngBuffer.length, 8); // Image data size
    entry.writeUInt32LE(offset, 12); // Image data offset

    directoryEntries.push(entry);
    imageBuffers.push(pngBuffer);
    offset += pngBuffer.length; // 다음 이미지 오프셋 계산
  });

  // 7. 모든 버퍼 결합
  return {
    success: true,
    data: Buffer.concat([
      header,
      Buffer.concat(directoryEntries),
      ...imageBuffers,
    ]).toString('base64'),
  };
};
