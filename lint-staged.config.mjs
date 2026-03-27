import path from 'node:path';
import process from 'node:process';

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const files = filenames.map((file) => path.relative(process.cwd(), file));
    return [`oxfmt --write ${files.join(' ')}`, `oxlint --fix ${files.join(' ')}`];
  },
  '*.astro': (filenames) => {
    const files = filenames.map((file) => path.relative(process.cwd(), file));
    return [
      `prettier --write ${files.join(' ')}`,
      `eslint --fix ${files.join(' ')}`,
    ];
  },
  '*.{json,css,md,yaml,yml}': (filenames) => {
    const files = filenames.map((file) => path.relative(process.cwd(), file));
    return `oxfmt --write ${files.join(' ')}`;
  },
};
