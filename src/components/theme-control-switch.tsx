'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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
    <button
      type="button"
      className={cn(
        'w-8 h-8',
        'flex items-center justify-center text-2xl text-neutral-600',
        'rounded-lg bg-white hover:bg-neutral-100',
        'dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300',
      )}
      onClick={toggleTheme}
    >
      {isDarkTheme ? (
        <Icon.LightMode className="text-neutral-200" />
      ) : (
        <Icon.DarkMode className="text-neutral-700" />
      )}
    </button>
  );
};

export default ThemeControlSwitch;
