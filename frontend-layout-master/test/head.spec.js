/**
 * Module dependencies
 */
const React = require('react');
const expect = require('chai').expect;
const { shallow } = require('enzyme');
const getConfiguration = require('../src/utils/get-config');

const Head = require('../src/head');

/**
 * Tests
 */
describe('Head Component', () => {
  const testProps = {
    platform: {
      id: 'ML',
      countryId: 'AR',
      siteId: 'MLA',
      domain: 'mercadolibre.com.ar',
    },
    device: {
      mobile: true,
    },
    user: {
      nickname: 'sayMyName',
    },
    browser: {
      name: 'chrome',
      version: 59,
    },
  };
  testProps.urls = getConfiguration(testProps.platform).urls;
  testProps.configSchema = getConfiguration(testProps.platform).configSchema;
  testProps.labels = getConfiguration(testProps.platform).labels;
  testProps.platformColor = getConfiguration(testProps.platform).platformColor;

  const uiNavLinkRegex = /<link rel="stylesheet" type="text\/css" href="https:\/\/http2.mlstatic.com\/ui\/navigation\/(\d\.){2}\d\/mercadolibre\/navigation\.css" \/>/;
  const html5shivLinkRegex = /<script src="https:\/\/http2.mlstatic.com\/static\/org-img\/ch\/vendor\/html5shiv\/html5shiv-3.7.0\.js"><\/script>/;

  it('<Head/> should include layout css inline', () => {
    const el = Head.render(testProps, true);
    expect(el).to.contain('* @platform "mercadolibre"');
    expect(el).to.not.match(uiNavLinkRegex);
  });

  it('<Head/> should include layout css cdn', () => {
    const el = Head.render(testProps, false);
    expect(el).to.match(uiNavLinkRegex);
  });

  it('<Head/> should include declared inline css', () => {
    testProps.inlineCss = ['<style>.test{margin: 0;}</style>'];
    const el = Head.render(testProps, true);
    expect(el).to.contain('<style>.test{margin: 0;}</style>');
  });

  it('<Head/> should include declared external css', () => {
    testProps.externalCss = ['http://www.test.cdnstylesheet.css'];
    const el = Head.render(testProps, false);
    expect(el).to.contain('<link rel="stylesheet" type="text/css" href="http://www.test.cdnstylesheet.css" />');
  });

  it('<Head/> should include scripts loader if theres a script declared', () => {
    testProps.scripts = ['test.js'];
    const el = Head.render(testProps, false);
    expect(el).to.contain(`<script>window.addEventListener('load',function(){var s="${testProps.scripts}";if (s==='null'||s==='undefined')return;s=s.split(',');s.forEach(function(c){var t=document.createElement('script');t.src=c;t.async=false;t.defer=true;document.head.appendChild(t);})})</script>`);
  });

  it('<Head/> should not include html5shiv script', () => {
    const el = Head.render(testProps, true);
    expect(el).to.not.match(html5shivLinkRegex);
  });

  it('<Head/> should include html5shiv script for IE8', () => {
    testProps.browser.name = 'ie';
    testProps.browser.version = 8;
    const el = Head.render(testProps, false);
    expect(el).to.match(html5shivLinkRegex);
  });
});
