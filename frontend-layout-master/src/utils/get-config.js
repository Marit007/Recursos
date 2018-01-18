/**
 * Module dependencies
 */
const config = require('frontend-config');
const layoutConfig = require('../../config/layout-config');

module.exports = function getConfiguration(platform) {
  // Get labels configuration with platform id, if doesn't exist return default
  const configSchema = layoutConfig[platform.id] && layoutConfig[platform.id][platform.siteId] ?
    layoutConfig[platform.id][platform.siteId] : layoutConfig.ML.MLA;

  // Get URL configuration with platform id, if doesn't exist return default
  const urls = config.get('url', platform.id, platform.siteId) ?
    config.get('url', platform.id, platform.siteId) : config.get('url', 'ML', 'MLA');

  const rumPercentage = config.get('rum.percentage', platform.id, platform.siteId);

  const labels = {
    headTitle: config.get('defaultTitle', platform.id, platform.siteId),
    copyrightSince: config.get('copyrightSince', platform.id, platform.siteId),
    companyName: config.get('companyName', platform.id, platform.siteId),
    extraCompanyName: config.get('extraCompanyName', platform.id, platform.siteId),
    mobileAppsStore: config.get('mobileAppsStore', platform.id, platform.siteId)
  };

  const features = config.get('features', platform.id, platform.siteId);

  return { configSchema, urls, labels, rumPercentage, features };
};
