import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow require() in config/utility files that import dynamically
      '@typescript-eslint/no-require-imports': 'warn',
    },
  },
  {
    ignores: ['.velite/**', '.next/**', 'node_modules/**', '*.config.*'],
  },
);
