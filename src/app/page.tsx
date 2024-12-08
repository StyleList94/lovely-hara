import LayoutContainer from '@/components/layout-container';
import ColorPicker from '@/components/color-picker';
import StringMaker from '@/components/string-maker';
import UnitConverter from '@/components/unit-converter';

export default function IndexPage() {
  return (
    <LayoutContainer>
      <div className="flex flex-wrap items-start gap-2">
        <ColorPicker />
        <StringMaker />
        <UnitConverter />
      </div>
    </LayoutContainer>
  );
}
