'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Tooltip } from '@nextui-org/react';

import { cn } from '@/lib/utils';

type StringType = 'single' | 'double' | 'template';

const IconCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
    />
  </svg>
);

const IconCopy = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2zm4-6V4z"
    />
  </svg>
);

const StringMaker = () => {
  const [inputText, setInputText] = useState('');
  const [targetSuccessCopy, setTargetSuccessCopy] = useState<StringType | null>(
    null,
  );

  const handleClickToCopy = (type: StringType) => async () => {
    try {
      switch (type) {
        case 'single':
          await navigator.clipboard.writeText(`'${inputText}'`);
          setTargetSuccessCopy('single');
          return;
        case 'template':
          await navigator.clipboard.writeText(`\`${inputText}\``);
          setTargetSuccessCopy('template');
          return;
        default:
          await navigator.clipboard.writeText(`"${inputText}"`);
          setTargetSuccessCopy('double');
      }
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (targetSuccessCopy) {
      timerId = setTimeout(() => setTargetSuccessCopy(null), 3000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [targetSuccessCopy]);

  return (
    <div
      className={cn(
        'flex flex-col gap-6 p-5 rounded-md bg-default-100/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-xl">String Maker</h2>

      <div className="flex flex-col items-center gap-2">
        <Input
          color="default"
          placeholder="something..."
          value={inputText}
          onValueChange={setInputText}
        />
        <div className="flex items-center gap-1 w-full">
          <Button
            className="flex-1"
            color="default"
            variant="bordered"
            onClick={handleClickToCopy('single')}
            endContent={targetSuccessCopy === 'single' ? IconCheck : IconCopy}
          >
            Single
          </Button>
          <Button
            className="flex-1"
            color="default"
            variant="bordered"
            onClick={handleClickToCopy('double')}
            endContent={targetSuccessCopy === 'double' ? IconCheck : IconCopy}
          >
            Double
          </Button>
          <Tooltip placement="bottom" showArrow content="template literals">
            <Button
              className="flex-1"
              color="default"
              variant="bordered"
              onClick={handleClickToCopy('template')}
              endContent={
                targetSuccessCopy === 'template' ? IconCheck : IconCopy
              }
            >
              TL
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default StringMaker;
