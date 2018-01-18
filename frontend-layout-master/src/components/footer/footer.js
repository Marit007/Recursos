const React = require('react');
const PropTypes = require('prop-types');
const UserMenu = require('./user-menu');
const DownloadAppButton = require('./download-app-button');
const DownloadAppBanner = require('./download-app-banner');

const Footer = (props) => {
  const { platform, urls, configSchema, user, actualLocation, type, device, labels } = props;
  const date = new Date();
  const since = labels.copyrightSince;
  const companyName = labels.companyName;
  const encodedActualLocation = encodeURIComponent(actualLocation);
  const isMobile = device.mobile;

  return (
    <footer role="contentinfo" className="nav-footer">

      { isMobile && <DownloadAppBanner urls={urls} device={device} appsStore={labels.mobileAppsStore} /> }

      <div className="nav-bounds">
        { isMobile &&
          <UserMenu
            i18n={configSchema.i18n}
            user={user}
            urls={{
              login: {
                name: urls.login.name,
                link: `${urls.login.link}?platform_id=${platform.id}&go=${encodedActualLocation}&loginType=explicit`,
              },
              logout: {
                name: urls.logout.name,
                link: `${urls.logout.link}?go=${encodedActualLocation}`,
              },
              registration: {
                name: urls.registration.name,
                link: `${urls.registration.link}?confirmation_url=${encodedActualLocation}`,
              },
            }}
            type={type}
          /> }

        <div className="nav-footer-info-wrapper">
          <div className="nav-footer-primaryinfo">
            <small style={ isMobile ? { width: '100%' } : null } className="nav-footer-copyright">
              {isMobile ? '' : 'Copyright'} ©&nbsp;
              {since.length ? `${since}-` : ''}
              {date.getFullYear()} {companyName}
            </small>
            <nav className="nav-footer-navigation">
              {
                configSchema.footer.items.map((item, i) => (
                  urls[item] ? <a href={urls[item].link} key={i}>{urls[item].name}</a> : null
                ))
              }
            </nav>
          </div>
          { labels.extraCompanyName && <p className="nav-footer-secondaryinfo">{labels.extraCompanyName}</p> }
        </div>
        { urls.downloadAppLanding && urls.downloadAppLanding.link && <DownloadAppButton label={urls.downloadAppLanding.name} url={urls.downloadAppLanding.link}/> }
      </div>
    </footer>
  );
};

Footer.propTypes = {
  configSchema: PropTypes.object.isRequired,
  device: PropTypes.object,
  labels: PropTypes.object,
  platform: PropTypes.object.isRequired,
  type: PropTypes.string,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object,
  actualLocation: PropTypes.string.isRequired,
};

module.exports = Footer;
