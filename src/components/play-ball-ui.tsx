import type { PropsWithChildren } from 'react';

import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  ScrollArea,
  ScrollBar,
} from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';


type TeamStanding = {
  rank: number;
  team: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
  gamesBehind: string;
  recent: string;
};

type Props = {
  teamRankingList: TeamStanding[];
  lotteGiants: TeamStanding | null;
  updateDate: Date | null;
  errorMessage: string | null;
};

const Container = ({ children }: PropsWithChildren) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>그깟 공놀이</CardTitle>
      <CardDescription>올해는 제발 가을야구 하자...</CardDescription>
    </CardHeader>

    {children}
  </Card>
);

const FailLoadData = ({ message }: { message: string }) => (
  <CardContent className="flex flex-col gap-2">
    <div
      className={cn(
        'flex justify-center items-center w-full h-[10.75rem]',
        'border border-dashed rounded-lg',
      )}
    >
      <p className="text-sm text-red-400">{message}</p>
    </div>
  </CardContent>
);

const PlayBall = ({
  teamRankingList,
  lotteGiants,
  updateDate,
  errorMessage,
}: Props) => {
  if (errorMessage) {
    return (
      <Container>
        <FailLoadData message={errorMessage} />
      </Container>
    );
  }

  return (
    <Container>
      <CardContent className="flex flex-col gap-2">
        {lotteGiants && (
          <section className="flex flex-col gap-2">
            <h2 className="text-sm text-zinc-800 dark:text-zinc-200">
              지금 롯데는...?
            </h2>
            <div className="flex items-end gap-0.5">
              <p className={cn(lotteGiants.rank < 5 ? 'text-5xl' : 'text-3xl')}>
                {lotteGiants.rank}
              </p>
              <p className="mb-[0.0625rem] -pt-[0.0625rem]">위</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <p>{lotteGiants.wins}승</p>
              <p>승률 {lotteGiants.winRate.toFixed(3)}</p>
              <p>게임차 {lotteGiants.gamesBehind}</p>
            </div>
          </section>
        )}
      </CardContent>
      <CardFooter>
        <ScrollArea className="w-full">
          <Table>
            {updateDate && (
              <TableCaption className="text-left">
                마지막 업데이트: {format(updateDate, 'yyyy.MM.dd.')}
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>팀명</TableHead>
                <TableHead>경기</TableHead>
                <TableHead>승</TableHead>
                <TableHead>패</TableHead>
                <TableHead>무</TableHead>
                <TableHead>승률</TableHead>
                <TableHead>게임차</TableHead>
                <TableHead>연속</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamRankingList.map((item) => (
                <TableRow
                  key={item.team}
                  data-state={item.team === '롯데' ? 'selected' : undefined}
                >
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.team}</TableCell>
                  <TableCell>{item.games}</TableCell>
                  <TableCell>{item.wins}</TableCell>
                  <TableCell>{item.losses}</TableCell>
                  <TableCell>{item.draws}</TableCell>
                  <TableCell>{item.winRate.toFixed(3)}</TableCell>
                  <TableCell>{item.gamesBehind}</TableCell>
                  <TableCell>{item.recent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>
    </Container>
  );
};

export default PlayBall;
