import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import astroESLintParser from 'astro-eslint-parser';
import tsESLintParser from '@typescript-eslint/parser';

import { configs as astroConfigs } from 'eslint-plugin-astro';
import stylish from 'eslint-config-stylish';
import stylishReact from 'eslint-config-stylish/react';
import stylishReactHooks from 'eslint-config-stylish/react-hooks';
import stylishTypeScript from 'eslint-config-stylish/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig(
  globalIgnores(['node_modules', 'dist', '.astro']),
  ...astroConfigs.recommended,
  ...astroConfigs['jsx-a11y-strict'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx,astro}'],
    extends: [stylish],
    settings: {
      'import/internal-regex': '^motion-plus',
    },
    rules: {
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    extends: [stylishReact, stylishReactHooks],
  },
  {
    files: ['**/use*.ts'],
    extends: [stylishReactHooks],
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    extends: [stylishTypeScript],
  },
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
    extends: [stylishTypeScript],
    rules: {
      'astro/prefer-class-list-directive': 'warn',
      'import/namespace': 'off',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...vitest.configs.recommended,
  },
  eslintConfigPrettier,
);
