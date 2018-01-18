/**
 * Module dependencies
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const babel = require('nordic-dev/building_blocks/babel');
const {
  createConfig,
  customConfig,
  entryPoint,
  setOutput,
  addPlugins } = require('nordic-dev/building_blocks');

/**
 * Config
 */
module.exports = createConfig([
  entryPoint({
    Layout: './src/layout.js',
  }),
  babel(),
  customConfig({
    target: 'node',
    externals: [
      nodeExternals(),
    ],
  }),
  addPlugins([
    new CleanWebpackPlugin(['lib'], {
      root: `${__dirname}/`,
      verbose: true,
    }),
  ]),
  setOutput({
    libraryTarget: 'commonjs2',
    library: '[name]',
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js',
  }),
]);
