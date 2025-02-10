import Link from 'next/link';

import { cn } from '@/lib/utils';

import ThemeControlSwitch from '@/components/theme-control-switch';
import Icon from '@/assets/icons';

const Header = () => (
  <>
    <header
      className={cn(
        'fixed top-0 left-0 flex w-full h-16 z-10',
        'border-b border-b-gray-200/80 dark:border-b-gray-700/80',
        'bg-white dark:bg-neutral-900',
        'transition ease-in-out duration-200',
      )}
    >
      <div
        className={cn(
          'flex items-center w-full 2xl:max-w-[96rem] px-6 py-4 mx-auto',
        )}
      >
        <div className="flex justify-between w-full select-none">
          <Link
            href="/"
            className="flex items-end gap-0.5 font-display text-xl tracking-wide"
          >
            StyleList94
            <span className="text-sm leading-relaxed tracking-wider">.DEV</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeControlSwitch />
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-8 h-8',
                'flex items-center justify-center text-2xl text-neutral-700',
                'rounded-lg bg-white hover:bg-neutral-100',
                'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
                'transition duration-200 ease-in-out',
              )}
            >
              <Icon.BrandGithub />
            </a>
          </div>
        </div>
      </div>
    </header>
    <div className="h-16" />
  </>
);

export default Header;
