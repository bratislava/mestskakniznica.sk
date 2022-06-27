'use strict';

/**
 * book-tag service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-tag.book-tag');
