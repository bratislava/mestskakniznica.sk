// This config is used by next-i18next. The `i18n` "subconfig" should be also imported and used in next.config.js.
// Docs: https://github.com/i18next/next-i18next?tab=readme-ov-file#3-project-setup
module.exports = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk', 'en'],
    localeDetection: false,
  },
  defaultNS: ['translation'], // Changed to match the namespace used by i18next-parser
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
