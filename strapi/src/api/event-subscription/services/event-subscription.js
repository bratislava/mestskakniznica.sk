'use strict';

/**
 * event-subscription service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-subscription.event-subscription');
