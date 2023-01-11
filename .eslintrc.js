/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', '@typescript-eslint'],

  rules: {
    'prettier/prettier': [1],

    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/consistent-type-imports': 1,

    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      1,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
