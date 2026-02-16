import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import UnitConverter from './ui';

describe('<UnitConverter />', () => {
  it('should render', () => {
    render(<UnitConverter />);

    expect(screen.getByText('사이즈는')).toBeInTheDocument();
    expect(screen.getByText('4배수가 진리')).toBeInTheDocument();

    expect(screen.getByLabelText('px')).toBeInTheDocument();
    expect(screen.getByLabelText('rem')).toBeInTheDocument();
  });

  it('convert both px and rem', async () => {
    render(<UnitConverter />);

    const pxElement = screen.getByLabelText('px');
    fireEvent.change(pxElement, { target: { value: '16' } });
    expect(screen.getByDisplayValue('16')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    fireEvent.change(pxElement, { target: { value: '40' } });
    expect(screen.getByDisplayValue('40')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue('2.5')).toBeInTheDocument();
    });

    const remElement = screen.getByLabelText('rem');
    fireEvent.change(remElement, { target: { value: '3.125' } });
    expect(screen.getByDisplayValue('3.125')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue('50')).toBeInTheDocument();
    });
  });
});
