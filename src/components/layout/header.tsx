import Link from 'next/link';
import {
  headerContainerStyle,
  headerContentBoxStyle,
} from '@stylelist94/nine-beauty-actress/styles';

import Icon from '@/assets/icons';
import { cn } from '@/lib/utils';

import ThemeControlSwitch from '@/components/theme-control-switch';
import Separator from '@/components/ui/separator';

const Header = () => (
  <>
    <header className={headerContainerStyle}>
      <div className={cn(headerContentBoxStyle, '2xl:max-w-[96rem]')}>
        <div className="flex justify-between w-full select-none">
          <Link
            href="/"
            className="flex items-end gap-0.5 font-display text-xl tracking-wide"
          >
            StyleList94
            <span className="text-sm leading-relaxed tracking-wider">.DEV</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/StyleList94"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'size-6',
                'flex items-center justify-center text-2xl text-neutral-700',
                'rounded-lg bg-white hover:bg-neutral-100',
                'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
                'transition duration-200 ease-in-out',
              )}
            >
              <Icon.BrandGithub className="size-5" />
            </a>
            <Separator orientation="vertical" className="!h-5" />
            <ThemeControlSwitch />
          </div>
        </div>
      </div>
    </header>
    <div className="h-14" />
  </>
);

export default Header;
