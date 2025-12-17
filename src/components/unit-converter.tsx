'use client';

import { type ChangeEvent, useState } from 'react';

import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Unit = 'px' | 'rem';

const UnitConverter = () => {
  const [inputPixelValue, setInputPixelValue] = useState('');
  const [inputRemValue, setInputRemValue] = useState('');

  const handleChangeValue =
    (target: Unit) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      if (target === 'px') {
        setInputPixelValue(value);
        setInputRemValue(
          value !== '' ? `${parseFloat((+value / 16).toFixed(4))}` : '',
        );
      } else {
        setInputRemValue(value);
        setInputPixelValue(
          value !== '' ? `${parseFloat((+value * 16).toFixed(4))}` : '',
        );
      }
    };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>사이즈는</CardTitle>
        <CardDescription>4배수가 진리</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <Label htmlFor="px">px</Label>
          <Input
            id="px"
            type="number"
            placeholder="16"
            value={inputPixelValue}
            onChange={handleChangeValue('px')}
          />
        </div>

        <div className="grid w-full lg:max-w-sm items-center gap-1.5">
          <Label htmlFor="rem">rem</Label>
          <Input
            id="rem"
            type="number"
            placeholder="1"
            value={inputRemValue}
            onChange={handleChangeValue('rem')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
