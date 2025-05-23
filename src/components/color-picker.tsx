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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
        <CardDescription>가끔씩 RGB가 그리워...</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <div
          className={cn('w-10 h-10 flex-none rounded-md border-2')}
          style={{
            backgroundColor: colorValue ?? 'transparent',
            borderColor: colorValue ?? 'var(--border)',
          }}
          aria-label="preview"
        />
        <Input
          placeholder="hex 또는 rgb()"
          value={inputColorValue}
          onChange={(e) => setInputColorValue(e.target.value)}
        />
      </CardContent>

      {convertedValue ? (
        <CardFooter className="flex flex-col items-end gap-2">
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
        </CardFooter>
      ) : (
        <CardFooter className="flex flex-col">
          <div
            className={cn(
              'flex justify-center items-center w-full h-[10.75rem]',
              'border border-dashed rounded-lg',
            )}
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              결과를 기다리는 중...
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ColorPicker;
