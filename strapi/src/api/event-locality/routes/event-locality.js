'use strict';

/**
 * event-locality router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-locality.event-locality');
