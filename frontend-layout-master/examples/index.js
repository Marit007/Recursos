/**
 * Babel register
 */
require('babel-register')({
  ignore: ['node_modules']
});

/**
 * Module dependencies
 */
const ragnar = require('nordic/ragnar');

/**
 * Configuration
 */
const config = require('nordic/config');

/**
 * Routers
 */
const app = require('./app/server');

/**
 * Expose Ragnar server instance
 */
module.exports = ragnar({
  config: config.ragnar,
  appRouter: app,
});
