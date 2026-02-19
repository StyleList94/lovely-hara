import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AspectRatio from './ui';

describe('<AspectRatio />', () => {
  it('should render', () => {
    render(<AspectRatio />);

    expect(screen.getByText('비율이 맞아야')).toBeInTheDocument();
    expect(screen.getByText('보기 좋잖아')).toBeInTheDocument();

    expect(screen.getByLabelText('Width')).toBeInTheDocument();
    expect(screen.getByLabelText('Height')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '16:9' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4:3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1:1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '21:9' })).toBeInTheDocument();
  });

  it('should calculate ratio from width and height', async () => {
    render(<AspectRatio />);

    const widthInput = screen.getByLabelText('Width');
    const heightInput = screen.getByLabelText('Height');

    fireEvent.change(widthInput, { target: { value: '1920' } });
    fireEvent.change(heightInput, { target: { value: '1080' } });

    await waitFor(() => {
      const results = screen.getAllByText('16:9');
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should calculate 4:3 ratio', async () => {
    render(<AspectRatio />);

    const widthInput = screen.getByLabelText('Width');
    const heightInput = screen.getByLabelText('Height');

    fireEvent.change(widthInput, { target: { value: '1600' } });
    fireEvent.change(heightInput, { target: { value: '1200' } });

    await waitFor(() => {
      const results = screen.getAllByText('4:3');
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should apply preset and calculate height', async () => {
    render(<AspectRatio />);

    const widthInput = screen.getByLabelText('Width');
    fireEvent.change(widthInput, { target: { value: '1920' } });

    const preset16x9 = screen.getByRole('button', { name: '16:9' });
    fireEvent.click(preset16x9);

    await waitFor(() => {
      expect(screen.getByLabelText('Height')).toHaveAttribute(
        'value',
        '1080',
      );
    });
  });
});
