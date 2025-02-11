export default {
  config: {
    // Add a new locale, other than 'en'
    locales: ['sk'],

    // Disable video tutorials
    tutorials: false,

    // Disable notifications about new Strapi releases
    notifications: {
      releases: false,
    },
  },
  bootstrap(app) {
    console.log(app)
  },
}
