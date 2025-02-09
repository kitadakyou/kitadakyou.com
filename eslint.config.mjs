import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  ...compat.extends('standard'),
  {
    ignores: ['components/ui/**',
      'components/Results/**/Charts/**',
      'src/libs/swagger.d.ts']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        React: 'writable'
      },
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal']
      }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]

export default configs