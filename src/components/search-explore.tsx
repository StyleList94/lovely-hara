'use client';

import {
  type ChangeEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SearchIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  TextInput,
  Button,
  Checkbox,
  Separator,
  FormControl,
  CheckboxGroup,
} from '@stylelist94/nine-beauty-actress';

const searchEngines = [
  {
    id: 'google',
    name: 'Google',
    url: (keyword: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'naver',
    name: '네이버',
    url: (keyword: string) =>
      `https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'daum',
    name: '다음',
    url: (keyword: string) =>
      `https://search.daum.net/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'nate',
    name: '네이트',
    url: (keyword: string) =>
      `https://search.daum.net/nate?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'bing',
    name: 'Bing',
    url: (keyword: string) =>
      `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    url: (keyword: string) =>
      `https://duckduckgo.com/?q=${encodeURIComponent(keyword)}`,
  },
  {
    id: 'dcinside',
    name: '디시인사이드',
    url: (keyword: string) =>
      `https://search.dcinside.com/combine/q/${encodeURIComponent(keyword)}`,
  },
];

const externalSearchEngines = searchEngines
  .filter((searchEngine) =>
    ['google', 'bing', 'duckduckgo'].some(
      (target) => target === searchEngine.id,
    ),
  )
  .map(({ id, name }) => ({ id, name }));

const internalSearchEngines = searchEngines
  .filter((searchEngine) =>
    ['naver', 'daum', 'nate'].some((target) => target === searchEngine.id),
  )
  .map(({ id, name }) => ({ id, name }));

const communitySearchEngines = searchEngines
  .filter((searchEngine) =>
    ['dcinside'].some((target) => target === searchEngine.id),
  )
  .map(({ id, name }) => ({ id, name }));

const initialCheckboxState: Record<string, boolean> = searchEngines.reduce(
  (prev, current) => ({
    ...prev,
    [current.id]: true,
  }),
  {},
);

const SearchExplore = () => {
  const [query, setQuery] = useState('');

  const [isChecked, setIsChecked] = useState({ ...initialCheckboxState });

  const toastId = useRef<string | number | null>(null);

  const isAllChecked = useMemo(
    () => Object.values(isChecked).every(Boolean),
    [isChecked],
  );

  const isProblemChecked = useMemo(
    () => externalSearchEngines.every((item) => isChecked[item.id]),
    [isChecked],
  );

  const isFoodChecked = useMemo(
    () => internalSearchEngines.slice(0, 2).every((item) => isChecked[item.id]),
    [isChecked],
  );

  const isCommunityChecked = useMemo(
    () => communitySearchEngines.every((item) => isChecked[item.id]),
    [isChecked],
  );

  const isSearchable = useMemo(
    () => Object.values(isChecked).some(Boolean),
    [isChecked],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCheck = (name: string) => (checked: boolean) => {
    switch (name) {
      case 'all':
        setIsChecked(
          searchEngines.reduce(
            (prev, current) => ({
              ...prev,
              [current.id]: checked,
            }),
            {},
          ),
        );
        return;
      case 'googling':
        setIsChecked((prevState) => {
          const targetState = externalSearchEngines.reduce(
            (prev, current) => ({
              ...prev,
              [current.id]: checked,
            }),
            {},
          );
          return { ...prevState, ...targetState };
        });
        return;

      case 'food':
        setIsChecked((prevState) => {
          const targetState = internalSearchEngines.slice(0, 2).reduce(
            (prev, current) => ({
              ...prev,
              [current.id]: checked,
            }),
            {},
          );
          return { ...prevState, ...targetState };
        });
        return;

      case 'community':
        setIsChecked((prevState) => {
          const targetState = communitySearchEngines.reduce(
            (prev, current) => ({
              ...prev,
              [current.id]: checked,
            }),
            {},
          );
          return { ...prevState, ...targetState };
        });
        return;

      default:
        setIsChecked((prevState) => ({ ...prevState, [name]: checked }));
    }
  };

  const handleClickSearch = () => {
    if (!isSearchable) {
      return;
    }

    searchEngines.forEach((engine) => {
      if (isChecked[engine.id]) {
        const popup = window.open(
          engine.url(query),
          `${engine.id}${Date.now()}`,
        );

        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          if (toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
          } else {
            toastId.current = toast.warning('팝업이 차단됨!', {
              position: 'bottom-right',
              description:
                '검색 결과를 모두 확인하려면 팝업 해제를 해야합니다!',
              duration: 3000,
            });
          }
        }
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>서치퀸</CardTitle>
        <CardDescription>
          어떤 걸 좋아할지 몰라서 다 준비해 봤어{'<'}3
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <FormControl>
            <FormControl.Label>검색어</FormControl.Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <TextInput
                placeholder="뭐든 말해봐!"
                onChange={handleChange}
                value={query}
              />
              <Button
                size="icon"
                variant="outline"
                disabled={!query || !isSearchable}
                onClick={handleClickSearch}
                aria-label="search"
              >
                <SearchIcon />
              </Button>
            </div>
          </FormControl>
        </div>
      </CardContent>
      <CardFooter className="@container flex flex-col items-start gap-4">
        <div className="flex flex-col gap-4 w-full">
          <FormControl layout="horizontal">
            <Checkbox
              name="all"
              checked={isAllChecked}
              onCheckedChange={handleCheck('all')}
            />
            <FormControl.Label>모두 선택</FormControl.Label>
          </FormControl>

          <Separator />

          <CheckboxGroup>
            <CheckboxGroup.Label className="text-zinc-500 dark:text-zinc-400">
              주제
            </CheckboxGroup.Label>
            <div className="flex flex-col gap-2 @3xs:flex-row @2xs:items-center">
              <FormControl layout="horizontal" className="!w-auto">
                <Checkbox
                  name="googling"
                  checked={isProblemChecked}
                  onCheckedChange={handleCheck('googling')}
                />
                <FormControl.Label>문제 해결</FormControl.Label>
              </FormControl>
              <FormControl layout="horizontal" className="!w-auto">
                <Checkbox
                  name="food"
                  checked={isFoodChecked}
                  onCheckedChange={handleCheck('food')}
                />
                <FormControl.Label>맛집</FormControl.Label>
              </FormControl>
              <FormControl layout="horizontal" className="!w-auto">
                <Checkbox
                  name="community"
                  checked={isCommunityChecked}
                  onCheckedChange={handleCheck('community')}
                />
                <FormControl.Label>실시간 가십</FormControl.Label>
              </FormControl>
            </div>
          </CheckboxGroup>
        </div>

        <Separator />

        <div className="flex flex-col gap-3 w-full">
          <CheckboxGroup>
            <CheckboxGroup.Label className="text-zinc-500 dark:text-zinc-400">
              해외
            </CheckboxGroup.Label>
            <div className="flex flex-col gap-2 @3xs:flex-row @2xs:items-center">
              {externalSearchEngines.map((item) => (
                <FormControl key={item.id} layout="horizontal" className="!w-auto">
                  <Checkbox
                    name={item.id}
                    onCheckedChange={handleCheck(item.id)}
                    checked={isChecked[item.id]}
                  />
                  <FormControl.Label>{item.name}</FormControl.Label>
                </FormControl>
              ))}
            </div>
          </CheckboxGroup>
          <CheckboxGroup>
            <CheckboxGroup.Label className="text-zinc-500 dark:text-zinc-400">
              국내
            </CheckboxGroup.Label>
            <div className="flex flex-col gap-2 @3xs:flex-row @2xs:items-center">
              {internalSearchEngines.map((item) => (
                <FormControl key={item.id} layout="horizontal" className="!w-auto">
                  <Checkbox
                    name={item.id}
                    onCheckedChange={handleCheck(item.id)}
                    checked={isChecked[item.id]}
                  />
                  <FormControl.Label>{item.name}</FormControl.Label>
                </FormControl>
              ))}
            </div>
          </CheckboxGroup>
          <CheckboxGroup>
            <CheckboxGroup.Label className="text-zinc-500 dark:text-zinc-400">
              커뮤니티
            </CheckboxGroup.Label>
            <div className="flex flex-col gap-2 @3xs:flex-row @2xs:items-center">
              {communitySearchEngines.map((item) => (
                <FormControl key={item.id} layout="horizontal" className="!w-auto">
                  <Checkbox
                    name={item.id}
                    onCheckedChange={handleCheck(item.id)}
                    checked={isChecked[item.id]}
                  />
                  <FormControl.Label>{item.name}</FormControl.Label>
                </FormControl>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SearchExplore;
