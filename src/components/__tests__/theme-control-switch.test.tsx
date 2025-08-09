import '@testing-library/jest-dom/vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import ThemeControlSwitch from '../theme-control-switch';

function setupDOM(theme: 'dark' | 'theme-light' = 'theme-light') {
  document.documentElement.className = theme === 'dark' ? 'dark' : '';
}

describe('<ThemeControlSwitch />', () => {
  beforeEach(() => {
    setupDOM('theme-light');
  });

  it('should render', () => {
    render(<ThemeControlSwitch />);

    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  test('today is sunny', () => {
    render(<ThemeControlSwitch />);

    const lightModeIcon = screen.getByLabelText(/icon-light-mode/i);
    expect(lightModeIcon).toBeInTheDocument();
  });

  test('history is made at night', () => {
    setupDOM('dark');

    render(<ThemeControlSwitch />);

    const darkModeIcon = screen.getByLabelText(/icon-dark-mode/i);
    expect(darkModeIcon).toBeInTheDocument();
  });

  it('change dark mode', () => {
    render(<ThemeControlSwitch />);

    const switchButton = screen.getByRole('switch');

    fireEvent.click(switchButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('change light mode', () => {
    setupDOM('dark');

    render(<ThemeControlSwitch />);

    const switchButton = screen.getByRole('switch');

    fireEvent.click(switchButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
