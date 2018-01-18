const makeLink = url => `<link rel="preconnect" href="${url}"/>`;

const preconnects = [
  '//analytics.mlstatic.com',
  '//resources.mlstatic.com',
  '//static.mlstatic.com',
  'https://www.google-analytics.com',
  'https://www.google.com',
  'https://http2.mlstatic.com',
].map(makeLink).join('');

/**
 * Add preconnect for new users of Google Analytics
 * @see https://github.com/mercadolibre/commons-frontend/blob/f59c4bd8ee35d30f79d6670acaef71b2d8851a38/plugin/grails-app/views/layouts/base.gsp#L15-L17
 */
const firstTimeGA = (cookies, platformId) => {
  const cookie = cookies[`_${platformId.toLowerCase()}_ci`];
  return !cookie || cookie === '' ? makeLink('https://stats.g.doubleclick.net') : '';
};

/**
 * Detects is the Google Analytics Audience plugin has already been loaded and data has been collected
 * @param cookies {object} A list of parsed request cookies
 * @param countryId {string} A country code in ISO 3166 format
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/display-features#changing-the-cookie-name for cookie name information
 * @return {string}
 */
const firstTimeGAAudience = (cookies, countryId) => {
  if (cookies._gat) { // eslint-disable-line no-underscore-dangle
    return '';
  }

  const cid = countryId.toLowerCase();
  return makeLink(`https://www.google.${['CL', 'PT'].indexOf(countryId) === -1 ? 'com.' : ''}${cid}`);
};

module.exports = function getPreconnects(cookies, platformId, countryId) {
  return `${preconnects}${firstTimeGA(cookies, platformId)}${firstTimeGAAudience(cookies, countryId)}`;
};
