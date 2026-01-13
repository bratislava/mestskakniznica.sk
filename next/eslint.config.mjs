import { createNextConfig } from '@bratislava/eslint-config-next'

export default [
  ...createNextConfig({
    ignores: ['services/graphql/**'],
  }),

  // Project-specific rule overrides
  // TODO: These rules require work to fix and were skipped over in eslint v9 upgrade
  {
    rules: {
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/prefer-regexp-exec': 'off',
      'security/detect-unsafe-regex': 'off',
      'security/detect-object-injection': 'off',
      'no-implicit-coercion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'warn', // 170 violations
      '@typescript-eslint/no-unused-vars': 'warn', // 155 violations
      '@typescript-eslint/no-unsafe-member-access': 'warn', // 52 violations
      '@typescript-eslint/no-deprecated': 'warn', // 25 violations
      '@typescript-eslint/ban-ts-comment': 'warn', // 16 violations
      'sonarjs/no-redundant-optional': 'warn', // 10 violations
      '@typescript-eslint/no-unsafe-call': 'warn', // 8 violations
      '@typescript-eslint/prefer-enum-initializers': 'warn', // 4 violations
      '@typescript-eslint/no-non-null-assertion': 'warn', // 4 violations
      '@typescript-eslint/switch-exhaustiveness-check': 'warn', // 3 violations
      '@typescript-eslint/require-await': 'warn', // 3 violations
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn', // 3 violations
      '@typescript-eslint/no-misused-spread': 'warn', // 2 violations
      '@typescript-eslint/no-invalid-void-type': 'warn', // 2 violations
      '@typescript-eslint/consistent-indexed-object-style': 'off', // 2 violations
      'sonarjs/function-return-type': 'warn', // 1 violation
      'sonarjs/class-name': 'warn', // 1 violation
      '@typescript-eslint/no-unnecessary-type-conversion': 'warn', // 1 violation
      '@typescript-eslint/no-useless-default-assignment': 'warn', // 1 violation
      '@typescript-eslint/no-unnecessary-template-expression': 'warn', // 1 violation
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn', // 1 violation
      '@typescript-eslint/no-unsafe-return': 'warn', // 1 violation
      '@typescript-eslint/no-unsafe-function-type': 'warn', // 1 violation
      'sonarjs/no-ignored-exceptions': 'warn', // 1 violation
      'sonarjs/no-dead-store': 'warn', // 1 violation
      'sonarjs/no-unused-vars': 'warn', // 1 violation
      'no-constant-binary-expression': 'warn', // 1 violation
    },
  },
]
