import { cn } from '@/lib/utils';

const TopContent = () => (
  <section
    className={cn(
      'flex flex-col items-center gap-1.5 pt-5 pb-8',
      'lg:items-start lg:gap-3',
    )}
  >
    <h1
      className={cn(
        'text-2xl font-extrabold tracking-tight text-balance',
        'md:text-3xl',
        'lg:text-4xl',
      )}
    >
      맵시나는 전단 유틸리티 모음
    </h1>
    <div
      className={cn(
        'text-base text-zinc-500',
        'dark:text-zinc-400',
        'lg:text-lg',
      )}
    >
      <p>본격 내맘대로 FE 기사 맞춤 도구</p>
    </div>
  </section>
);

export default TopContent;
