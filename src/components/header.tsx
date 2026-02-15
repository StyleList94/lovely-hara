import { useSyncExternalStore } from 'react';
import { Header as HeaderContainer } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback);
  return () => window.removeEventListener('scroll', callback);
}

function getScrollSnapshot() {
  return window.scrollY > 0;
}

function getServerSnapshot() {
  return false;
}

const Header = () => {
  const showHeader = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot,
  );

  return (
    <HeaderContainer
      boxStyle="2xl:max-w-384"
      wrapperStyle={cn(
        'transition-transform ease-in-out duration-400',
        'border-b border-zinc-200/80 dark:border-zinc-800/80',
        showHeader ? 'translate-y-0' : '-translate-y-14',
      )}
    >
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
    </HeaderContainer>
  );
};

export default Header;
