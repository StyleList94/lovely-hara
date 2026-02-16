'use client';

import { useMemo, useState } from 'react';

import {
  TextInput,
  Code,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@stylelist94/nine-beauty-actress';

import { hexColorRegex, rgbRegex } from '@/shared/lib/regex';
import { cn, hexToHSL, hexToRGB, rgbToHex } from '@/shared/lib/utils';

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
    } catch {
      /* empty */
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>색시맵시</CardTitle>
        <CardDescription>다 똑같은 입술 색 아니었어?</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <div
          className={cn(
            'w-10 h-10 flex-none rounded-md border-2',
            !colorValue && 'border-zinc-200 dark:border-white/10',
          )}
          style={
            colorValue
              ? { backgroundColor: colorValue, borderColor: colorValue }
              : undefined
          }
          aria-label="preview"
        />
        <TextInput
          placeholder="hex 또는 rgb()"
          value={inputColorValue}
          onChange={(e) => setInputColorValue(e.target.value)}
        />
      </CardContent>

      {convertedValue ? (
        <CardFooter className="flex flex-col items-end! gap-2">
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
              'flex justify-center items-center w-full h-43',
              'border border-dashed rounded-lg',
            )}
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              두근두근...
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default ColorPicker;
