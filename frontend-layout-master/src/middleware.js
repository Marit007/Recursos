/**
 * Module dependencies
 */
const Script = require('frontend-script');
const ScriptsBundler = require('frontend-script/bundler');
const Style = require('frontend-style');
const StylesBundler = require('frontend-style/bundler');
const MeliGA = require('frontend-analytics/meli-ga');
const bundleMeliGA = require('frontend-analytics/bundle');
const bundleMetrics = require('frontend-metrics/bundle');
const feConfig = require('frontend-config');
const MelidataTrack = require('frontend-melidata/melidata-track');
const bundleMelidata = require('frontend-melidata/bundle');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const HeadSync = require('react-declarative-head');
const getPreconnects = require('./utils/get-preconnects');
const getNewrelicTimingHeader = require('./utils/get-newrelic-timing-header');
const { getLayoutBase, getLayoutNone } = require('./utils/get-layout');
const getAssetsConfig = require('./utils/get-assets-config');
const getConfiguration = require('./utils/get-config');
const VERSION = require('./utils/get-version');
const getStats = require('./utils/get-stats');
const {
  overrideTypeProp,
  overrideFixedProp } = require('./utils/override-layout-props');
const widgets = require('./widgets');
const Head = require('./head');
// Use transpiled Layout component
const Layout = require('../lib/Layout');

/**
 * Layout Middleware
 */
function layoutMiddleware(options = {}) {
  // Configure a custom layout or use the default
  const LayoutComponent = options.layout || Layout;

  // Return the middleware function
  return function layoutMiddlewareFn(req, res, next) {
    const config = getConfiguration(req.platform);
    const secure = req.headers.ml_ssl === '1' || req.connection.encrypted;
    const proto = secure ? 'https' : 'http';
    let widgetsInfo = { cartInfo: {}, exhibitorInfo: {} };

    // Overwrite res.render()
    res.render = resRender;

    if (!widgets[req.platform.id]) {
      next();
    } else {
      widgets[req.platform.id]({ platform: req.platform, user: req.user, device: req.device, headers: req.headers })
        .then((widgetsResults) => {
          widgetsInfo = widgetsResults;
          next();
        });
    }

    function resRender(Component, data = {}, done) {
      const metricsConfig = feConfig.get('metrics', req.platform.id, req.platform.siteId) || {};
      let statsInstance;

      if (data.performanceStats) {
        statsInstance = getStats(Component.name);
      }

      const props = Object.assign({}, {
        actualLocation: `${proto}://${req.headers.host + req.originalUrl}`,
        configSchema: config.configSchema,
        features: config.features,
        device: req.device,
        labels: config.labels,
        platform: req.platform,
        browser: {
          name: req.browser.name,
          version: parseInt(req.browser.version, 10),
        },
        scripts: null,
        type: 'full', // default type
        urls: config.urls,
        user: req.user,
        criticalPath: {},
        metrics: metricsConfig,
      }, widgetsInfo, options, data);

      /**
       * The following feature are temporary for ML if the header 'x-menu-type' is defined.
       * The main idea is override the layout type and fixed props:
       * 1. First we should override the layout type.
       * 2. Then, override the fixed prop.
       * TODO: We should remove this logic in a near future.
       */
      if (req.platform.id === 'ML') {
        props.type = overrideTypeProp(props.type, req.headers, req.cookies);
        props.fixed = overrideFixedProp(props.type, props.fixed);
      }

      const noneLayout = props.type === 'none';

      /**
       * Create Layout with user, platform and device props,
       * then render the components (should be called before HeadSync.rewind, MeliGa.rewind and other bundling scripts)
       */
      let html;
      let app;
      try {
        if (!noneLayout) {
          const LayoutWithProps = React.createElement(LayoutComponent, props);
          html = ReactDOMServer.renderToStaticMarkup(LayoutWithProps);
        }
        // Render component with the given props
        app = Component ? ReactDOMServer[
          data.staticMarkup ? 'renderToStaticMarkup' : 'renderToString'
        ](React.createElement(Component, props)) : '';
      } catch (err) {
        // If a callback exist, pass an error to the callback
        if (done) {
          return done(err, null);
        }
        // Pass the exception to the next middleware otherwise
        return next(err);
      }

      // Start response
      res.header('Content-Type', 'text/html; charset=utf-8');

      /**
       * Critical path cookie handling
       */
      const criticalCookieName = `c_${props.criticalPath.key}`;
      const criticalPath = props.criticalPath.key && req.cookies &&
        (!req.cookies[criticalCookieName] || req.cookies[criticalCookieName] !== VERSION);
      if (criticalPath) {
        res.cookie(criticalCookieName, VERSION, {
          secure,
          httpOnly: true,
          domain: props.criticalPath.cookieDomain || req.hostname,
          path: props.criticalPath.cookiePath || '/',
          expires: new Date(Date.now() + 2592000000), // cookie expires in 30 days from now
        });
      }

      /**
       * Get assets config for styles and scripts
       */
      const assetsConfig = getAssetsConfig({
        criticalKey: criticalPath,
        criticalPathProps: props.criticalPath,
      });

      /**
       * Create promises
       */
      const headBundler = Promise.resolve(HeadSync.rewind());
      const stylesBundler = new StylesBundler(assetsConfig);
      const scriptsBundler = new ScriptsBundler(assetsConfig);
      const analyticsBundler = Promise.resolve(MeliGA.peek() ? `<script>${bundleMeliGA(req, MeliGA)}</script>` : '');
      const melidataBundler = Promise.resolve(MelidataTrack.peek() ? bundleMelidata(req, MelidataTrack) : '');
      const metricsBundler = Promise.resolve(bundleMetrics(req));

      // Using the Promise.all to parallelize the bundling
      return Promise.all([
        headBundler,                            // bundles[0]: head
        stylesBundler.bundle(req, res, Style),  // bundles[1]: styles
        scriptsBundler.bundle(Script),          // bundles[2]: scripts
        analyticsBundler,                       // bundles[3]: analytics
        melidataBundler,                        // bundles[4]: melidata
        metricsBundler,                         // bundles[5]: metrics
      ])
        .then((bundles) => {
          let output;

          if (noneLayout) {
            output = getLayoutNone({
              app,
              countryId: req.platform.countryId,
              initialState: data.state,
              headsync: bundles[0],
              styles: bundles[1],
              scripts: bundles[2],
            });
          } else {
            output = getLayoutBase({
              html,
              app,
              countryId: req.platform.countryId,
              lowEnd: req.device.lowEnd,
              preconnects: getPreconnects(req.cookies, req.platform.id, req.platform.countryId),
              newrelicTimingHeader: getNewrelicTimingHeader(req.platform),
              head: Head.render(props, criticalPath),
              initialState: data.state,
              headsync: bundles[0],
              styles: bundles[1],
              scripts: bundles[2],
              analytics: bundles[3],
              melidata: bundles[4],
              metrics: bundles[5],
            });
          }

          if (data.performanceStats) {
            data.performanceStats(statsInstance());
          }

          // If a callback exist, pass output to the callback
          // callback works like http://expressjs.com/en/4x/api.html#res.render
          if (done) {
            return done(null, output);
          }
          return res.send(output);
        })
        .catch((err) => {
          // If a callback exist, pass error to the callback
          if (done) {
            return done(err, null);
          }
          return next(err);
        });
    }
  };
}

/**
 * Expose layoutMiddleware
 */
module.exports = layoutMiddleware;
