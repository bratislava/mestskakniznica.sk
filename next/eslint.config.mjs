// "core" eslint setup
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

// next.js plugin with flat config support
import nextPlugin from '@next/eslint-plugin-next'

// react and related plugins
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'

// additional eslint config
import security from 'eslint-plugin-security'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import sonarjs from 'eslint-plugin-sonarjs'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import i18next from 'eslint-plugin-i18next'
import tanstackQuery from '@tanstack/eslint-plugin-query'

const simpleImportSortConfig = {
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}

export default defineConfig(
  // Next.js flat config (avoids RushStack patch issue with ESLint v9 - described in https://github.com/microsoft/rushstack/issues/5049)
  nextPlugin.flatConfig.recommended,
  nextPlugin.flatConfig.coreWebVitals,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // React specific rules (overrides for Next.js react plugin)
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
      'react/display-name': 'off',

      // Import rules (overrides for Next.js import plugin)
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-duplicates': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

      // JSX A11y rules (overrides for Next.js jsx-a11y plugin)
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/img-redundant-alt': 'warn',

      // Next.js specific rules
      '@next/next/no-img-element': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylistic,
  prettier,
  simpleImportSortConfig,
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  sonarjs.configs.recommended,
  i18next.configs['flat/recommended'],
  tanstackQuery.configs['flat/recommended'],
  {
    rules: {
      // Additional TypeScript ESLint rules from common config
      '@typescript-eslint/no-restricted-imports': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': 'warn',

      // Additional ESLint rules from common config
      'no-console': 'warn',
      'array-callback-return': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-assignment': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'new-cap': ['error', { capIsNew: false }],
      'no-caller': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'no-invalid-this': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'warn',
      yoda: 'error',

      // common SonarJS configuration extension
      'sonarjs/fixme-tag': 'warn',
      'sonarjs/deprecation': 'warn',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/prefer-immediate-return': 'off',
      'sonarjs/no-useless-catch': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/no-nested-conditional': 'off',
      // Disable sonarjs/different-types-comparison until JS-619 is resolved
      // https://sonarsource.atlassian.net/browse/JS-619
      'sonarjs/different-types-comparison': 'off',

      // i18next rules
      'i18next/no-literal-string': 'off',

      // Disabled rules from previous config
      'max-classes-per-file': 'off',
      'class-methods-use-this': 'off',
      'no-useless-catch': 'off',
      'no-await-in-loop': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Custom rules from original config
      'no-underscore-dangle': [
        2,
        { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
      ],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      // TODO good rules, require work to fix and were skipped over in eslint v9 upgrade
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/prefer-regexp-exec': 'off',
      'security/detect-unsafe-regex': 'off',
      'security/detect-object-injection': 'off',
      'no-implicit-coercion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'warn', // 170 violations
      '@typescript-eslint/no-unused-vars': 'warn', // 155 violations
      '@typescript-eslint/no-confusing-void-expression': 'warn', // 90 violations
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
  // Next.js specific configuration
  {
    files: ['**/pages/**/*.{js,jsx,ts,tsx}', '**/src/pages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/display-name': 'off',
    },
  },
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'eslint.config.js',
      'eslint.config.mjs',
      'next-env.d.ts',
      '**/*.svg',
      'services/graphql/**',
      '.next/**',
      'out/**',
    ],
  },
)
