import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table';

const extractTags = (xml: string, tag: string): string[] => {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  return Array.from(xml.matchAll(regex), (match) => match[1]);
};

const Container = ({ children }: PropsWithChildren) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>맵시일기</CardTitle>
      <CardDescription>첫경험 위주로 끄적여봅니다.</CardDescription>
    </CardHeader>

    {children}
  </Card>
);

const FailLoadData = ({ message }: { message: string }) => (
  <CardContent className="flex flex-col gap-2">
    <div
      className={cn(
        'flex justify-center items-center w-full h-[11.5rem]',
        'border border-dashed rounded-lg',
      )}
    >
      <p className="text-sm text-red-400">{message}</p>
    </div>
  </CardContent>
);

const BlogFeed = async () => {
  try {
    const res = await fetch('https://blog.stylelist94.dev/rss.xml');

    if (!res.ok) {
      return (
        <Container>
          <FailLoadData message="피드 어디갔어!?" />
        </Container>
      );
    }

    const data = await res.text();

    const postList = extractTags(data, 'item').map((itemXml) => ({
      title: extractTags(itemXml, 'title')[0] || '',
      link: extractTags(itemXml, 'link')[0] || '',
      description: extractTags(itemXml, 'description')[0] || '',
    }));

    return (
      <Container>
        <CardContent className="flex flex-col gap-2">
          <ScrollArea className="w-full">
            <Table>
              <TableCaption> </TableCaption>
              <TableBody>
                {postList.map((post) => (
                  <TableRow key={`blog-feed-item-${post.link}`}>
                    <TableCell>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Container>
    );
  } catch {
    return (
      <Container>
        <FailLoadData message="그럴리가 없는데..." />
      </Container>
    );
  }
};

export default BlogFeed;
