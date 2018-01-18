/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const UserMenu = require('./user-menu');

/**
 * Class HeaderMercadopago
 */
const HeaderMercadopago = ({ fixed, labels, actualLocation, platform, browser, user, urls, configSchema, type }) => {
  const version = type.toLowerCase();
  const isCleanType = version === 'clean';
  const navClassName = version !== 'hidden' ? `nav-header-${version}` : '';
  let classNames = `nav-header ${navClassName}`;
  if (fixed) {
    classNames += ' nav-header-sticky';
  }

  return (
    <header role="banner" className={classNames}>
      <div className="nav-header-menu-wrapper">
        <div className="nav-header-menu-container">
          <a className="nav-logo" href={urls.baseDomain.link}>{labels.headTitle}</a>
          { !isCleanType ?
            <UserMenu
              i18n={configSchema.i18n}
              actualLocation={actualLocation}
              browser={browser}
              header={configSchema.header}
              platform={platform}
              urls={urls}
              user={user}
            /> :
            null
          }
        </div>
      </div>
    </header>
  );
};

HeaderMercadopago.propTypes = {
  configSchema: PropTypes.shape({
    header: PropTypes.object,
    i18n: PropTypes.object,
  }).isRequired,
  platform: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  urls: PropTypes.objectOf(PropTypes.object).isRequired,
  actualLocation: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    headTitle: PropTypes.string,
  }).isRequired,
  browser: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    raw: PropTypes.object,
  }),
  type: PropTypes.string,
  fixed: PropTypes.bool,
};

HeaderMercadopago.defaultProps = {
  type: 'full',
  fixed: false,
  user: null,
};

module.exports = HeaderMercadopago;
