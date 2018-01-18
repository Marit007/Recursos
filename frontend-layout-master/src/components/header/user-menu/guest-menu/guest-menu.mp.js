/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const parseParams = require('../../../../utils/url-parse-parameters');

/**
 * class GuestMenuMercadopago
 */
const GuestMenuMercadopago = ({ platform, header, urls, actualLocation }) => {
  const params = {
    actualLocation: encodeURIComponent(actualLocation),
    platform: platform.id.toLowerCase(),
  };

  return (
    <nav className="nav-header-guest">
      {
        header.items.map(item => (
          urls[item.key] ?
            <a
              className={item.className}
              href={
                item.callback ?
                parseParams(`${urls[item.key].link}?${item.callback}`, params) :
                urls[item.key].link
              }
              key={item.className}
              target={item.target}
            >
              {(item.name && !item.icon) && item.name }
              {(!item.name && item.icon) && <span className={item.icon} /> }
              {(!item.name && !item.icon) && urls[item.key].name }
            </a> :
            null
        ))
      }
    </nav>
  );
};

GuestMenuMercadopago.propTypes = {
  platform: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  header: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
  urls: PropTypes.objectOf(PropTypes.object).isRequired,
  actualLocation: PropTypes.string.isRequired,
};

GuestMenuMercadopago.defaultProps = {
  actualLocation: 'https://www.mercadopago.com',
};

module.exports = GuestMenuMercadopago;
