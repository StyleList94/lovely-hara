'use client';

import { Switch, useMounted } from '@stylelist94/nine-beauty-actress';

import Icon from '@/assets/icons';
import useThemeControl from '@/hooks/use-theme-control';

const ThemeControlSwitch = () => {
  const mounted = useMounted();

  const { isDarkTheme, toggleTheme } = useThemeControl();

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      isChecked={isDarkTheme}
      onCheckedChange={toggleTheme}
      iconClassName="text-zinc-500/80 dark:text-zinc-400"
    >
      <Icon.LightMode className="text-neutral-200 w-5" />
      <Icon.DarkMode className="text-neutral-700 w-5" />
    </Switch>
  );
};

export default ThemeControlSwitch;
