import { cn } from '@/lib/utils';

import Container from '@/components/layout/container';
import ColorPicker from '@/components/color-picker';
import StringMaker from '@/components/string-maker';
import UnitConverter from '@/components/unit-converter';
import IconConverter from '@/components/icon-converter';
import SpringSimulator from '@/components/spring-simulator';
import SearchExplore from '@/components/search-explore';
import PlayBall from '@/components/play-ball';
import TwBreakpoint from '@/components/tw-breakpoint';
import BlogFeed from '@/components/blog-feed';

export default async function IndexPage() {
  return (
    <Container>
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
      <div
        className={cn(
          'grid grid-cols-1 gap-4',
          'md:grid-cols-2 md:items-start',
        )}
      >
        <div
          className={cn(
            'grid grid-cols-1 gap-4',
            'md:items-start',
            'xl:grid-cols-2',
          )}
        >
          <div className={cn('grid grid-cols-1 gap-4')}>
            <ColorPicker />
            <SearchExplore />
            <BlogFeed />
          </div>
          <div className={cn('grid grid-cols-1 gap-4')}>
            <StringMaker />
            <PlayBall />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gird-cols-1 gap-4">
            <SpringSimulator />
          </div>
          <div
            className={cn(
              'grid grid-cols-1 gap-4',
              'md:items-start',
              'xl:grid-cols-2',
            )}
          >
            <div className={cn('grid grid-cols-1 gap-4')}>
              <TwBreakpoint />
            </div>
            <div className={cn('grid grid-cols-1 gap-4')}>
              <UnitConverter />
              <IconConverter />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
