const { i18n, reloadOnPrerender } = require('./next-i18next.config')

module.exports = {
  locales: i18n.locales,
  input: '(assets|components|hooks|modules|navikronos|pages|services|styles|utils)/**/*.{tsx,ts}',
  output: './public/locales/$LOCALE/$NAMESPACE.json',
  // if set to true preserves old values in a separate json file
  createOldCatalogs: false,
  sort: true,
  // makes the translation json file flat
  keySeparator: false,
}
