'use client';

import { type ChangeEvent, useMemo, useState } from 'react';

import {
  TextInput,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormControl,
} from '@stylelist94/nine-beauty-actress';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const presets = [
  { label: '16:9', w: 16, h: 9 },
  { label: '4:3', w: 4, h: 3 },
  { label: '1:1', w: 1, h: 1 },
  { label: '21:9', w: 21, h: 9 },
];

const AspectRatio = () => {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const ratio = useMemo(() => {
    const w = Number(width);
    const h = Number(height);
    if (!w || !h || w <= 0 || h <= 0) return null;

    const divisor = gcd(Math.round(w), Math.round(h));
    return `${Math.round(w) / divisor}:${Math.round(h) / divisor}`;
  }, [width, height]);

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handlePreset = (w: number, h: number) => () => {
    const currentWidth = Number(width) || 1920;
    const newHeight = Math.round((currentWidth / w) * h);
    setWidth(String(currentWidth));
    setHeight(String(newHeight));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>비율이 맞아야</CardTitle>
        <CardDescription>보기 좋잖아</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FormControl className="flex-1">
            <FormControl.Label>Width</FormControl.Label>
            <TextInput
              type="number"
              placeholder="1920"
              value={width}
              onChange={handleWidthChange}
            />
          </FormControl>
          <span className="mt-5 text-zinc-400">:</span>
          <FormControl className="flex-1">
            <FormControl.Label>Height</FormControl.Label>
            <TextInput
              type="number"
              placeholder="1080"
              value={height}
              onChange={handleHeightChange}
            />
          </FormControl>
        </div>
        <div className="flex items-center gap-1">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              className="flex-1"
              variant="secondary"
              size="sm"
              onClick={handlePreset(preset.w, preset.h)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </CardContent>

      {ratio && (
        <CardFooter>
          <p className="text-lg font-mono font-semibold">{ratio}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AspectRatio;
