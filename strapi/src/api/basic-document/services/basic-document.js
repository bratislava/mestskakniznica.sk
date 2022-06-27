'use strict';

/**
 * basic-document service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::basic-document.basic-document');
