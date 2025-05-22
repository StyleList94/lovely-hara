import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SpringSimulator from '../spring-simulator';

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const MutationObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
}));
vi.stubGlobal('MutationObserver', MutationObserverMock);

describe('<SpringSimulator />', () => {
  it('should render', () => {
    render(<SpringSimulator />);

    expect(screen.getByText('스프링 시뮬레이터')).toBeInTheDocument();
    expect(
      screen.getByText('통통 튀는 애니메이션을 만들고 싶다면'),
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
      const inputElement = screen.getByLabelText(new RegExp(item, 'i'));
      const sliderElement = screen.getAllByRole('slider')[index];

      fireEvent.change(inputElement, { target: { value: '10' } });
      expect((inputElement as HTMLInputElement).value).toBe('10');

      fireEvent.keyDown(sliderElement, { key: 'ArrowRight' });
      expect(sliderElement).toHaveAttribute('aria-valuenow', '11');
    });
  });

  it('should not changde if value is greater than maximum', () => {
    render(<SpringSimulator />);

    const stiffnessInput = screen.getByLabelText(/Stiffness/i);
    const stiffnessSlider = screen.getAllByRole('slider')[0];

    fireEvent.change(stiffnessInput, { target: { value: '1001' } });
    expect((stiffnessInput as HTMLInputElement).value).toBe('1000');

    fireEvent.keyDown(stiffnessSlider, { key: 'ArrowRight' });
    expect(stiffnessSlider).toHaveAttribute('aria-valuenow', '1000');

    const dampingInput = screen.getByLabelText(/Damping/i);
    const dampingSlider = screen.getAllByRole('slider')[1];

    fireEvent.change(dampingInput, { target: { value: '123' } });
    expect((dampingInput as HTMLInputElement).value).toBe('100');

    fireEvent.keyDown(dampingSlider, { key: 'ArrowRight' });
    expect(dampingSlider).toHaveAttribute('aria-valuenow', '100');

    const massInput = screen.getByLabelText(/Mass/i);
    const massStiffness = screen.getAllByRole('slider')[2];

    fireEvent.change(massInput, { target: { value: '240' } });
    expect((massInput as HTMLInputElement).value).toBe('100');

    fireEvent.keyDown(massStiffness, { key: 'ArrowRight' });
    expect(massStiffness).toHaveAttribute('aria-valuenow', '100');
  });

  it('should be copied value', async () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<SpringSimulator />);
    const copyButton = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
    });
  });
});
