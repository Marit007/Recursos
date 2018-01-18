/**
 * Styles
 */
require('../pages/demo/demo.scss');

/**
 * Module dependencies
 */
const React = require('react');
const ReactDOM = require('react-dom');
const DemoView = require('../pages/demo/components/DemoView');


/**
 * Mount DemoView on client
 */
ReactDOM.render(
  <DemoView device="desktop" />,
  document.getElementById('root-app'),
);
