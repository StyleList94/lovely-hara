import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import BlogFeed from '../blog-feed';

const mockResult = `<rss version="2.0">
  <channel>
    <title>Stylish.LOG</title>
    <link>https://blog.stylelist94.dev</link>
    <description>첫경험 위주로 끄적여봅니다.</description>
    <item>
      <title>도수 높은 줄 모르고 자꾸만 끌리는!</title>
      <link>https://blog.stylelist94.dev/post/cocktail-recipt-01</link>
      <description>칵테일 레시피 1편</description>
      <pubDate>2025-06-12T10:19:00.000Z</pubDate>
    </item>
  </channel>
</rss>`;

describe('<BlogFeed />', () => {
  it('should render', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => mockResult,
    });

    render(await BlogFeed());

    expect(screen.getByText('맵시일기')).toBeInTheDocument();
    expect(screen.getByText('첫경험 위주로 끄적여봅니다.')).toBeInTheDocument();

    expect(
      screen.getByText('도수 높은 줄 모르고 자꾸만 끌리는!'),
    ).toHaveAttribute(
      'href',
      'https://blog.stylelist94.dev/post/cocktail-recipt-01',
    );
  });

  it('should render when fail to load', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => '',
    });

    render(await BlogFeed());

    expect(screen.getByText('피드 어디갔어!?')).toBeInTheDocument();
  });

  it('should render when throw error', async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error('오늘은 데이트 한다고 일기를 놓쳤습니다.'));

    render(await BlogFeed());

    expect(screen.getByText('그럴리가 없는데...')).toBeInTheDocument();
  });
});
