/**
 * Module dependencies
 */
const React = require('react');
const DemoView = require('./components/DemoView');
const config = require('nordic/config');
const logger = require('nordic/logger')();

const { basePath } = config.ragnar;

/**
 * Render Demo
 */
exports.render = function render(req, res) {
  /**
   * Render View
   */
  res.render(DemoView, {
    baseURL: `${basePath}demo`,
    staticMarkup: false,
    type: 'lite',
    site: res.locals.site,
    siteId: req.platform.siteId,
    lowEnd: req.device.lowEnd,
    deviceType: req.device.type,
    translations: req.translations,
    company: config.get('companyName', req.platform.id, req.platform.siteId),
    fixed: true,
    searchFocus: false,
    category: {
      id: 'OC:MLA32089',
      name: 'Solo en iPhone',
      permalink: 'https://celulares.mercadolibre.com.ar/iphone/$query',
    },
    performanceStats: (r) => logger.info(`Page perf stats: ${JSON.stringify(r)}`),
    criticalPath: {
      key: 'demo_fl',
    },
  });
};
