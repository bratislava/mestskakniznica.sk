module.exports = {
  extends: [
    'auto',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:i18next/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    /** We use this a lot with isDefined and hasAttributes */
    'unicorn/no-array-callback-reference': 'off',
    /** Named export is easier to refactor automatically */
    'import/prefer-default-export': 'off',
    /** Too tedious to type every function return explicitly */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** We prefer arrow functions */
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    /** It's annoying to refactor from one style to another */
    'arrow-body-style': 'off',
    /** These are exceptions that we use with "__" */
    'no-underscore-dangle': [
      'error',
      { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
    ],
    /** Too many false positives, especially with i18n keys */
    'no-secrets/no-secrets': 'off',
    /** Allowing whole files works the best */
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    /** We specify default props in props decomposition */
    'react/require-default-props': 'off',
    /** This is no longer needed since React 17 */
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    /** Next Link does not need href in <a> tag */
    'jsx-a11y/anchor-is-valid': 'off',
    /** Solve warning "Promise-returning function provided to attribute where a void return was expected." */
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/no-floating-promises': 'warn',

    'lodash/prefer-noop': 'off',
    'pii/no-email': 'off',
    'pii/no-phone-number': 'off',
    'xss/no-mixed-html': 'off',
    'const-case/uppercase': 'off',

    'i18next/no-literal-string': ['error', { 'should-validate-template': true }],

    'jsx-a11y/img-redundant-alt': 'warn',
    '@next/next/no-img-element': 'off',
    // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584#issuecomment-1191175244
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],

    'import/extensions': 'off',
    'react/display-name': 'off',

    /* Formatting rules */
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // TODO revisit, prettier should not be run by eslint
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
  ignorePatterns: ['*.config.*', '.eslintrc.js', 'services/graphql/index.ts'],
}
