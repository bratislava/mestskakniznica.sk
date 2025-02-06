module.exports = {
  extends: [
    'auto',
    'plugin:tailwindcss/recommended',
    'plugin:@next/next/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:lodash/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: [
    'only-warn',
    'prettier',
    'jsx-a11y',
    'lodash',
    '@typescript-eslint',
    '@next/next',
    'simple-import-sort',
    'tailwindcss',
  ],
  parser: '@typescript-eslint/parser', // Ensure correct parser for TypeScript
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }], // We prefer arrow functions
    'react/require-default-props': 'off', // We specify default props in props decomposition

    /** TypeScript */
    '@typescript-eslint/explicit-function-return-type': 'off', // Too tedious to type every function return explicitly
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',

    /** Accessibility */
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/anchor-is-valid': 'off', // Next Link does not need href in <a> tag

    /** Imports */
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'import/extensions': 'off',

    'prettier/prettier': 'error',
    'unicorn/no-array-callback-reference': 'off', // We use this a lot with isDefined and hasAttributes
    'arrow-body-style': 'off', // It's annoying to refactor from one style to another
    'lodash/prefer-noop': 'off',
    '@next/next/no-img-element': 'off',

    // These are exceptions that we use with "__"
    'no-underscore-dangle': [
      2,
      { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
    ],

    // Links get confused for secrets
    'no-secrets/no-secrets': [
      'error',
      {
        ignoreContent: [
          // https://stackoverflow.com/a/3809435
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm,
        ],
      },
    ],

    /** Does not work in our case */
    // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584#issuecomment-1191175244
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
  },
  ignorePatterns: ['*.config.*', 'graphql', '.eslintrc.js'],
}
