module.exports = {
  extends: [
    'expo',
    'prettier',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
