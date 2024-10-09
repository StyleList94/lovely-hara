'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useSwitch, VisuallyHidden } from '@nextui-org/react';

import Icon from '@/assets/icons';
import { cn } from '@/lib/utils';

const ThemeControlSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const isDarkTheme = resolvedTheme === 'dark';

  const toggleTheme = () => {
    const targetTheme = systemTheme === 'dark' ? 'light' : 'dark';

    setTheme(theme === 'system' ? targetTheme : 'system');
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    onChange: toggleTheme,
    isSelected: isDarkTheme,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          color: 'default',
          class: cn(
            'w-8 h-8',
            'flex items-center justify-center text-2xl',
            'rounded-lg bg-white hover:bg-neutral-100',
            isSelected && '!bg-neutral-900 hover:!bg-neutral-800',
          ),
        })}
      >
        {isSelected ? (
          <Icon.LightMode className="text-neutral-200" />
        ) : (
          <Icon.DarkMode className="text-neutral-700" />
        )}
      </div>
    </Component>
  );
};

export default ThemeControlSwitch;
