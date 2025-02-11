import { Strapi } from '@strapi/strapi'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  // register({ strapi }: { strapi: any }) { },
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    //------------------------------------
    // ADDING ENGLISH LOCALE
    //------------------------------------
    const existingEnglish = await strapi.db
      .query('plugin::i18n.locale')
      .findOne({ where: { code: 'en' } })
    if (!existingEnglish) {
      const english = { name: 'English (en)', code: 'en' }
      try {
        await strapi.db.query('plugin::i18n.locale').create({ data: english })
      } catch (error) {
        console.log('Caught error while creating locale, checking if locale created successfully.')
        const createdEnglish = await strapi.db
          .query('plugin::i18n.locale')
          .findOne({ where: english })
        if (createdEnglish) console.log('Created English locale.')
      }
    }
    console.log({
      locales: await strapi.db.query('plugin::i18n.locale').findMany(),
    })
  },
}
