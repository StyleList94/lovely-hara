'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/use-debounce';

import Input from '@/components/ui/input';
import Label from '@/components/ui/label';

type Unit = 'px' | 'rem';

const UnitConverter = () => {
  const [inputPixelValue, setInputPixelValue] = useState('');
  const [inputRemValue, setInputRemValue] = useState('');
  const [lastChangedValue, setLastChangedValue] = useState<Unit | null>(null);

  const debouncedPixelValue = useDebounce(inputPixelValue, 300);
  const debouncedRemValue = useDebounce(inputRemValue, 300);

  const handleChangeValue =
    (target: Unit) => (e: ChangeEvent<HTMLInputElement>) => {
      switch (target) {
        case 'px':
          setInputPixelValue(e.target.value);
          setLastChangedValue('px');
          break;
        case 'rem':
          setInputRemValue(e.target.value);
          setLastChangedValue('rem');
          break;
        default:
          break;
      }
    };

  useEffect(() => {
    if (lastChangedValue === 'px') {
      if (debouncedPixelValue !== '') {
        setInputRemValue(
          `${parseFloat((+debouncedPixelValue / 16).toFixed(4))}`,
        );
        return;
      }
      setInputRemValue('');
    } else if (lastChangedValue === 'rem') {
      if (debouncedRemValue !== '') {
        setInputPixelValue(
          `${parseFloat((+debouncedRemValue * 16).toFixed(4))}`,
        );
        return;
      }
      setInputPixelValue('');
    }
  }, [lastChangedValue, debouncedPixelValue, debouncedRemValue]);

  return (
    <div
      className={cn(
        'flex flex-col gap-6 p-5 rounded-md bg-muted/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-lg">Unit Converter</h2>

      <div className="flex flex-col items-center gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="px">px</Label>
          <Input
            id="px"
            type="number"
            placeholder="type px value"
            value={inputPixelValue}
            onChange={handleChangeValue('px')}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="rem">rem</Label>
          <Input
            id="rem"
            type="number"
            placeholder="type rem value"
            value={inputRemValue}
            onChange={handleChangeValue('rem')}
          />
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
