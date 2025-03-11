import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import ColorPicker from '../color-picker';

describe('<ColorPicker />', () => {
  it('should be render default state', () => {
    render(<ColorPicker />);

    expect(screen.getByText('Color Converter')).toBeInTheDocument();
    expect(
      screen.getByText('색상표현을 여러가지 형태로 변환해줍니다.'),
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText('hex or rgb')).toBeInTheDocument();
    expect(screen.getByLabelText('preview')).toBeInTheDocument();
  });

  it('should be show result color', () => {
    render(<ColorPicker />);

    const inputElement = screen.getByPlaceholderText('hex or rgb');
    const previewBox = screen.getByLabelText('preview');

    expect(previewBox).toHaveStyle(`
      background-color: rgba(0, 0, 0, 0);
      border-color: hsl(var(--border));
    `);

    fireEvent.change(inputElement, { target: { value: '#FFFFFF' } });
    expect(previewBox).toHaveStyle(`
      background-color: #FFFFFF;
      border-color: #FFFFFF;
    `);

    fireEvent.change(inputElement, { target: { value: '#ffffff' } });
    expect(previewBox).toHaveStyle(`
      background-color: #ffffff;
      border-color: #ffffff;
    `);

    fireEvent.change(inputElement, { target: { value: '#fff' } });
    expect(previewBox).toHaveStyle(`
      background-color: #fff;
      border-color: #fff;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(255, 255, 255)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #ffffff;
      border-color: #ffffff;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(0 0 0)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #000000;
      border-color: #000000;
    `);

    fireEvent.change(inputElement, { target: { value: 'rgb(50% 50% 100%)' } });
    expect(previewBox).toHaveStyle(`
      background-color: #8080ff;
      border-color: #8080ff;
    `);

    fireEvent.change(inputElement, {
      target: { value: 'rgb(25%, 50%, 100%)' },
    });
    expect(previewBox).toHaveStyle(`
      background-color: #4080ff;
      border-color: #4080ff;
    `);
  });

  it('should be show copyable color', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined), // 기본적으로 resolved promise 반환
        },
      },
    });

    render(<ColorPicker />);

    const {
      clipboard: { writeText },
    } = navigator;

    const inputElement = screen.getByPlaceholderText('hex or rgb');
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
