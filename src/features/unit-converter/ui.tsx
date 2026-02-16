'use client';

import { type ChangeEvent, useState } from 'react';

import {
  TextInput,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
} from '@stylelist94/nine-beauty-actress';

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
        <FormControl>
          <FormControl.Label>px</FormControl.Label>
          <TextInput
            type="number"
            placeholder="16"
            value={inputPixelValue}
            onChange={handleChangeValue('px')}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>rem</FormControl.Label>
          <TextInput
            type="number"
            placeholder="1"
            value={inputRemValue}
            onChange={handleChangeValue('rem')}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
