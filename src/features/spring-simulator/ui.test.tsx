import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SpringSimulator from './ui';

const ResizeObserverMock = vi.fn(function ResizeObserverMock(this: ResizeObserver) {
  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
});
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const MutationObserverMock = vi.fn(function MutationObserverMock(this: MutationObserver) {
  this.observe = vi.fn();
  this.disconnect = vi.fn();
  this.takeRecords = vi.fn().mockReturnValue([]);
});
vi.stubGlobal('MutationObserver', MutationObserverMock);

describe('<SpringSimulator />', () => {
  it('should render', () => {
    render(<SpringSimulator />);

    expect(screen.getByText('스프링 테스터')).toBeInTheDocument();
    expect(
      screen.getByText('통통 튀는 애니메이션 만들기!'),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Stiffness/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Damping/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mass/i)).toBeInTheDocument();

    expect(screen.getAllByRole('slider')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /Copy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Replay/i })).toBeInTheDocument();
  });

  it('should change input and slider', () => {
    render(<SpringSimulator />);

    ['stiffness', 'damping', 'mass'].forEach((item, index) => {
      const inputElement = screen.getByLabelText<HTMLInputElement>(
        new RegExp(item, 'i'),
      );
      const sliderElement = screen.getAllByRole('slider')[index];

      fireEvent.change(inputElement, { target: { value: '10' } });
      expect(inputElement.value).toBe('10');

      fireEvent.keyDown(sliderElement, { key: 'ArrowRight' });
      expect(sliderElement).toHaveAttribute('aria-valuenow', '11');
    });
  });

  it('should not changde if value is greater than maximum', () => {
    render(<SpringSimulator />);

    const stiffnessInput =
      screen.getByLabelText<HTMLInputElement>(/Stiffness/i);
    const stiffnessSlider = screen.getAllByRole('slider')[0];

    fireEvent.change(stiffnessInput, { target: { value: '1001' } });
    expect(stiffnessInput.value).toBe('1000');

    fireEvent.keyDown(stiffnessSlider, { key: 'ArrowRight' });
    expect(stiffnessSlider).toHaveAttribute('aria-valuenow', '1000');

    const dampingInput = screen.getByLabelText<HTMLInputElement>(/Damping/i);
    const dampingSlider = screen.getAllByRole('slider')[1];

    fireEvent.change(dampingInput, { target: { value: '123' } });
    expect(dampingInput.value).toBe('100');

    fireEvent.keyDown(dampingSlider, { key: 'ArrowRight' });
    expect(dampingSlider).toHaveAttribute('aria-valuenow', '100');

    const massInput = screen.getByLabelText<HTMLInputElement>(/Mass/i);
    const massStiffness = screen.getAllByRole('slider')[2];

    fireEvent.change(massInput, { target: { value: '240' } });
    expect(massInput.value).toBe('100');

    fireEvent.keyDown(massStiffness, { key: 'ArrowRight' });
    expect(massStiffness).toHaveAttribute('aria-valuenow', '100');
  });

  it('should be copied value', async () => {
    const writeTextMock = vi.fn();
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: writeTextMock,
        },
      },
    });

    render(<SpringSimulator />);
    const copyButton = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
    });
  });

  it('should be selected to preset', async () => {
    render(<SpringSimulator />);

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const optionScrollLinked = await screen.findByText(/Scroll linked/i);
    fireEvent.click(optionScrollLinked);

    await waitFor(() => {
      expect(screen.getByLabelText<HTMLInputElement>(/Stiffness/i).value).toBe(
        '150',
      );
    });
    expect(screen.getAllByRole('slider')[0]).toHaveAttribute(
      'aria-valuenow',
      '150',
    );

    expect(screen.getByLabelText<HTMLInputElement>(/Damping/i).value).toBe(
      '30',
    );
    expect(screen.getAllByRole('slider')[1]).toHaveAttribute(
      'aria-valuenow',
      '30',
    );

    expect(screen.getByLabelText<HTMLInputElement>(/Mass/i).value).toBe('1');
    expect(screen.getAllByRole('slider')[2]).toHaveAttribute(
      'aria-valuenow',
      '1',
    );
  });
});
