'use strict';

/**
 * event-tag service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-tag.event-tag');
