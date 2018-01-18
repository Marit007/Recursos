/**
 * Module dependencies
 */
const feConfig = require('frontend-config');
const { DISABLE_JCORS_LOADER, PRODUCTION } = require('frontend-env');

/**
 * getAssetsConfig
 */
function getAssetsConfig({ criticalKey, criticalPathProps }) {
  const assets = feConfig.get('assets') || {};
  return {
    useManifest: typeof assets.useManifest === 'undefined' ? PRODUCTION : assets.useManifest,
    manifest: assets.manifest || 'manifest.json',
    prefix: assets.prefix || '/',
    basePath: assets.basePath || 'build',
    criticalKey,
    criticalCookiePath: criticalPathProps.cookiePath,
    criticalCookieDomain: criticalPathProps.cookieDomain,
    avoidJcorsLoading: DISABLE_JCORS_LOADER && JSON.parse(DISABLE_JCORS_LOADER),
  };
}

/**
 * Expose getAssetsConfig
 */
module.exports = getAssetsConfig;
