'use client';

import { useMemo, useState } from 'react';

import { hexColorRegex, rgbRegex } from '@/lib/regex';
import { cn, hexToHSL, hexToRGB, rgbToHex } from '@/lib/utils';
import Input from '@/components/ui/input';
import Code from '@/components/ui/code';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
        'flex flex-col gap-6 p-5 rounded-md bg-muted/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-lg">Color Picker</h2>

      <div className="flex items-center gap-2">
        <div
          className={cn('w-10 h-10 flex-none rounded-md border-2')}
          style={{
            backgroundColor: colorValue ?? 'transparent',
            borderColor: colorValue ?? 'hsl(var(--border))',
          }}
          aria-label="preview"
        />
        <Input
          placeholder="hex or rgb"
          value={inputColorValue}
          onChange={(e) => setInputColorValue(e.target.value)}
        />
      </div>

      {convertedValue && (
        <div className="flex flex-col items-end gap-2">
          <TooltipProvider delayDuration={0}>
            {convertedValue.map((item, index) => (
              <Tooltip key={`converted-${item}`}>
                <TooltipTrigger onClick={handleClickConvertedValue(index)}>
                  <Code>{item}</Code>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>copy</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
