const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
        mono: ['var(--font-roboto-mono)'],
        display: ['var(--font-titillium-web)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
