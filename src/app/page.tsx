import LayoutContainer from '@/components/layout-container';
import ColorPicker from '@/components/color-picker';

export default function IndexPage() {
  return (
    <LayoutContainer>
      <div className="flex flex-col">
        <ColorPicker />
      </div>
    </LayoutContainer>
  );
}
