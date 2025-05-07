import { cn } from '@/lib/utils';

import Container from '@/components/layout/container';
import ColorPicker from '@/components/color-picker';
import StringMaker from '@/components/string-maker';
import UnitConverter from '@/components/unit-converter';
import IcoConverter from '@/components/ico-converter';

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
          <ColorPicker />
          <StringMaker />
        </div>
        <div
          className={cn(
            'grid grid-cols-1 gap-4',
            'md:items-start',
            'xl:grid-cols-2',
          )}
        >
          <UnitConverter />
          <IcoConverter />
        </div>
      </div>
    </Container>
  );
}
