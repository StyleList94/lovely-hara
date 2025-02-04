import React from 'react';
import { cn } from '@/lib/utils';

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, children, ...props }, ref) => (
    <code
      className={cn(
        'px-2 py-1 h-fit font-mono font-normal inline-block whitespace-nowrap bg-default/40 text-default-700 text-small rounded-small',
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </code>
  ),
);

export default Code;
