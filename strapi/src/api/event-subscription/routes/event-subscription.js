'use strict';

/**
 * event-subscription router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-subscription.event-subscription');
