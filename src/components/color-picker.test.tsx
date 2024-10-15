import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ColorPicker from '@/components/color-picker';

describe('<ColorPicker />', () => {
  it('should be render', () => {
    render(<ColorPicker />);

    expect(screen.getByText('Color Picker')).toBeInTheDocument();
  });
});
