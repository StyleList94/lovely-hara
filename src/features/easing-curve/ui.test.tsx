import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import EasingCurve from './ui';

describe('<EasingCurve />', () => {
  it('should render', () => {
    render(<EasingCurve />);

    expect(screen.getByText('곡선의 미학')).toBeInTheDocument();
    expect(screen.getByText('cubic-bezier')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('should render preset buttons', () => {
    render(<EasingCurve />);

    expect(screen.getByRole('button', { name: 'linear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'snap' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'expo' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'overshoot' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'iOS' })).toBeInTheDocument();
  });

  it('should display cubic-bezier value', () => {
    render(<EasingCurve />);

    expect(
      screen.getByText('cubic-bezier(0.25, 0.1, 0.25, 1)'),
    ).toBeInTheDocument();
  });

  it('should update values on preset click', async () => {
    render(<EasingCurve />);

    const linearButton = screen.getByRole('button', { name: 'linear' });
    fireEvent.click(linearButton);

    await waitFor(() => {
      expect(
        screen.getByText('cubic-bezier(0, 0, 1, 1)'),
      ).toBeInTheDocument();
    });
  });

  it('should copy on footer button click', async () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      },
    });

    render(<EasingCurve />);

    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue();

    const copyButton = screen.getByText('cubic-bezier(0.25, 0.1, 0.25, 1)');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        'cubic-bezier(0.25, 0.1, 0.25, 1)',
      );
    });
  });
});
