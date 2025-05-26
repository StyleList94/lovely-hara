'use client';

import { AppearanceSwitch, useMounted } from '@stylelist94/nine-beauty-actress';

import Icon from '@/assets/icons';
import useThemeControl from '@/hooks/use-theme-control';
import { cn } from '@/lib/utils';

const ThemeControlSwitch = () => {
  const mounted = useMounted();

  const { isDarkTheme, toggleTheme } = useThemeControl();

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
      <Icon.DarkMode className="text-neutral-700 w-5" />
      <Icon.LightMode className="text-neutral-200 w-5" />
    </AppearanceSwitch>
  );
};

export default ThemeControlSwitch;
