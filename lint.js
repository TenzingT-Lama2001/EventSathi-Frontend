// module.exports = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'import','tailwindcss'],
//   parserOptions: {
//     project: './tsconfig.json',
//     sourceType: 'module',
//     ecmaVersion: 2020,
//   },
//   ignorePatterns: ['node_modules/*', 'components/ui/*'],
//   root: true,
//   env: {
//     node: true,
//     commonjs: true,
//     es2020: true,
//   },
//   extends: [
//     'airbnb-base',
//     'plugin:prettier/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'eslint:recommended',
//     'plugin:@typescript-eslint/eslint-recommended',
//     'next/core-web-vitals',
//     'next',
//     'airbnb',
//     'airbnb-typescript',
//     'plugin:tailwindcss/recommended',
//     'prettier'
//   ],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   settings: {
//     'import/resolver': {
//       typescript: {}, // enable TypeScript-aware module resolution
//     },
//     'tailwindcss': {
//       callees: ['cn'],
//       config: 'tailwind.config.ts'
//     },
//     'next': {
//       rootDir: true
//     }
//   },
//   rules: {
//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         ts: 'never',
//       },
//     ],
//     'func-names': 'off',
//     'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
//     '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
//     'no-underscore-dangle': 'off',
//     'eol-last': ['error', 'always'],
//     'prettier/prettier': [
//       'error',
//       {
//         trailingComma: 'all',
//         semi: true,
//         printWidth: 120,
//         singleQuote: true,
//       },
//     ],
//     'import/prefer-default-export': 'off',
//     'comma-dangle': [
//       'error',
//       {
//         arrays: 'always-multiline',
//         objects: 'always-multiline',
//         imports: 'never',
//         exports: 'never',
//         functions: 'ignore',
//       },
//     ],
//     'no-param-reassign': [
//       'error',
//       {
//         props: false,
//       },
//     ],
//     quotes: [
//       'error',
//       'single',
//       {
//         avoidEscape: true,
//         allowTemplateLiterals: false,
//       },
//       ],
//     'react/react-in-jsx-scope': 'off',
//     'react/jsx-uses-react': 'off',
//     '@next/next/no-html-link-for-pages': 'off',
//     'react/jsx-key': 'off',
//     'tailwindcss/no-custom-classname': 'off',
//     'tailwindcss/classnames-order': 'error',
//     'react/jsx-props-no-spreading': 'off'
//   },
// };
