import { useEffect, useState } from 'react';
import { Header as HeaderContainer } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';

import Separator from '@/components/ui/separator';
import ThemeControlSwitch from '@/components/theme-control-switch';

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer
      boxStyle="2xl:max-w-384"
      wrapperStyle={cn(
        'transition-transform ease-in-out duration-400',
        'border-b border-zinc-200/80 dark:border-zinc-800/80',
        showHeader ? 'translate-y-0' : '-translate-y-14',
      )}
    >
      <div className="flex justify-between w-full select-none text-black dark:text-white">
        <a
          className="flex items-end gap-0.5 font-display text-xl tracking-wide"
          href="/"
        >
          StyleList94
          <span className="text-sm leading-relaxed tracking-wider"> .DEV </span>
        </a>
        <div className="flex items-center gap-2">
          <a
            className="size-6 flex items-center justify-center text-xl text-neutral-700 rounded-lg bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 transition duration-200 ease-in-out"
            href="https://github.com/StyleList94"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              aria-label="icon-github"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <Separator orientation="vertical" className="h-5!" />
          <ThemeControlSwitch />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
