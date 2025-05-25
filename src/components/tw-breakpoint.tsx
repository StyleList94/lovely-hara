import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const twViewportBreak = [
  { prefix: 'sm', remValue: 40 },
  { prefix: 'md', remValue: 48 },
  { prefix: 'lg', remValue: 64 },
  { prefix: 'xl', remValue: 80 },
  { prefix: '2xl', remValue: 96 },
];

const twContainerBreak = [
  { prefix: '@3xs', remValue: 16 },
  { prefix: '@2xs', remValue: 18 },
  { prefix: '@xs', remValue: 20 },
  { prefix: '@sm', remValue: 24 },
  { prefix: '@md', remValue: 28 },
  { prefix: '@lg', remValue: 32 },
  { prefix: '@xl', remValue: 36 },
  { prefix: '@2xl', remValue: 42 },
  { prefix: '@3xl', remValue: 48 },
  { prefix: '@4xl', remValue: 56 },
  { prefix: '@5xl', remValue: 64 },
  { prefix: '@6xl', remValue: 72 },
  { prefix: '@7xl', remValue: 80 },
];

function remToPx(rem: number) {
  return parseFloat((rem * 16).toFixed(4));
}

const CONTAINER_QUERY_COLLAPSED_FIRST_INDEX = 3;
const CONTAINER_QUERY_COLLAPSED_LAST_INDEX = 9;

const TwBreakpoint = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>바람막이</CardTitle>
      <CardDescription>반응형 디자인 노트</CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      <section className="flex flex-col gap-1">
        <h2 className="text-sm text-zinc-800 dark:text-zinc-200">
          미디어 쿼리
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>prefix</TableHead>
              <TableHead className="text-right">최소 너비</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {twViewportBreak.map((item) => (
              <TableRow key={`tw-viewport-${item.prefix}`}>
                <TableCell>{item.prefix}</TableCell>
                <TableCell className="text-right">
                  {item.remValue}rem ({remToPx(item.remValue)}px)
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Collapsible asChild>
        <section className="flex flex-col gap-1">
          <CollapsibleTrigger
            className={cn(
              'flex justify-between items-center w-full ',
              'data-[state=open]:*:last:-rotate-180',
              'text-sm text-zinc-800 dark:text-zinc-200',
            )}
          >
            <h2 className="">컨테이너 쿼리</h2>

            <ChevronDownIcon
              size={16}
              className="transition-transform ease-in-out"
            />
          </CollapsibleTrigger>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>prefix</TableHead>
                <TableHead className="text-right">최소 너비</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {twContainerBreak
                .slice(0, CONTAINER_QUERY_COLLAPSED_FIRST_INDEX)
                .map((item) => (
                  <CollapsibleContent
                    asChild
                    key={`tw-container-${item.prefix}`}
                  >
                    <TableRow>
                      <TableCell>{item.prefix}</TableCell>
                      <TableCell className="text-right">
                        {item.remValue}rem ({remToPx(item.remValue)}px)
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                ))}
              {twContainerBreak
                .slice(
                  CONTAINER_QUERY_COLLAPSED_FIRST_INDEX,
                  CONTAINER_QUERY_COLLAPSED_LAST_INDEX,
                )
                .map((item) => (
                  <TableRow key={`tw-container-${item.prefix}`}>
                    <TableCell>{item.prefix}</TableCell>
                    <TableCell className="text-right">
                      {item.remValue}rem ({remToPx(item.remValue)}px)
                    </TableCell>
                  </TableRow>
                ))}
              {twContainerBreak
                .slice(CONTAINER_QUERY_COLLAPSED_LAST_INDEX)
                .map((item) => (
                  <CollapsibleContent
                    asChild
                    key={`tw-container-${item.prefix}`}
                  >
                    <TableRow>
                      <TableCell>{item.prefix}</TableCell>
                      <TableCell className="text-right">
                        {item.remValue}rem ({remToPx(item.remValue)}px)
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                ))}
            </TableBody>
          </Table>
        </section>
      </Collapsible>
    </CardContent>
  </Card>
);

export default TwBreakpoint;
