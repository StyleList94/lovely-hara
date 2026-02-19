import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Base64Codec from './ui';

describe('<Base64Codec />', () => {
  it('should render', () => {
    render(<Base64Codec />);

    expect(screen.getByText('인코딩은')).toBeInTheDocument();
    expect(screen.getByText('Base64로 충분해')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('텍스트 또는 Base64 문자열'),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /encode/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decode/i })).toBeInTheDocument();
  });

  it('should encode text to base64', async () => {
    render(<Base64Codec />);

    const input = screen.getByPlaceholderText('텍스트 또는 Base64 문자열');
    fireEvent.change(input, { target: { value: 'Hello' } });

    const encodeButton = screen.getByRole('button', { name: /encode/i });
    fireEvent.click(encodeButton);

    await waitFor(() => {
      expect(screen.getByText('SGVsbG8=')).toBeInTheDocument();
    });
  });

  it('should decode base64 to text', async () => {
    render(<Base64Codec />);

    const input = screen.getByPlaceholderText('텍스트 또는 Base64 문자열');
    fireEvent.change(input, { target: { value: 'SGVsbG8=' } });

    const decodeButton = screen.getByRole('button', { name: /decode/i });
    fireEvent.click(decodeButton);

    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('should handle unicode text', async () => {
    render(<Base64Codec />);

    const input = screen.getByPlaceholderText('텍스트 또는 Base64 문자열');
    fireEvent.change(input, { target: { value: '안녕하세요' } });

    const encodeButton = screen.getByRole('button', { name: /encode/i });
    fireEvent.click(encodeButton);

    await waitFor(() => {
      const result = screen.getByText('7JWI64WV7ZWY7IS47JqU');
      expect(result).toBeInTheDocument();
    });
  });

  it('should show error for invalid base64', async () => {
    render(<Base64Codec />);

    const input = screen.getByPlaceholderText('텍스트 또는 Base64 문자열');
    fireEvent.change(input, { target: { value: '!!!invalid!!!' } });

    const decodeButton = screen.getByRole('button', { name: /decode/i });
    fireEvent.click(decodeButton);

    await waitFor(() => {
      expect(
        screen.getByText('유효하지 않은 Base64 문자열'),
      ).toBeInTheDocument();
    });
  });
});
