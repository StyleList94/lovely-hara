import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

import { Cursor } from 'motion-plus/react';

import { cn } from '@/shared/lib/utils';

import ScrambleTextCycle from '@/shared/ui/scramble-text';
import Typewriter from '@/shared/ui/typewriter';

const LOVELY_THINGS = [
  'TypeScript',
  'React',
  'Next.js',
  'Astro',
  'tailwindcss',
  'Vite',
  'Vitest',
  'Zustand',
];
const SCRAMBLE_TEXTS = ['Frontend', 'Design', 'Web3'];

const useCombinedOpacity = (
  entrance: MotionValue<number>,
  scroll: MotionValue<number>,
) =>
  useTransform([entrance, scroll], ([e, s]) => (e as number) * (s as number));

const useEntrance = (initial: number) => useMotionValue(initial);

const TopContent = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -100],
  );
  const descY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -400],
  );
  const linkY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -600],
  );
  const scrollDescOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1, shouldReduceMotion ? 1 : 0],
  );
  const scrollLinkOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, shouldReduceMotion ? 1 : 0],
  );

  const entranceDescOpacity1 = useEntrance(shouldReduceMotion ? 1 : 0);
  const entranceDescY1 = useEntrance(0);
  const entranceDescOpacity2 = useEntrance(shouldReduceMotion ? 1 : 0);
  const entranceDescY2 = useEntrance(0);
  const entranceLinkOpacity = useEntrance(shouldReduceMotion ? 1 : 0);

  const descOpacity1 = useCombinedOpacity(
    entranceDescOpacity1,
    scrollDescOpacity,
  );
  const descOpacity2 = useCombinedOpacity(
    entranceDescOpacity2,
    scrollDescOpacity,
  );
  const linkOpacity = useCombinedOpacity(
    entranceLinkOpacity,
    scrollLinkOpacity,
  );

  useEffect(() => {
    if (shouldReduceMotion) return;
    animate(entranceDescOpacity1, 1, { duration: 0.6, delay: 0.1 });
    animate(entranceDescY1, 0, { duration: 0.6, delay: 0.1 });
    animate(entranceDescOpacity2, 1, { duration: 0.6, delay: 0.3 });
    animate(entranceDescY2, 0, { duration: 0.6, delay: 0.3 });
    animate(entranceLinkOpacity, 1, { duration: 0.6, delay: 0.4 });
  }, [
    shouldReduceMotion,
    entranceDescOpacity1,
    entranceDescY1,
    entranceDescOpacity2,
    entranceDescY2,
    entranceLinkOpacity,
  ]);

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
    <div ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-dvh overflow-hidden flex items-center justify-center">
        <section className="flex flex-col gap-5 items-center select-none">
          <Cursor
            className="bg-zinc-800/80! dark:bg-zinc-200/80!"
            variants={{ text: { backgroundColor: 'currentColor' } }}
          />
          <div className="flex flex-col gap-8 items-start">
            <motion.div
              style={{ y: titleY }}
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
                    <ScrambleTextCycle texts={SCRAMBLE_TEXTS} />
                  </span>
                </span>
              </h1>
              <h2 className="whitespace-nowrap">
                Lovely{' '}
                <span className="relative inline-block text-left">
                  <span className="invisible">tailwindcss</span>
                  <span className="absolute inset-0">
                    <Typewriter texts={LOVELY_THINGS} />
                  </span>
                </span>
              </h2>
            </motion.div>
            <motion.div
              style={{ y: descY }}
              className={cn(
                'flex flex-col gap-1',
                'text-zinc-500',
                'md:text-lg lg:text-xl',
              )}
            >
              <motion.p style={{ opacity: descOpacity1, y: entranceDescY1 }}>
                맵시나는 프런트엔드 엔지니어
              </motion.p>
              <motion.p style={{ opacity: descOpacity2, y: entranceDescY2 }}>
                주특기는 DApp 그리고 디자인 시스템
              </motion.p>
            </motion.div>
            <motion.div style={{ y: linkY, opacity: linkOpacity }}>
              <a
                href="https://5k.gg/gh94"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'font-mono text-sm md:text-base',
                  'no-underline hover:underline underline-offset-4',
                  'text-zinc-500 hover:text-zinc-900',
                  'dark:text-zinc-300 dark:hover:text-white',
                  'transition-colors',
                )}
              >
                5k.gg/gh94
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TopContent;
