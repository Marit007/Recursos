/**
 * Module dependencies
 */
const path = require('path');

// In the production Fury env the VERSION is defined in environment variables
let { VERSION } = process.env;
// If for a some reason VERSION is not defined use the version value from app package.json
// Also it is used for development
if (!VERSION) {
  try {
    VERSION = require(path.join(path.resolve('./'), 'package.json')).version; // eslint-disable-line
  } catch (e) {
    VERSION = '1.0.0';
  }
}

/**
 * Expose VERSION
 */
module.exports = VERSION;
