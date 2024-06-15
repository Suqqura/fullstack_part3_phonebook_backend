import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'

// 1
export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      '@stylistic/js': stylistic,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    'rules': {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
]
