module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'plugin:eslint-plugin-internal/base',
      'plugin:eslint-plugin-internal/typescript',
      'plugin:eslint-plugin-internal/react',
      'plugin:eslint-plugin-internal/cypress',
      'plugin:eslint-plugin-internal/prettier'

    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
