'use strict';

/**
 * alerte service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::alerte.alerte');
