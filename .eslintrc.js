module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:@next/next/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
  ],
  rules: {
  },
  ignorePatterns: ['src/**/*.msx']
}
