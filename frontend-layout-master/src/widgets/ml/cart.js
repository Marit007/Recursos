const { CartService } = require('nav-cart');
const log = require('frontend-logger')('frontend-layout');
const getConfiguration = require('../../utils/get-config');

module.exports = ({ platform, user }) => {
  const config = getConfiguration(platform);

  if (config && config.features && config.features.cart) {
    return CartService({ siteId: platform.siteId, user }).getInfo()
      .then(cartResponse => ({ cartInfo: cartResponse.data }))
      .catch((err) => {
        log.error(err.stack, { platform: platform.id, siteId: platform.siteId });
        return { cartInfo: {} };
      });
  }

  return Promise.resolve({ cartInfo: {} });
};
