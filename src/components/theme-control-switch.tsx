'use client';

import {
  ToggleGroup,
  ToggleGroupItem,
  useMounted,
} from '@stylelist94/nine-beauty-actress';
import { useSyncExternalStore, type SVGProps } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('theme-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('theme-update', callback);
  };
};

const getSnapshot = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'system';
};

const getServerSnapshot = (): 'system' => 'system';

type ThemeValue = 'light' | 'dark' | 'system';

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} satisfies SVGProps<SVGSVGElement>;

const ThemeControlSwitch = () => {
  const isMounted = useMounted();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleThemeChange = (value: ThemeValue | '') => {
    if (!value || value === theme) return;
    localStorage.setItem('theme', value);
    window.dispatchEvent(new Event('theme-change'));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={handleThemeChange}
      aria-label="theme control switch"
      size="sm"
    >
      <ToggleGroupItem value="light" aria-label="Switch to light theme">
        <svg {...iconProps} aria-label="icon-light-mode">
          <circle cx={12} cy={12} r={4} />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Match system theme">
        <svg {...iconProps} aria-label="icon-system-mode">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Switch to dark theme">
        <svg {...iconProps} aria-label="icon-dark-mode">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeControlSwitch;
