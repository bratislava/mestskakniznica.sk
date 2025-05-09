"use strict";;
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    //------------------------------------
    // ADDING REVALIDATE WEBHOOK
    //------------------------------------

// create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2482527848
    const webhook = await strapi.db?.query('webhook').findOne({
      where: {
        name: 'Bootstrapped Revalidate',
      },
    })

    if (!webhook) {
      await strapi.webhookStore?.createWebhook({
        id: 'Bootstrapped Revalidate',
        name: 'Bootstrapped Revalidate',
        url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
        events: ['entry.create', 'entry.update', 'entry.publish'],
        headers: {},
        isEnabled: true
      })
      console.log('Revalidate webhook created')
    } else {
      console.log('Revalidate webhook already exists')
    }

    //------------------------------------
    // ADDING ENGLISH LOCALE
    //------------------------------------
    const existingEnglish = await strapi.db?.query("plugin::i18n.locale")
      .findOne({ where: { code: "en" } });
    if (!existingEnglish) {
      const english = { name: "English (en)", code: "en" };
      try {
        await strapi.db?.query("plugin::i18n.locale").create({ data: english });
      } catch (error) {
        console.log(
          "Caught error while creating locale, checking if locale created successfully."
        );
        const createdEnglish = await strapi.db?.query("plugin::i18n.locale")
          .findOne({ where: english });
        if (createdEnglish) console.log("Created English locale.");
      }
    }
    console.log({
      locales: await strapi.db?.query("plugin::i18n.locale").findMany(),
    });
  },
};
