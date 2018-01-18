/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const Bookmarks = require('../bookmarks');
const Notifications = require('../notifications');
const FloatNotifications = require('../float-notifications');
const Username = require('../username');
const WidgetsManager = require('../../widgets');

const LoggedMenu = (props) => {
  const { user, urls, platform, actualLocation, navItems, features, type, device, i18n, fixed } = props;
  const isFull = type === 'full';
  const isPlus = type === 'plus';
  const isPlusLite = type === 'pluslite';
  const isPlusClean = type === 'plusclean';
  const widgets = [
    ...(isPlus || isPlusLite) && !device.mobile ? ['user-menu'] : [],
    ...isPlus && !device.mobile ? ['categories'] : [],
    ...(isFull || isPlus) && !device.mobile ? ['notifications', 'bookmarks'] : [],
  ];

  return (
    <nav id="nav-header-menu">
      <Username
        user={user}
        urls={urls}
        device={device}
        platform={platform}
        actualLocation={actualLocation}
        navItems={navItems}
        layoutType={type}
      />
      { (isFull || isPlus) ? <Notifications {...props} /> : null }
      { (isFull || isPlus) ? <Bookmarks device={device} urls={urls} i18n={i18n} fixed={fixed} /> : null }
      { (isFull || isPlus) && features && features.loyalty ? <FloatNotifications domain={platform.domain} siteId={platform.siteId} isMobile={device.mobile} /> : null }

      <a href={urls.helpMain.link} className="option-help" tabIndex="7">
        { (isPlus || isPlusLite || isPlusClean) ? urls.helpMain.name : <i className="nav-icon-help"><span>{urls.helpMain.name}</span></i> }
      </a>

      <WidgetsManager widgets={widgets} />

      { isFull || isPlus ? <a href={urls.syi.link} className="option-sell" rel="nofollow" tabIndex="8">{urls.syi.name}</a> : null }
    </nav>
  );
};

LoggedMenu.propTypes = {
  i18n: PropTypes.object.isRequired,
  type: PropTypes.string,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object,
  navItems: PropTypes.array,
  fixed: PropTypes.bool,
  features: PropTypes.object,
};

LoggedMenu.defaultProps = {
  navItems: [],
  fixed: false,
  features: {},
};

module.exports = LoggedMenu;
