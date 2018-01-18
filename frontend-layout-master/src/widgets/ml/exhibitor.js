const restClient = require('frontend-restclient');
const log = require('frontend-logger')('frontend-layout');
const { PRODUCTION } = require('frontend-env');

const request = restClient({
  timeout: PRODUCTION ? 100 : 1000,
});

module.exports = ({ platform, device, headers, user }) => {
  const data = {
    exhibitorInfo: {},
  };

  /**
   * TODO: We should remove this logic in a near future.
   * As in middleware.js (around line 87), the header x-menu-type is temporal
   */
  const extendedMenu = headers && headers['x-menu-type'] === 'extended';

  if (device.mobile || !extendedMenu) {
    return Promise.resolve(data);
  }

  const exhibitorUrl = `/frontend/sites/${platform.siteId}/menu/exhibitors`;
  const requestConfig = user ? {
    params: { user_id: user.id }
  } : undefined;

  return request.get(exhibitorUrl, requestConfig)
    .then((response) => {
      data.exhibitorInfo = response.data;
      return data;
    })
    .catch((err) => {
      log.error(err.stack, { platform: platform.id, siteId: platform.siteId });
      return data;
    });
};
