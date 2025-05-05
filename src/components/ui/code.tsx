import React from 'react';
import { cn } from '@/lib/utils';

const Code = ({
  className,
  children,
  ...props
}: React.ComponentProps<'code'>) => (
  <code
    className={cn(
      'px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-zinc-200/30 text-zinc-700 text-sm rounded-md',
      'dark:bg-zinc-600/40 dark:text-zinc-200',
      className,
    )}
    {...props}
  >
    {children}
  </code>
);

export default Code;
