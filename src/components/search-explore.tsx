'use client';

import { type ChangeEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

const searchEngines = [
  {
    id: 'google',
    url: (keyword: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'naver',
    url: (keyword: string) =>
      `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'daum',
    url: (keyword: string) =>
      `https://search.daum.net/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'nate',
    url: (keyword: string) =>
      `https://search.daum.net/nate?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'bing',
    url: (keyword: string) =>
      `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'duckduckgo',
    url: (keyword: string) =>
      `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'dcinside',
    url: (keyword: string) =>
      `https://search.dcinside.com/combine/q/${encodeURIComponent(keyword)}`,
  },
];

const SearchExplore = () => {
  const [query, setQuery] = useState('');

  const toastId = useRef<string | number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClickSearch = () => {
    searchEngines.forEach((engine) => {
      const popup = window.open(engine.url(query), `${engine.id}${Date.now()}`);

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        if (toastId.current) {
          toast.dismiss(toastId.current);
          toastId.current = null;
        } else {
          toastId.current = toast.warning('팝업이 차단됨!', {
            position: 'bottom-right',
            description: '검색 결과를 모두 확인하려면 팝업 해제를 해야합니다!',
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>서치퀸</CardTitle>
        <CardDescription>GPT가 하는거 반만큼만 해볼까{'<'}3</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="query">검색어</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              id="query"
              placeholder="검색하고 싶은 거"
              onChange={handleChange}
              value={query}
            />
            <Button
              size="icon"
              variant="outline"
              disabled={!query}
              onClick={handleClickSearch}
              aria-label="search"
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchExplore;
