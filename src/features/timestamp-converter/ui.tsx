'use client';

import { type ChangeEvent, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import {
  TextInput,
  Button,
  Code,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormControl,
} from '@stylelist94/nine-beauty-actress';

const toDatetimeLocalValue = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const TimestampConverter = () => {
  const [unixInput, setUnixInput] = useState('');
  const [datetimeInput, setDatetimeInput] = useState('');

  const handleUnixChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUnixInput(value);

    if (value === '') {
      setDatetimeInput('');
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num)) return;

    // 자동 감지: 10자리 = 초, 13자리 = 밀리초
    const ms = value.length >= 13 ? num : num * 1000;
    const date = new Date(ms);

    if (Number.isNaN(date.getTime())) return;
    setDatetimeInput(toDatetimeLocalValue(date));
  };

  const handleDatetimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDatetimeInput(value);

    if (value === '') {
      setUnixInput('');
      return;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    setUnixInput(String(Math.floor(date.getTime() / 1000)));
  };

  const handleNow = () => {
    const now = new Date();
    setUnixInput(String(Math.floor(now.getTime() / 1000)));
    setDatetimeInput(toDatetimeLocalValue(now));
  };

  const formattedResults = useMemo(() => {
    if (!unixInput) return null;
    const num = Number(unixInput);
    if (Number.isNaN(num)) return null;

    const ms = unixInput.length >= 13 ? num : num * 1000;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) return null;

    return [
      { label: 'Unix (s)', value: String(Math.floor(date.getTime() / 1000)) },
      { label: 'Unix (ms)', value: String(date.getTime()) },
      { label: 'ISO 8601', value: date.toISOString() },
      {
        label: 'Local',
        value: format(date, 'yyyy-MM-dd HH:mm:ss'),
      },
    ];
  }, [unixInput]);

  const handleClickCopy = (value: string) => async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success('Copied!', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch {
      /* empty */
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>찰나의 순간</CardTitle>
        <CardDescription>밀리초까지 잡아드림</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <FormControl>
          <FormControl.Label>Unix</FormControl.Label>
          <div className="flex items-center gap-1">
            <TextInput
              type="number"
              placeholder="1740000000"
              value={unixInput}
              onChange={handleUnixChange}
            />
            <Button
              variant="outline"
              className="flex-none"
              onClick={handleNow}
            >
              Now
            </Button>
          </div>
        </FormControl>

        <FormControl>
          <FormControl.Label>DateTime</FormControl.Label>
          <TextInput
            type="datetime-local"
            step="1"
            className="dark:[&::-webkit-calendar-picker-indicator]:invert"
            value={datetimeInput}
            onChange={handleDatetimeChange}
          />
        </FormControl>
      </CardContent>

      {formattedResults && (
        <CardFooter className="flex flex-col items-end! gap-1">
          {formattedResults.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={handleClickCopy(item.value)}
            >
              <Code>{item.value}</Code>
            </button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default TimestampConverter;
