import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen, within } from '@testing-library/react';

import ThemeControlSwitch from './theme-control-switch';

function setupDOM(theme: 'dark' | 'theme-light' | 'system' = 'theme-light') {
  if (theme === 'dark') {
    document.documentElement.className = 'dark';
    localStorage.setItem('theme', 'dark');
  } else if (theme === 'theme-light') {
    document.documentElement.className = '';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.className = '';
    localStorage.removeItem('theme');
  }
}

function mockAstroThemeScript() {
  window.addEventListener('theme-change', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    window.dispatchEvent(new CustomEvent('theme-update'));
  });
}

describe('<ThemeControlSwitch />', () => {
  beforeEach(() => {
    setupDOM('system');
    localStorage.clear();
    mockAstroThemeScript();
  });

  it('should render', () => {
    render(<ThemeControlSwitch />);

    const toggleGroup = screen.getByRole('group', {
      name: /theme control switch/,
    });

    expect(toggleGroup).toBeInTheDocument();

    expect(
      within(toggleGroup).getByRole('radio', {
        name: /switch to light theme/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(toggleGroup).getByRole('radio', { name: /match system theme/i }),
    ).toHaveAttribute('data-state', 'on');
    expect(
      within(toggleGroup).getByRole('radio', { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  test('today is sunny', () => {
    setupDOM('theme-light');
    render(<ThemeControlSwitch />);

    const toggleLight = screen.getByRole('radio', {
      name: /switch to light theme/i,
    });
    expect(toggleLight).toHaveAttribute('data-state', 'on');
  });

  test('history is made at night', () => {
    setupDOM('dark');

    render(<ThemeControlSwitch />);

    const toggleDark = screen.getByRole('radio', {
      name: /switch to dark theme/i,
    });
    expect(toggleDark).toHaveAttribute('data-state', 'on');
  });

  it('change dark mode', () => {
    render(<ThemeControlSwitch />);

    expect(
      screen.getByRole('radio', { name: /match system theme/i }),
    ).toHaveAttribute('data-state', 'on');

    const toggleDark = screen.getByRole('radio', {
      name: /switch to dark theme/i,
    });

    fireEvent.click(toggleDark);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('change light mode', () => {
    setupDOM('dark');

    render(<ThemeControlSwitch />);

    expect(
      screen.getByRole('radio', { name: /switch to dark theme/i }),
    ).toHaveAttribute('data-state', 'on');

    const toggleLight = screen.getByRole('radio', {
      name: /switch to light theme/i,
    });

    fireEvent.click(toggleLight);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
