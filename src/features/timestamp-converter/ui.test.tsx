import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import TimestampConverter from './ui';

describe('<TimestampConverter />', () => {
  it('should render', () => {
    render(<TimestampConverter />);

    expect(screen.getByText('찰나의 순간')).toBeInTheDocument();
    expect(screen.getByText('밀리초까지 잡아드림')).toBeInTheDocument();

    expect(screen.getByLabelText('Unix')).toBeInTheDocument();
    expect(screen.getByLabelText('DateTime')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /now/i })).toBeInTheDocument();
  });

  it('should convert unix timestamp to datetime', async () => {
    render(<TimestampConverter />);

    const unixInput = screen.getByLabelText('Unix');
    fireEvent.change(unixInput, { target: { value: '1700000000' } });

    await waitFor(() => {
      expect(screen.getByText('1700000000')).toBeInTheDocument();
    });
  });

  it('should auto-detect milliseconds', async () => {
    render(<TimestampConverter />);

    const unixInput = screen.getByLabelText('Unix');
    fireEvent.change(unixInput, { target: { value: '1700000000000' } });

    await waitFor(() => {
      expect(screen.getByText('1700000000')).toBeInTheDocument();
      expect(screen.getByText('1700000000000')).toBeInTheDocument();
    });
  });

  it('should fill current time on Now button click', async () => {
    render(<TimestampConverter />);

    const nowButton = screen.getByRole('button', { name: /now/i });
    fireEvent.click(nowButton);

    const unixInput = screen.getByLabelText('Unix');
    await waitFor(() => {
      expect((unixInput as HTMLInputElement).value).not.toBe('');
    });
  });
});
