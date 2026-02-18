import { useState } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';

import { cn } from '../lib/utils';

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);

  useMotionValueEvent(scrollY, 'change', (current) => {
    setHidden(current <= 0);
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        className={cn(
          'fixed top-0 left-0 w-full h-14 z-10',
          'border-b border-zinc-200/80 dark:border-zinc-800/80',
          'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md',
        )}
        animate={{ y: hidden ? -56 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex items-center w-full h-full px-6 mx-auto 2xl:max-w-384">
          <div className="flex justify-between items-center w-full select-none text-black dark:text-white">
            <a
              className="flex items-end gap-0.5 font-display text-lg tracking-wide"
              href="/"
            >
              s94
            </a>
            <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
              {window.location.pathname.slice(1) || 'home'}
            </span>
          </div>
        </div>
      </m.header>
      <div className="mt-14" />
    </LazyMotion>
  );
};

export default Header;
