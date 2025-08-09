import tseslint from 'typescript-eslint';
import stylish from 'eslint-config-stylish';
import stylishReact from 'eslint-config-stylish/react';
import stylishReactHooks from 'eslint-config-stylish/react-hooks';
import stylishTypeScript from 'eslint-config-stylish/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [stylish],
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
  eslintConfigPrettier,
);
