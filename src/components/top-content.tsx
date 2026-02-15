import { useEffect } from 'react';

import { Button } from '@stylelist94/nine-beauty-actress';

import { Cursor } from 'motion-plus/react';


import { cn } from '@/lib/utils';

import Typewriter from '@/components/ui/typewriter';

const lovelyThings = [
  'TypeScript',
  'React',
  'Next.js',
  'Astro',
  'tailwindcss',
  'Web3',
];

const TopContent = () => {
  useEffect(() => {
    const secret = 'imweb';
    let buffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code.replace('Key', '').toLowerCase();
      if (key.length !== 1) return;

      buffer = buffer.concat(key).slice(-secret.length);
      if (buffer === secret) {
        window.open('https://imweb.me/invite?code=XERCCB', '_blank');
        buffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className={cn('flex flex-col gap-5 items-center')}>
      <Cursor
        className="bg-zinc-800/80! dark:bg-zinc-200/80!"
        variants={{ text: { backgroundColor: 'currentColor' } }}
      />
      <div
        className={cn(
          'flex flex-col gap-1.5 sm:gap-3',
          'items-center',
          'font-hero font-light tracking-wide',
          'text-2xl sm:text-4xl md:text-5xl lg:text-6xl',
        )}
      >
        <h1>Stylish #Frontend</h1>
        <h2>
          Lovely <Typewriter texts={lovelyThings} />
        </h2>
      </div>
      <div
        className={cn(
          'flex flex-col gap-1',
          'items-center',
          'text-zinc-500',
          'md:text-lg lg:text-xl',
        )}
      >
        <p>맵시나는 프런트엔드 엔지니어</p>
        <p>DApp 그리고 디자인 시스템 구축이 주특기</p>
      </div>
      <Button asChild variant="link" className="mt-2">
        <a href="https://5k.gg/gh94" target="_blank" rel="noopener noreferrer">
          5k.gg/gh94
        </a>
      </Button>
    </section>
  );
};

export default TopContent;
