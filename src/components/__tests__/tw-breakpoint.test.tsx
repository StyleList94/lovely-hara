import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/react';
import TwBreakpoint from '../tw-breakpoint';

describe('<TwBreakpoint />', () => {
  it('should render', () => {
    render(<TwBreakpoint />);

    expect(screen.getByText('바람막이')).toBeInTheDocument();
    expect(screen.getByText('반응형 디자인 노트')).toBeInTheDocument();

    expect(screen.getByText('미디어 쿼리')).toBeInTheDocument();
    expect(screen.getAllByText('prefix')[0]).toBeInTheDocument();
    expect(screen.getAllByText('최소 너비')[0]).toBeInTheDocument();

    expect(screen.getByText('sm')).toBeInTheDocument();
    expect(screen.getByText('40rem (640px)')).toBeInTheDocument();
    expect(screen.getByText('md')).toBeInTheDocument();
    expect(screen.getAllByText('48rem (768px)')[0]).toBeInTheDocument();
    expect(screen.getByText('lg')).toBeInTheDocument();
    expect(screen.getAllByText('64rem (1024px)')[0]).toBeInTheDocument();
    expect(screen.getByText('xl')).toBeInTheDocument();
    expect(screen.getAllByText('80rem (1280px)')[0]).toBeInTheDocument();
    expect(screen.getByText('2xl')).toBeInTheDocument();
    expect(screen.getByText('96rem (1536px)')).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: '컨테이너 쿼리' });
    fireEvent.click(buttonElement);

    expect(screen.getByText('컨테이너 쿼리')).toBeInTheDocument();
    expect(screen.getAllByText('prefix')[1]).toBeInTheDocument();
    expect(screen.getAllByText('최소 너비')[1]).toBeInTheDocument();

    expect(screen.getByText('@3xs')).toBeInTheDocument();
    expect(screen.getByText('16rem (256px)')).toBeInTheDocument();
    expect(screen.getByText('@2xs')).toBeInTheDocument();
    expect(screen.getByText('18rem (288px)')).toBeInTheDocument();
    expect(screen.getByText('@xs')).toBeInTheDocument();
    expect(screen.getByText('20rem (320px)')).toBeInTheDocument();
    expect(screen.getByText('@sm')).toBeInTheDocument();
    expect(screen.getByText('24rem (384px)')).toBeInTheDocument();
    expect(screen.getByText('@md')).toBeInTheDocument();
    expect(screen.getByText('28rem (448px)')).toBeInTheDocument();
    expect(screen.getByText('@lg')).toBeInTheDocument();
    expect(screen.getByText('32rem (512px)')).toBeInTheDocument();
    expect(screen.getByText('@xl')).toBeInTheDocument();
    expect(screen.getByText('36rem (576px)')).toBeInTheDocument();
    expect(screen.getByText('@2xl')).toBeInTheDocument();
    expect(screen.getByText('42rem (672px)')).toBeInTheDocument();
    expect(screen.getByText('@3xl')).toBeInTheDocument();
    expect(screen.getAllByText('48rem (768px)')[1]).toBeInTheDocument();
    expect(screen.getByText('@4xl')).toBeInTheDocument();
    expect(screen.getByText('56rem (896px)')).toBeInTheDocument();
    expect(screen.getByText('@5xl')).toBeInTheDocument();
    expect(screen.getAllByText('64rem (1024px)')[1]).toBeInTheDocument();
    expect(screen.getByText('@6xl')).toBeInTheDocument();
    expect(screen.getByText('72rem (1152px)')).toBeInTheDocument();
    expect(screen.getByText('@7xl')).toBeInTheDocument();
    expect(screen.getAllByText('80rem (1280px)')[1]).toBeInTheDocument();
  });

  it('should be copied to click row item', async () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      },
    });

    const {
      clipboard: { writeText },
    } = navigator;

    render(<TwBreakpoint />);

    const mediaQueryRowElement = screen.getByRole('row', { name: /^lg/ });
    fireEvent.click(mediaQueryRowElement);

    expect(writeText).toHaveBeenCalledWith('lg:');

    const containerQueryRowElement = screen.getByRole('row', { name: /^@2xl/ });
    fireEvent.click(containerQueryRowElement);

    expect(writeText).toHaveBeenCalledWith('@2xl:');
  });
});
