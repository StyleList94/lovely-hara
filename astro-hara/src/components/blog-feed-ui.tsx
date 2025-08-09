import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

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

type Props = {
  postList: {
    title: string;
    link: string;
    description: string;
  }[];
  errorMessage: string | null;
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

const BlogFeed = ({ postList, errorMessage }: Props) => {
  if (errorMessage) {
    <Container>
      <FailLoadData message={errorMessage} />
    </Container>;
  }

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
};

export default BlogFeed;
