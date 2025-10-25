'use client';

import { Switch, useMounted } from '@stylelist94/nine-beauty-actress';
import { useEffect, useState } from 'react';

const ThemeControlSwitch = () => {
  const isMounted = useMounted();

  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
    'system',
  );

  const toggleTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const currentTheme = theme === 'system' ? systemTheme : theme;

    const resolvedTheme: 'light' | 'dark' =
      currentTheme === 'dark' ? 'light' : 'dark';

    setThemeState(resolvedTheme);
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('theme')) {
      localStorage.setItem('theme', resolvedTheme);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChangeTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setThemeState(isDarkMode ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChangeTheme);

    handleChangeTheme();

    return () => mediaQuery.removeEventListener('change', handleChangeTheme);
  }, []);

  useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const resolvedTheme = isDark ? 'dark' : 'light';
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <Switch
      isChecked={theme === 'dark'}
      onCheckedChange={toggleTheme}
      iconClassName="text-zinc-500/80 dark:text-zinc-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-light-mode"
      >
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="icon-dark-mode"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </Switch>
  );
};

export default ThemeControlSwitch;
