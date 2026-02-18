import { useEffect } from 'react';
import { motion } from 'motion/react';

import { Cursor } from 'motion-plus/react';

import { cn } from '@/shared/lib/utils';

import ScrambleTextCycle from '@/shared/ui/scramble-text';
import Typewriter from '@/shared/ui/typewriter';

const lovelyThings = ['TypeScript', 'React', 'Next.js', 'Astro', 'tailwindcss'];

const scrambleTexts = ['Frontend', 'Design', 'Web3'];

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
    <section className={cn('flex flex-col gap-5 items-center select-none')}>
      <Cursor
        className="bg-zinc-800/80! dark:bg-zinc-200/80!"
        variants={{ text: { backgroundColor: 'currentColor' } }}
      />
      <div className="flex flex-col gap-8 items-start">
        <div
          className={cn(
            'flex flex-col gap-1.5 sm:gap-3',
            'font-hero font-light tracking-wide',
            'text-2xl sm:text-4xl md:text-5xl lg:text-6xl',
          )}
        >
          <h1 className="whitespace-nowrap">
            Stylish #
            <span className="relative inline-block text-left">
              <span className="invisible">Frontend</span>
              <span className="absolute inset-0">
                <ScrambleTextCycle texts={scrambleTexts} />
              </span>
            </span>
          </h1>
          <h2 className="whitespace-nowrap">
            Lovely{' '}
            <span className="relative inline-block text-left">
              <span className="invisible">tailwindcss</span>
              <span className="absolute inset-0">
                <Typewriter texts={lovelyThings} />
              </span>
            </span>
          </h2>
        </div>
        <div
          className={cn(
            'flex flex-col gap-1',
            'text-zinc-500',
            'md:text-lg lg:text-xl',
          )}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            맵시나는 프런트엔드 엔지니어
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            주특기는 DApp 그리고 디자인 시스템
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href="https://5k.gg/gh94"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-zinc-300 no-underline hover:underline underline-offset-4 hover:text-white transition-colors md:text-base dark:text-zinc-300 dark:hover:text-white"
        >
          5k.gg/gh94
        </motion.a>
      </div>
    </section>
  );
};

export default TopContent;
