/**
 * Module dependencies
 */
const { createConfig, entryPoint } = require('nordic-dev/building_blocks');
const classicPreset = require('nordic-dev/building_blocks/presets/classic');
const { name } = require('../package.json');

/**
 * Create webpack config
 */
const config = createConfig([
  entryPoint({
    demo: './examples/app/client/demo.js',
  }),
  classicPreset({
    buildPath: './examples/build',
  }),
]);

/**
 * Expose config
 */
module.exports = config;
