/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const Script = require('frontend-script');
const HeadSync = require('react-declarative-head');
const fs = require('fs');
const scriptContent = fs.readFileSync('node_modules/ui-navigation/scripts/header-user-menu.js', 'utf-8');

/**
 * croppedUsername
 */
const croppedUsername = (user) => {
  const nameMaxLength = 11;
  const rawName = user.firstName || user.nickname;
  return rawName.length > nameMaxLength ? rawName.slice(0, nameMaxLength - 3) + '...' : rawName;
};

/**
 * Avatar
 */
const Avatar = ({ user }) => {
  let avatar;
  if (user.raw.thumbnail && user.raw.thumbnail.picture_url) {
    avatar = user.raw.thumbnail.picture_url.replace(/-O.jpg$/, '-M.jpg');
  }
  return (
    <span className="nav-header-avatar-user" data-js="user-menu:nav-header-avatar-user">
      { avatar ?
          <img src={avatar} alt={user.nickname} className="nav-header-avatar-user-img" /> :
          <i className="nav-icon-user" /> }
    </span>
  );
};

/**
 * Class Username
 */
const Username = ({ user, urls, actualLocation, layoutType, device }) => {
  const isPlus = layoutType === 'plus' || layoutType === 'pluslite';
  const isClean = layoutType === 'clean' || layoutType === 'plusclean';
  const userNameContent = isPlus ?
    <span><Avatar user={user} /><span className="nav-header-username">{croppedUsername(user)}</span><span className="nav-header-username-chevron"></span></span> :
    <span>{ user.nickname } <i className="nav-icon-user" /></span>;

  return isClean ? null : (
    <div className="nav-header-user">
      <label htmlFor="nav-header-user-switch" tabIndex="4">
        {/* <!--[if lt IE 9]><a href="https://myaccount.mercadolibre.com.ar/summary/" rel="nofollow"><![endif]--> */}
        { userNameContent }
        {/* <!--[if lt IE 9]></a><![endif]--> */}
      </label>
      <input type="checkbox" id="nav-header-user-switch"/>
      <nav className="nav-header-user-layer">
        <a href={urls.myAccount.link} className="option-my-account" rel="nofollow">
          {urls.myAccount.name}
        </a>
        <a href={`${urls.logout.link}?&go=${encodeURIComponent(actualLocation)}`} className="option-logout" rel="nofollow">
          {urls.logout.name}
        </a>
      </nav>
      { !isPlus && <Script>{scriptContent}</Script> }
      { isPlus && !device.mobile && <Script src="https://http2.mlstatic.com/resources/frontend/statics/ml-widgets/user-menu/v1.0.3/user-menu.js">{`
          (function(win, freya) {
            if (win.UserMenuWidget && freya) {
              new UserMenuWidget({
                mainDomain: '${urls.mainDomain.link}',
                bus: freya,
              });
            }
          })(window, window.freya);
      `}</Script> }
    </div>
  );
};

Username.propTypes = {
  user: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired
};

module.exports = Username;
