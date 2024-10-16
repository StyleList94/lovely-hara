'use client';

import { useMemo, useState } from 'react';
import { Code, Input, Tooltip } from '@nextui-org/react';

import { hexColorRegex, rgbRegex } from '@/lib/regex';
import { cn, hexToHSL, hexToRGB, rgbToHex } from '@/lib/utils';

const ColorPicker = () => {
  const [inputColorValue, setInputColorValue] = useState('');

  const colorValue = useMemo(() => {
    if (hexColorRegex.test(inputColorValue)) {
      return inputColorValue;
    }
    if (rgbRegex.test(inputColorValue)) {
      return rgbToHex(inputColorValue);
    }

    return null;
  }, [inputColorValue]);

  const convertedValue = useMemo(() => {
    if (colorValue) {
      return [
        colorValue,
        hexToRGB(colorValue) as string,
        hexToRGB(colorValue, { includeAlpha: true }) as string,
        hexToHSL(colorValue) as string,
        hexToHSL(colorValue, { includeAlpha: true }) as string,
      ];
    }

    return null;
  }, [colorValue]);

  const handleClickConvertedValue = (target: number) => async () => {
    if (!convertedValue) {
      return;
    }

    try {
      await navigator.clipboard.writeText(convertedValue[target]);
    } catch (error) {
      /* empty */
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6 p-5 rounded-md bg-default-100/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-xl">Color Picker</h2>

      <div className="flex items-center gap-2">
        <div
          className={cn('w-10 h-10 flex-none rounded-md border-2')}
          style={{
            backgroundColor: colorValue ?? 'transparent',
            borderColor: colorValue ?? 'hsl(var(--nextui-default-200)',
          }}
          aria-label="preview"
        />
        <Input
          color="default"
          placeholder="hex or rgb"
          value={inputColorValue}
          onValueChange={setInputColorValue}
        />
      </div>

      {convertedValue && (
        <div className="flex flex-col items-end gap-2">
          {convertedValue.map((item, index) => (
            <Tooltip
              placement="left"
              showArrow
              content="copy"
              key={`converted-${item}`}
            >
              <button type="button" onClick={handleClickConvertedValue(index)}>
                <Code>{item}</Code>
              </button>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
