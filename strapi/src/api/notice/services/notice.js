'use strict';

/**
 * notice service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notice.notice');
