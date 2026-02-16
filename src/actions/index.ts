import type { IconConversionResult } from '@/features/icon-converter';

import { defineAction, ActionError } from 'astro:actions';
import { Jimp } from 'jimp';

export const server = {
  convertToICO: defineAction({
    accept: 'form',
    async handler(formData: FormData): Promise<IconConversionResult> {
      const file = formData.get('icon') as File;

      const ICO_SIZE_GROUP = [16, 24, 32, 48, 64, 128, 256];

      // 1. 파일 유효성 검사
      if (!file.type.startsWith('image/png')) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'PNG 이미지만 업로드 가능합니다',
        });
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: '5MB 이하 파일만 허용됩니다',
        });
      }

      try {
        // 2. 이미지 메타데이터 추출
        const buffer = Buffer.from(await file.arrayBuffer());

        const image = await Jimp.fromBuffer(buffer);

        if (!image.width || !image.height) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: '이미지 크기를 읽을 수 없습니다',
          });
        }

        // 3. ICO 크기 계산
        const targetSizes = ICO_SIZE_GROUP.filter(
          (size) => size <= image.width && size <= image.height,
        );

        if (targetSizes.length === 0) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: '최소 16x16px 이상 이미지가 필요합니다',
          });
        }

        // 4. 모든 크기로 리사이즈 및 PNG 버퍼 생성
        const resizePromises = targetSizes.map(async (size) => {
          const img = await Jimp.fromBuffer(buffer);
          img.resize({ w: size, h: size });
          return await img.getBuffer('image/png');
        });

        const pngBuffers = await Promise.all(resizePromises);

        // 5. ICO 헤더 생성
        const header = Buffer.alloc(6);
        header.writeUInt16LE(0, 0);
        header.writeUInt16LE(1, 2);
        header.writeUInt16LE(pngBuffers.length, 4);

        // 6. 디렉토리 엔트리 및 이미지 데이터 준비
        let offset = 6 + pngBuffers.length * 16;
        const directoryEntries: Buffer[] = [];
        const imageBuffers: Buffer[] = [];

        targetSizes.forEach((size, index) => {
          const entry = Buffer.alloc(16);
          const width = size >= 256 ? 0 : size;
          const pngBuffer = pngBuffers[index];

          entry.writeUInt8(width, 0); // Width
          entry.writeUInt8(width, 1); // Height
          entry.writeUInt8(0, 2); // Color count
          entry.writeUInt8(0, 3); // Reserved
          entry.writeUInt16LE(1, 4); // Color planes
          entry.writeUInt16LE(32, 6); // Bits per pixel
          entry.writeUInt32LE(pngBuffer.length, 8); // Image size
          entry.writeUInt32LE(offset, 12); // Offset

          directoryEntries.push(entry);
          imageBuffers.push(pngBuffer);
          offset += pngBuffer.length;
        });

        // 7. 모든 버퍼 결합 및 base64 인코딩 반환
        return {
          iconData: Buffer.concat([
            header,
            Buffer.concat(directoryEntries),
            ...imageBuffers,
          ]).toString('base64'),
        };
      } catch (error) {
        // ActionError는 그대로 throw
        if (error instanceof ActionError) {
          throw error;
        }
        // 그 외 에러는 서버 에러로 변환
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: '이미지 처리 중 오류 발생',
        });
      }
    },
  }),
};
