const React = require('react');
const PropTypes = require('prop-types');

const GuestMenu = (props) => {
  const { user, urls, platform, actualLocation, navItems, features, type, device, i18n, fixed } = props;
  const isFull = type === 'full';
  const isLite = type === 'lite';
  const isClean = type === 'clean';
  const isPlus = type === 'plus';
  const isPlusLite = type === 'pluslite';
  const isPlusClean = type === 'plusclean';
  const platformId = platform.id.toLowerCase();

  return (
    <nav id="nav-header-menu">
      { isClean || isPlusClean ? null :
        <a href={`${urls.registration.link}?confirmation_url=${encodeURIComponent(actualLocation)}`}
           className="option-register" rel="nofollow">
          {urls.registration.name}
        </a>
      }
      { isClean || isPlusClean ? null :
        <a href={`${urls.login.link}?platform_id=${platformId}&go=${encodeURIComponent(actualLocation)}&loginType=explicit`} className="option-login" rel="nofollow">
          {urls.login.name}
        </a>
      }

      <a href={urls.helpMain.link} className="option-help" rel="nofollow">
        { (isFull || isLite || isClean) && <i className="nav-icon-help"><span>{urls.helpMain.name}</span></i> }
        { (isPlus || isPlusLite || isPlusClean ) && urls.helpMain.name }
      </a>

      { isFull || isPlus ?
        <a href={urls.syi.link} className="option-sell" rel="nofollow">{urls.syi.name} </a> :
        null }
    </nav>
  );
};

GuestMenu.propTypes = {
  type: PropTypes.string,
  urls: PropTypes.object.isRequired,
};

module.exports = GuestMenu;
