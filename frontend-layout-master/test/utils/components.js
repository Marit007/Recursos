/**
 * Module dependencies
 */
const React = require('react');
const Head = require('../../src/head');

/**
 * Layout & Components
 */
exports.Layout = props => (
  <body data-site={props.platform.id} data-country={props.platform.countryId}>
    <Head>
      <title>Layout</title>
    </Head>
    <main id="root-app">
      {'{{children}}'}
    </main>
    {'{{melidata}}'}
    {'{{scripts}}'}
  </body>
);

exports.Component = props => (
  <div data-test={props.test}>
    <h1>Component Test</h1>
  </div>
);
