const React = require('react');
const PropTypes = require('prop-types');
const Script = require('frontend-script');
const { APPLICATION } = require('frontend-env');

const DownloadAppBanner = ({urls, device, appsStore}) => {
  const { downloadAppLanding } = urls;
  const label = downloadAppLanding && downloadAppLanding.name;
  const link = appsStore[device.osName] || downloadAppLanding && downloadAppLanding.link;

  if (label && link) {
    return (
      <div className="nav-footer-downloadapp-banner">
        <a className="nav-footer-downloadapp" target="_blank" id="footer-applink" href={link}
          data-os={device.osName} data-app={APPLICATION} >
          <i className="nav-icon nav-icon-downloadapp"></i>
          <span dangerouslySetInnerHTML={{__html: label}}></span>
        </a>
        <Script>{`
          (function appDownload() {
            function trackEventAppDownloadAnalytics(os, app) {
              if (typeof meli_ga !== 'undefined') {
                var osTrack = os.toUpperCase();
                if (app) {
                  app = app.toUpperCase();
                  meli_ga('send', 'event', 'MOBILE-APP-' + osTrack, 'DOWNLOAD-FOOTER', app);
                } else {
                  meli_ga('send', 'event', 'MOBILE-APP-' + osTrack, 'DOWNLOAD-FOOTER');
                }
              }
            }
            function handleAppDownload(event) {
              var os = this.getAttribute('data-os'),
                app = this.getAttribute('data-app');

              // track event in analytics
              trackEventAppDownloadAnalytics(os, app);
            }
            var appDownloadLink = document.getElementById('footer-applink');
            appDownloadLink.addEventListener('click', handleAppDownload);
          }());
        `}</Script>
      </div>
    );
  } else {
    return null
  }
};

DownloadAppBanner.propTypes = {
  urls: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
  appsStore: PropTypes.object.isRequired
};

module.exports = DownloadAppBanner;
