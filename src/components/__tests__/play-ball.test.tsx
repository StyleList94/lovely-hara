import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import PlayBall from '../play-ball';

describe('<PlayBall />', () => {
  it('should render', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        title: '2025년 5월 24일 기준',
        rows: [
          {
            row: [
              {
                Text: '1',
              },
              {
                Text: "<span class='team-name'>롯데</span>",
              },
              {
                Text: '53',
              },
              {
                Text: '30',
              },
              {
                Text: '20',
              },
              {
                Text: '3',
              },
              {
                Text: '0.600',
              },
              {
                Text: '2',
              },
              {
                Text: '1승',
              },
            ],
          },
        ],
      }),
    });

    render(await PlayBall());

    expect(screen.getByText('그깟 공놀이')).toBeInTheDocument();
    expect(
      screen.getByText('올해는 제발 가을야구 하자...'),
    ).toBeInTheDocument();

    expect(screen.getByText('지금 롯데는...?')).toBeInTheDocument();
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();
    expect(screen.getByText('위')).toBeInTheDocument();

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('팀명')).toBeInTheDocument();
    expect(screen.getByText('경기')).toBeInTheDocument();
    expect(screen.getByText('승')).toBeInTheDocument();
    expect(screen.getByText('패')).toBeInTheDocument();
    expect(screen.getByText('무')).toBeInTheDocument();
    expect(screen.getByText('승률')).toBeInTheDocument();
    expect(screen.getByText('게임차')).toBeInTheDocument();
    expect(screen.getByText('연속')).toBeInTheDocument();

    expect(screen.getAllByText('1')[1]).toBeInTheDocument();
    expect(screen.getByText('롯데')).toBeInTheDocument();
    expect(screen.getByText('53')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('0.600')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1승')).toBeInTheDocument();
  });

  it('should render when fail to load', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(await PlayBall());

    expect(screen.getByText('그깟 공놀이')).toBeInTheDocument();
    expect(
      screen.getByText('올해는 제발 가을야구 하자...'),
    ).toBeInTheDocument();

    expect(screen.getByText('데이터 어디갔어!?')).toBeInTheDocument();
  });
});
