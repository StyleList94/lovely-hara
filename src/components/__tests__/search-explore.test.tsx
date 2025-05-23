import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { vi } from 'vitest';
import SearchExplore from '../search-explore';

describe('<SearchExplore />', () => {
  it('should render', () => {
    render(<SearchExplore />);

    expect(screen.getByText('서치퀸')).toBeInTheDocument();
    expect(
      screen.getByText('GPT가 하는거 반만큼만 해볼까<3'),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('검색어')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('검색하고 싶은 거')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/ })).toBeInTheDocument();
  });

  it('should be changed query', () => {
    render(<SearchExplore />);

    const inputElement = screen.getByPlaceholderText('검색하고 싶은 거');

    fireEvent.change(inputElement, { target: { value: '엔믹스' } });
    expect((inputElement as HTMLInputElement).value).toBe('엔믹스');
  });

  it('should open search results', () => {
    const openMock = vi.fn();
    vi.stubGlobal('open', openMock);

    render(<SearchExplore />);

    const inputElement = screen.getByPlaceholderText('검색하고 싶은 거');

    fireEvent.change(inputElement, { target: { value: 'fender' } });
    fireEvent.click(screen.getByRole('button', { name: /search/ }));

    expect(openMock).toBeCalledTimes(7);

    vi.unstubAllGlobals();
  });
});
