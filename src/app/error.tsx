'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-12 w-full max-w-[500px] h-screen mx-auto py-16 px-6 text-black dark:text-white">
      <h2 className="text-2xl">뭔가 잘못되었습니다!</h2>

      {process.env.NODE_ENV === 'development' && (
        <div className="w-80 h-[200px] overflow-auto p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <p>{error.stack}</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={() => reset()}>
          다시 시도하기
        </Button>

        <Button variant="link" size="lg" asChild>
          <Link href="/">메인 페이지</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2 select-none">
        <p className="flex items-end gap-0.5 font-display text-xl tracking-wide">
          StyleList94
          <span className="text-sm leading-relaxed tracking-wider">.DEV</span>
        </p>
      </div>
    </div>
  );
}
