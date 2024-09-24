'use strict';

/**
 * parc service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parc.parc');
