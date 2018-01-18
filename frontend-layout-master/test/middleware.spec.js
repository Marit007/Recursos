/**
 * Module dependencies
 */
const React = require('react');
const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const layoutMiddleware = require('../src/middleware');
const { Layout, Component } = require('./utils/components');
const { version } = require('../package.json');

/**
 * Tests
 */
describe('Layout middleware', () => {
  let req;
  let res;
  let middleware;
  const next = () => {};
  const uiNavLinkRegex = /<link rel="stylesheet" type="text\/css" href="https:\/\/http2.mlstatic.com\/ui\/navigation\/(\d\.){2}\d\/mercadolibre\/navigation\.css" \/>/;

  beforeEach(() => {
    req = httpMocks.createRequest({
      platform: {
        id: 'ML',
        countryId: 'AR',
        siteId: 'MLA',
        domain: 'mercadolibre.com.ar',
      },
      browser: {
        name: 'chrome',
        version: '59',
      },
      protocol: 'https',
      connection: {
        encrypted: true,
      },
      device: {
        mobile: true,
      },
      user: {
        nickname: 'sayMyName',
      },
    });
    res = httpMocks.createResponse();
    middleware = layoutMiddleware({
      externalCss: ['http://www.test.cdnstylesheet.css'],
      inlineCss: ['<style>.specific-test{margin: 0;}</style>'],
    });
  });

  it('Should return a middleware function', () => {
    expect(middleware).to.be.a('function');
  });

  it('Should define a res.render() function', () => {
    middleware(req, res, next);
    expect(res.render).to.be.a('function');
  });

  it('Should define response Content-Type header', () => {
    middleware(req, res, next);
    res.render(Component);
    expect(res.get('Content-Type')).to.be.equal('text/html; charset=utf-8');
  });

  it('Should execute the given callback', (done) => {
    middleware(req, res, next);
    res.render(Component, {}, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.be.a('string');
      done();
    });
  });

  it('Should execute next middleware', (done) => {
    middleware(req, res, done);
  });

  it('Should add <!DOCTYPE html> to response', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<!DOCTYPE html>');
      done();
    });
  });

  it('Should add html lang attribute', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<html lang="es-AR">');
      done();
    });
  });

  it('Should use the given layout', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<meta http-equiv="X-UA-Compatible" content="IE=edge"/>');
      done();
    });
  });

  it('Should remove \'{{children}}\' string', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.not.contain('{{children}}');
      done();
    });
  });

  it('Should render the given Component', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('Component Test');
      done();
    });
  });

  it('Should render to string by default', (done) => {
    middleware(req, res, next);
    res.render(Component, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('data-reactroot');
      expect(html).to.contain('data-reactid');
      expect(html).to.contain('data-react-checksum');
      done();
    });
  });

  it('Should render layout without component', (done) => {
    middleware(req, res, next);
    res.render(null, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('nav-header-menu');
      done();
    });
  });

  it('Should render a body without head with none type', (done) => {
    middleware(req, res, next);
    res.render(null, {
      type: 'none',
    }, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<head></head>');
      done();
    });
  });

  it('Should render layout without logged user', (done) => {
    req.user = null;
    middleware(req, res, next);
    res.render(null, undefined, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('nav-header-menu');
      done();
    });
  });

  it('Should render to static markup', (done) => {
    middleware(req, res, next);
    res.render(Component, { staticMarkup: true }, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<h1>Component Test</h1>');
      expect(html).to.not.contain('data-reactroot');
      expect(html).to.not.contain('data-reactid');
      expect(html).to.not.contain('data-react-checksum');
      done();
    });
  });

  it('Should apply critical path', (done) => {
    const criticalPath = {
      key: 'critical_test',
    };

    middleware(req, res, next);
    res.render(Component, { criticalPath }, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('* @platform "mercadolibre"');
      expect(html).to.not.match(uiNavLinkRegex);
      done();
    });
  });

  it('Should apply cdn styles with critical path cookie', (done) => {
    const criticalPath = {
      key: 'critical_test',
    };

    req.cookies.c_critical_test = version;
    middleware(req, res, next);
    res.render(Component, { criticalPath }, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.match(uiNavLinkRegex);
      done();
    });
  });

  it('Should apply inline declared styles', (done) => {
    req.cookies.cp_layout = null;
    middleware(req, res, next);
    res.render(Component, {}, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('.specific-test{margin: 0;}');
      done();
    });
  });

  it('Should apply external declared styles', (done) => {
    req.cookies.cp_layout = null;
    middleware(req, res, next);
    res.render(Component, {}, (err, html) => {
      expect(err).to.equal(null);
      expect(html).to.contain('<link rel="stylesheet" type="text/css" href="http://www.test.cdnstylesheet.css" />');
      done();
    });
  });
});
