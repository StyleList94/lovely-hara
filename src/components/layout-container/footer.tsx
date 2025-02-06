import { cn } from '@/lib/utils';

const Footer = () => (
  <footer
    className={cn(
      'flex flex-col gap-6 w-full max-w-[96rem] mx-auto px-6 py-8',
      'bg-white dark:bg-neutral-900',
    )}
  >
    <div
      className={cn(
        'flex flex-col gap-3',
        'sm:flex-row sm:justify-between sm:gap-4',
      )}
    >
      <div className="flex items-center gap-4 ">
        <a
          href="https://blog.stylelist94.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          Blog
        </a>
      </div>
    </div>
    <div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        © 2025.{' '}
        <a
          href="https://github.com/StyleList94"
          target="_blank"
          rel="noopener noreferrer"
        >
          StyleList94
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
