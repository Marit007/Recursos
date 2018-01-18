const React = require('react');
const PropTypes = require('prop-types');
const HamburguerMobile = require('./hamburguer-menu-mobile');
const UserMenu = require('./user-menu');
const SearchBox = require('./searchbox');
const Snackbar = require('../snackbar');
const { Cart } = require('nav-cart');
const NavMenu = require('./nav-menu');
const Script = require('frontend-script');
const Exhibitor = require('./exhibitor.js');

const HeaderMercadolibre = (props) => {
  const { fixed, labels, actualLocation, platform, device, user, urls, configSchema, cartInfo, exhibitorInfo, category, features, searchFocus } = props;
  const type = props.type ? props.type.toLowerCase() : 'full';
  const isPlusType = type === 'plus';
  const isFullType = type === 'full' || isPlusType;
  const isInternalType = type === 'internal';
  const showCart = cartInfo && cartInfo.badge_icon && isFullType;
  let classBounds = 'nav-bounds';
  let classNames = `nav-header nav-header-${type}`;
  if (fixed) {
    classNames += ' nav-header-sticky';
  }
  if (showCart) {
    classBounds += ' nav-bounds-with-cart';
  }

  return (
    <header role="banner" className={classNames}>
      { platform.id === 'ML' ? <Snackbar /> : null }
      <div className={classBounds}>
        { isInternalType ? <h1 className="nav-title">{props.internal.title}</h1> : null }
        { isInternalType ?
          <a href={props.internal.btnHref} rel="nofollow" className="nav-header-btn">{props.internal.btnText}</a> :
          null }
        { isInternalType ? null :
        <a className="nav-logo" href={urls.baseDomain.link} tabIndex="1">{labels.headTitle}</a> }
        { isInternalType ? null : <input type="checkbox" id="nav-header-menu-switch"/> }
        { isInternalType ? null :
        <div className="nav-header-menu-wrapper">
          <HamburguerMobile />
          <UserMenu
            actualLocation={actualLocation}
            device={device}
            i18n={configSchema.i18n}
            platform={platform}
            features={features}
            urls={urls}
            user={user}
            type={type}
            fixed={fixed}
          />
          { showCart ? <Cart data={cartInfo.badge_icon} url={props.urls.cart.link} title={props.urls.cart.name} isMobile={device.mobile} /> : null }
        </div> }
        { isFullType ? <SearchBox platform={platform} user={user} urls={urls} device={device} category={category} layoutType={type} searchFocus={searchFocus} /> : null }
        { isPlusType && configSchema.headerMenu && !device.mobile && <NavMenu
            domain={urls.baseDomain.link}
            links={configSchema.headerMenu}
          />
        }

        {isPlusType && <Exhibitor info={exhibitorInfo} />}
      </div>
    </header>
  );
};

HeaderMercadolibre.propTypes = {
  actualLocation: PropTypes.string,
  configSchema: PropTypes.object.isRequired,
  device: PropTypes.object,
  labels: PropTypes.object,
  platform: PropTypes.object.isRequired,
  type: PropTypes.string,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object,
  fixed: PropTypes.bool,
  searchFocus: PropTypes.bool,
  cartInfo: PropTypes.shape({
    badge_icon: PropTypes.shape({
      quantity: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
  }),
};

HeaderMercadolibre.defaultProps = {
  fixed: false,
  searchFocus: false,
};

module.exports = HeaderMercadolibre;
