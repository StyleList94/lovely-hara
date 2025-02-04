'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type StringType = 'single' | 'double' | 'template';

const IconCheck = () => (
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

const IconCopy = () => (
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

const actionItems = [
  {
    id: 'single' as const,
    label: 'Single',
  },
  {
    id: 'double' as const,
    label: 'Double',
  },
  {
    id: 'template' as const,
    label: 'TL',
    detailLabel: 'Template literals',
  },
];

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
        'flex flex-col gap-6 p-5 rounded-md bg-muted/30 shadow-sm',
        'w-full max-w-96',
      )}
    >
      <h2 className="text-lg">String Maker</h2>

      <div className="flex flex-col items-center gap-2">
        <Input
          placeholder="something..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="flex items-center gap-1 w-full">
          <TooltipProvider>
            {actionItems.map((item) => (
              <Tooltip
                open={item.detailLabel ? undefined : false}
                key={`string-maker-action-${item.id}`}
              >
                <TooltipTrigger asChild>
                  <Button
                    className="flex-1"
                    variant="secondary"
                    onClick={handleClickToCopy(item.id)}
                  >
                    {targetSuccessCopy === item.id ? (
                      <IconCheck />
                    ) : (
                      <IconCopy />
                    )}
                    {item.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{item.detailLabel}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default StringMaker;
