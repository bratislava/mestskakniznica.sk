'use strict';

/**
 * event-locality service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-locality.event-locality');
