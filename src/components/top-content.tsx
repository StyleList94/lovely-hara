import { cn } from '@/lib/utils';

import Typewriter from '@/components/ui/typewriter';

const lovelyThings = ['TypeScript', 'React', 'NEXT.JS', 'Styling', 'Web3'];

const TopContent = () => (
  <section className={cn('flex flex-col gap-5 pb-8')}>
    <div
      className={cn(
        'flex flex-col gap-1.5 sm:gap-3',
        'items-center md:items-start',
        'font-hero font-medium',
        'text-2xl sm:text-4xl md:text-5xl lg:text-6xl',
      )}
    >
      <h1>Stylish #Front-end</h1>
      <h2>
        Lovely <Typewriter texts={lovelyThings} />
      </h2>
    </div>
    <div
      className={cn(
        'flex flex-col gap-1',
        'items-center md:items-start',
        'text-zinc-500',
        'md:text-lg lg:text-xl',
      )}
    >
      <p>맵시나는 프런트엔드 엔지니어</p>
      <p>DApp, 디자인 시스템 구축이 주특기</p>
    </div>
  </section>
);

export default TopContent;
