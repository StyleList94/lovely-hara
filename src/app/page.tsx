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

export default function IndexPage() {
  return (
    <Container>
      <div
        className={cn(
          'grid grid-cols-1 gap-4 py-6',
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
