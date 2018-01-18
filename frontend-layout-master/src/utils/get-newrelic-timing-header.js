const config = require('frontend-config');
const { PRODUCTION } = require('frontend-env');

/**
 * Platform independent percentage that can be defined in a project
 */
const defaultRumPercentage = config.get('rum.percentage');

let newrelic;
if (PRODUCTION) {
  try {
    newrelic = require('newrelic'); // eslint-disable-line global-require
  } catch (err) {
    // If for any reason newrelic is not installed as a peer dependency define a stub
    newrelic = {
      getBrowserTimingHeader() {
        return '';
      },
    };
  }
}

/**
 * Get Newrelic code for the browser
 * Returns an empty string in any environment different to `production`
 *
 * @param {object} req Request object with platform defined
 * @return {string}
 */
module.exports = function getNewrelicTimingHeader(platform) {
  if (!PRODUCTION || !platform) {
    return '';
  }

  const rumPercentage = defaultRumPercentage === undefined ?
    config.get('rum.percentage', platform.id, platform.siteId) : defaultRumPercentage;

  // Use Math.floor to disable the code generation by using `0` value
  return Math.floor(Math.random() * 100) < Number(rumPercentage) ? newrelic.getBrowserTimingHeader() : '';
};
