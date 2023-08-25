module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // https://github.com/jsx-eslint/eslint-plugin-react#configuration-legacy-eslintrc-
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', 'import', 'unused-imports'],
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/unbound-method.md
        // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
        '@typescript-eslint/unbound-method': 'off',
      }
    }
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'import/order': [
      'warn',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        'pathGroups': []
      }
    ]
  },
  settings: {
    'import/resolver': { typescript: {} },
    'react': {
      'version': 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  }
}
