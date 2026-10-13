import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier' // Add this
import tailwind from 'eslint-plugin-tailwindcss'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
      tailwindcss: tailwind,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react-hooks/refs': 'off',
      'react/no-unescaped-entities': 'off',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'tailwindcss/classnames-order': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  eslintConfigPrettier, // This must be last to override other rules
  ...storybook.configs['flat/recommended'],
)