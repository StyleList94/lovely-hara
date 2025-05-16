'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AppearanceSwitch } from '@stylelist94/nine-beauty-actress';

import { cn } from '@/lib/utils';
import Icon from '@/assets/icons';

const ThemeControlSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const isDarkTheme = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const targetTheme = systemTheme === 'dark' ? 'light' : 'dark';

    setTheme(theme === 'system' ? targetTheme : 'system');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppearanceSwitch
      isActive={isDarkTheme}
      onClick={toggleTheme}
      className={cn(
        'bg-white hover:bg-neutral-100',
        'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
      )}
    >
      <Icon.DarkMode className="text-neutral-700" />
      <Icon.LightMode className="text-neutral-200" />
    </AppearanceSwitch>
  );
};

export default ThemeControlSwitch;
