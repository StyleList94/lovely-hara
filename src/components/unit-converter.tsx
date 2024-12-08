'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';

import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/use-debounce';

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
        'flex flex-col gap-6 p-5 rounded-md bg-default-100/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-xl">Unit Converter</h2>

      <div className="flex flex-col items-center gap-2">
        <Input
          color="default"
          type="number"
          placeholder="type px value"
          label="px"
          isClearable
          value={inputPixelValue}
          onChange={handleChangeValue('px')}
        />

        <Input
          color="default"
          type="number"
          placeholder="type rem value"
          label="rem"
          isClearable
          value={inputRemValue}
          onChange={handleChangeValue('rem')}
        />
      </div>
    </div>
  );
};

export default UnitConverter;
