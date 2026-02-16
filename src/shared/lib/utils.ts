import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BigNumber } from 'bignumber.js';

import { hexColorWithAlphaRegex, rgbRegex } from './regex';

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const rgbToHex = (rgbString: string) => {
  const match = rgbString.match(rgbRegex);

  if (!match) return null;

  const toHex = (value: string): string => {
    if (value.includes('%')) {
      return Math.round((parseFloat(value) / 100) * 255)
        .toString(16)
        .padStart(2, '0');
    }
    return parseInt(value, 10).toString(16).padStart(2, '0');
  };

  const [r, g, b] = match.slice(1, 4);

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hexToRGB = (
  hex: string,
  { includeAlpha = false }: { includeAlpha?: boolean } = {},
) => {
  if (!hexColorWithAlphaRegex.test(hex)) return null;

  let hexColor = hex.replace(/^#/, '');

  if (hexColor.length === 3) {
    hexColor = hexColor
      .split('')
      .map((char) => char + char)
      .join('');
  } else if (hexColor.length === 4) {
    hexColor = hexColor
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const hasAlpha = hexColor.length === 8;

  const hexValue = parseInt(hexColor, 16);
  const r = (hexValue >> (hasAlpha ? 24 : 16)) & 255;
  const g = (hexValue >> (hasAlpha ? 16 : 8)) & 255;
  const b = (hexValue >> (hasAlpha ? 8 : 0)) & 255;
  const a = hasAlpha ? ((hexValue & 255) / 255).toFixed(2) : 1;

  return hasAlpha || includeAlpha
    ? `rgb(${r} ${g} ${b} / ${a})`
    : `rgb(${r} ${g} ${b})`;
};

export const hexToHSL = (
  hex: string,
  { includeAlpha = false }: { includeAlpha?: boolean } = {},
) => {
  if (!hexColorWithAlphaRegex.test(hex)) return null;

  let expandedHex = hex.slice(1);
  if (expandedHex.length === 3 || expandedHex.length === 4) {
    expandedHex = expandedHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(expandedHex.substring(0, 2), 16);
  const g = parseInt(expandedHex.substring(2, 4), 16);
  const b = parseInt(expandedHex.substring(4, 6), 16);

  const alphaHex =
    expandedHex.length === 8 ? expandedHex.substring(6, 8) : 'ff';
  const a = parseFloat(
    new BigNumber(parseInt(alphaHex, 16)).dividedBy(255).toFixed(2),
  );

  const rNorm = new BigNumber(r).dividedBy(255).toNumber();
  const gNorm = new BigNumber(g).dividedBy(255).toNumber();
  const bNorm = new BigNumber(b).dividedBy(255).toNumber();

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = new BigNumber(max).minus(min).toNumber();

  let h = 0;
  let s = 0;
  const l = new BigNumber(max).plus(min).dividedBy(2).toNumber();

  if (delta !== 0) {
    s =
      l > 0.5
        ? new BigNumber(delta)
            .dividedBy(new BigNumber(2).minus(max).minus(min).toNumber())
            .toNumber()
        : new BigNumber(delta)
            .dividedBy(new BigNumber(max).plus(min).toNumber())
            .toNumber();

    switch (max) {
      case rNorm:
        h = new BigNumber(gNorm)
          .minus(bNorm)
          .dividedBy(delta)
          .plus(gNorm < bNorm ? 6 : 0)
          .mod(6)
          .toNumber();
        break;
      case gNorm:
        h = new BigNumber(bNorm)
          .minus(rNorm)
          .dividedBy(delta)
          .plus(2)
          .toNumber();
        break;
      case bNorm:
      default:
        h = new BigNumber(rNorm)
          .minus(gNorm)
          .dividedBy(delta)
          .plus(4)
          .toNumber();
        break;
    }

    h = Math.round(new BigNumber(h).multipliedBy(60).toNumber());
  }

  s = Math.round(parseFloat(new BigNumber(s).multipliedBy(100).toFixed(1)));
  const lPercent = Math.round(
    parseFloat(new BigNumber(l).multipliedBy(100).toFixed(1)),
  );

  if (alphaHex !== 'ff' || includeAlpha) {
    return `hsl(${h} ${s}% ${lPercent}% / ${a})`;
  }
  return `hsl(${h} ${s}% ${lPercent}%)`;
};

export const isFileAccepted = (file: File, accept?: string) => {
  if (!accept) return true; // accept 미설정 시 모두 허용

  const acceptList = accept.split(',').map((s) => s.trim().toLowerCase());

  const fileMime = file.type.toLowerCase();
  const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;

  return acceptList.some((acceptItem) => {
    if (acceptItem.startsWith('.')) {
      // 확장자 비교
      return fileExt === acceptItem;
    }
    if (acceptItem.endsWith('/*')) {
      // 와일드카드 MIME 타입 비교 (예: image/*)
      const baseType = acceptItem.replace('/*', '');
      return fileMime.startsWith(baseType);
    }
    // 정확한 MIME 타입 비교
    return fileMime === acceptItem;
  });
};
