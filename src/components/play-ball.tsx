import type { PropsWithChildren } from 'react';

import { format } from 'date-fns';

import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type TableCellData = {
  Text: string;
  Class: string | null;
  Scope: string | null;
  RowSpan: number | null;
  ColSpan: number | null;
  Width: string | null;
  TypeObj: string | null;
};

type TableRowData = {
  row: TableCellData[];
  Class: string | null;
  OnClick: string | null;
  Style: string | null;
  Value: string | null;
  Id: string | null;
};

type TeamRankingResponse = {
  rows: TableRowData[];
  totalCnt: string;
  headerClass: string | null;
  tbodyClass: string | null;
  tfootClass: string | null;
  title: string;
  caption: string | null;
  result_cd: string | null;
  result_msg: string | null;
  code: string;
  msg: string;
};

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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function parseRowData(data: TeamRankingResponse) {
  const ranking: TeamStanding[] = data.rows.map((rowObj) => {
    const { row } = rowObj;
    return {
      rank: Number(row[0]?.Text ?? 0),
      team: stripHtml(row[1]?.Text ?? ''),
      games: Number(row[2]?.Text ?? 0),
      wins: Number(row[3]?.Text ?? 0),
      losses: Number(row[4]?.Text ?? 0),
      draws: Number(row[5]?.Text ?? 0),
      winRate: Number(row[6]?.Text ?? 0),
      gamesBehind: row[7]?.Text ?? '',
      recent: row[8]?.Text ?? '',
    };
  });

  const match = data.title.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  let date: Date | null = null;
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    date = new Date(year, month - 1, day);
  }

  const giantsData = ranking.find((item) => item.team === '롯데');

  return { ranking, giantsData, date };
}

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

const PlayBall = async () => {
  try {
    const res = await fetch(
      'https://www.koreabaseball.com/ws/Main.asmx/GetTeamRank',
      { method: 'POST' },
    );

    if (!res.ok) {
      return (
        <Container>
          <FailLoadData message="데이터 어디갔어!?" />
        </Container>
      );
    }

    const data = (await res.json()) as TeamRankingResponse;

    const {
      ranking: teamRankingList,
      giantsData: lotteGiants,
      date: updateDate,
    } = parseRowData(data);

    return (
      <Container>
        <CardContent className="flex flex-col gap-2">
          {lotteGiants && (
            <section className="flex flex-col gap-2">
              <h2 className="text-sm text-zinc-800 dark:text-zinc-200">
                지금 롯데는...?
              </h2>
              <div className="flex items-end gap-0.5">
                <p
                  className={cn(lotteGiants.rank < 5 ? 'text-5xl' : 'text-3xl')}
                >
                  {lotteGiants.rank}
                </p>
                <p className="mb-[0.0625rem] -pt-[0.0625rem]">위</p>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <p>{lotteGiants.wins}승</p>
                <p>승률 {lotteGiants.winRate.toFixed(3)}</p>
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
  } catch {
    return (
      <Container>
        <FailLoadData message="마! 데이타 어데로갔노!?" />
      </Container>
    );
  }
};

export default PlayBall;
