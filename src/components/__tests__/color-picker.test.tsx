import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import ColorPicker from '../color-picker';

describe('<ColorPicker />', () => {
  it('should render default state', () => {
    render(<ColorPicker />);

    expect(screen.getByText('색시맵시')).toBeInTheDocument();
    expect(screen.getByText('다 똑같은 입술 색 아니었어?')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('hex 또는 rgb()')).toBeInTheDocument();
    expect(screen.getByLabelText('preview')).toBeInTheDocument();

    expect(screen.getByText('두근두근...')).toBeInTheDocument();
  });

  it('should show result color', () => {
    render(<ColorPicker />);

    const inputElement = screen.getByPlaceholderText('hex 또는 rgb()');
    const previewBox = screen.getByLabelText('preview');

    expect(previewBox).not.toHaveAttribute('style');

    fireEvent.change(inputElement, { target: { value: '#FFFFFF' } });
    expect(previewBox).toHaveStyle(`
      background-color: #FFFFFF;
    `);

    fireEvent.change(inputElement, { target: { value: '#ffffff' } });
    expect(previewBox).toHaveStyle(`
      background-color: #ffffff;
    `);

    fireEvent.change(inputElement, { target: { value: '#fff' } });
    expect(previewBox).toHaveStyle(`
      background-color: #fff;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(255, 255, 255)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #ffffff;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(0 0 0)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #000000;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(50% 50% 100%)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #8080ff;
    `);

    fireEvent.change(inputElement, {
      target: { value: 'rgb(25%, 50%, 100%)' },
    });
    expect(previewBox).toHaveStyle(`
      background-color: #4080ff;
    `);
  });

  it('should show copyable color', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      },
    });

    render(<ColorPicker />);

    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue();

    const inputElement = screen.getByPlaceholderText('hex 또는 rgb()');
    fireEvent.change(inputElement, { target: { value: '#FFFFFF' } });

    fireEvent.click(screen.getByRole('button', { name: /rgb\(255 255 255\)/ }));
    expect(writeText).toHaveBeenCalledWith('rgb(255 255 255)');

    fireEvent.click(
      screen.getByRole('button', { name: /rgb\(255 255 255 \/ 1\)/ }),
    );
    expect(writeText).toHaveBeenCalledWith('rgb(255 255 255 / 1)');

    fireEvent.click(screen.getByRole('button', { name: /hsl\(0 0% 100%\)/ }));
    expect(writeText).toHaveBeenCalledWith('hsl(0 0% 100%)');

    fireEvent.click(
      screen.getByRole('button', { name: /hsl\(0 0% 100% \/ 1\)/ }),
    );
    expect(writeText).toHaveBeenCalledWith('hsl(0 0% 100% / 1)');
  });
});
