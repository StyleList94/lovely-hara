import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import StringMaker from '../string-maker';

describe('<StringMaker />', () => {
  it('should render', () => {
    render(<StringMaker />);

    expect(screen.getByText('String Maker')).toBeInTheDocument();
    expect(screen.getByText('EVM 주소를 처리하고 싶어!')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('16진수 40개 같은 거...'),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /single/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /double/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /TL/i })).toBeInTheDocument();
  });

  it('should be copied string', async () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      },
    });

    render(<StringMaker />);

    const {
      clipboard: { writeText },
    } = navigator;

    const inputElement = screen.getByPlaceholderText('16진수 40개 같은 거...');

    fireEvent.change(inputElement, {
      target: { value: '0x29072219f93D6893F9201Adfc31246169e785252' },
    });

    const buttonSingle = screen.getByRole('button', { name: /single/i });
    fireEvent.click(buttonSingle);
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        "'0x29072219f93D6893F9201Adfc31246169e785252'",
      );
    });

    const buttonDouble = screen.getByRole('button', { name: /double/i });
    fireEvent.click(buttonDouble);
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        '"0x29072219f93D6893F9201Adfc31246169e785252"',
      );
    });

    const buttonTemplate = screen.getByRole('button', { name: /TL/i });
    fireEvent.click(buttonTemplate);
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        '`0x29072219f93D6893F9201Adfc31246169e785252`',
      );
    });
  });
});
