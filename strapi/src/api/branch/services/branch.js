'use strict';

/**
 * branch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::branch.branch');
