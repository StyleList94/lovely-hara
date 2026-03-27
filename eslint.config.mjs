import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import * as astroESLintParser from 'astro-eslint-parser';
import tsESLintParser from '@typescript-eslint/parser';
import { configs as astroConfigs } from 'eslint-plugin-astro';
import stylish from 'eslint-config-stylish';
import stylishTypeScript from 'eslint-config-stylish/typescript';

export default defineConfig(
  // ESLint handles .astro only — all other files are handled by oxlint
  globalIgnores([
    'node_modules',
    'dist',
    '.astro',
    '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
  ]),
  ...astroConfigs.recommended,
  ...astroConfigs['jsx-a11y-strict'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroESLintParser,
      parserOptions: {
        parser: tsESLintParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    extends: [stylish, stylishTypeScript],
    rules: {
      'astro/prefer-class-list-directive': 'warn',
      'import/prefer-default-export': 'off',
      'import/namespace': 'off',
    },
  },
);
