import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import SearchExplore from '../search-explore';

describe('<SearchExplore />', () => {
  it('should render', () => {
    render(<SearchExplore />);

    expect(screen.getByText('서치퀸')).toBeInTheDocument();
    expect(
      screen.getByText('어떤 걸 좋아할지 몰라서 다 준비해 봤어<3'),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('검색어')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('뭐든 말해봐!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/ })).toBeInTheDocument();

    expect(screen.getByLabelText('모두 선택')).toBeInTheDocument();

    expect(screen.getByText('주제')).toBeInTheDocument();
    expect(screen.getByLabelText('문제 해결')).toBeInTheDocument();
    expect(screen.getByLabelText('맛집')).toBeInTheDocument();
    expect(screen.getByLabelText('실시간 가십')).toBeInTheDocument();

    expect(screen.getByText('해외')).toBeInTheDocument();
    expect(screen.getByLabelText('Google')).toBeInTheDocument();
    expect(screen.getByLabelText('Bing')).toBeInTheDocument();
    expect(screen.getByLabelText('DuckDuckGo')).toBeInTheDocument();

    expect(screen.getByText('국내')).toBeInTheDocument();
    expect(screen.getByLabelText('네이버')).toBeInTheDocument();
    expect(screen.getByLabelText('다음')).toBeInTheDocument();
    expect(screen.getByLabelText('네이트')).toBeInTheDocument();

    expect(screen.getByText('커뮤니티')).toBeInTheDocument();
    expect(screen.getByLabelText('디시인사이드')).toBeInTheDocument();
  });

  it('should be changed query', () => {
    render(<SearchExplore />);

    const inputElement = screen.getByPlaceholderText('뭐든 말해봐!');

    fireEvent.change(inputElement, { target: { value: '엔믹스' } });
    expect((inputElement as HTMLInputElement).value).toBe('엔믹스');
  });

  it('should open search results', () => {
    const openMock = vi.fn();
    vi.stubGlobal('open', openMock);

    render(<SearchExplore />);

    const inputElement = screen.getByPlaceholderText('뭐든 말해봐!');
    const buttonElement = screen.getByRole('button', { name: /search/ });

    expect(buttonElement).toBeDisabled();

    fireEvent.change(inputElement, { target: { value: 'fender' } });

    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);
    expect(openMock).toBeCalledTimes(7);

    const allCheckbox = screen.getByLabelText('모두 선택');
    fireEvent.click(allCheckbox);
    expect(buttonElement).toBeDisabled();

    openMock.mockReset();
    const problemCheckbox = screen.getByLabelText('문제 해결');
    fireEvent.click(problemCheckbox);
    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);
    expect(openMock).toBeCalledTimes(3);

    openMock.mockReset();
    const foodCheckbox = screen.getByLabelText('맛집');
    fireEvent.click(foodCheckbox);
    fireEvent.click(buttonElement);
    expect(openMock).toBeCalledTimes(5);

    openMock.mockReset();
    const communityCheckbox = screen.getByLabelText('실시간 가십');
    fireEvent.click(communityCheckbox);
    fireEvent.click(buttonElement);
    expect(openMock).toBeCalledTimes(6);

    vi.unstubAllGlobals();
  });

  test('checkbox', () => {
    render(<SearchExplore />);

    const checkboxElement = screen.getByLabelText('Google');

    expect(checkboxElement).toBeChecked();
    fireEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    fireEvent.click(checkboxElement);

    const externalSearchName = ['Google', 'Bing', 'DuckDuckGo'];
    const internalSearchName = ['네이버', '다음', '네이트'];
    const communitySearchName = ['디시인사이드'];

    const allCheckbox = screen.getByLabelText('모두 선택');
    expect(allCheckbox).toBeChecked();
    fireEvent.click(allCheckbox);
    expect(allCheckbox).not.toBeChecked();

    [
      ...externalSearchName,
      ...internalSearchName,
      ...communitySearchName,
    ].forEach((item) => {
      expect(screen.getByLabelText(item)).not.toBeChecked();
    });

    const problemCheckbox = screen.getByLabelText('문제 해결');
    expect(problemCheckbox).not.toBeChecked();
    fireEvent.click(problemCheckbox);
    expect(problemCheckbox).toBeChecked();

    externalSearchName.forEach((item) => {
      expect(screen.getByLabelText(item)).toBeChecked();
    });

    const foodCheckbox = screen.getByLabelText('맛집');
    expect(foodCheckbox).not.toBeChecked();
    fireEvent.click(foodCheckbox);
    expect(foodCheckbox).toBeChecked();

    internalSearchName.slice(0, 2).forEach((item) => {
      expect(screen.getByLabelText(item)).toBeChecked();
    });

    const communityCheckbox = screen.getByLabelText('실시간 가십');
    expect(communityCheckbox).not.toBeChecked();
    fireEvent.click(communityCheckbox);
    expect(communityCheckbox).toBeChecked();

    communitySearchName.slice(0, 2).forEach((item) => {
      expect(screen.getByLabelText(item)).toBeChecked();
    });

    fireEvent.click(screen.getByLabelText('네이트'));
    expect(allCheckbox).toBeChecked();
  });
});
