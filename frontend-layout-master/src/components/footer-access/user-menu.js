const React = require('react');
const PropTypes = require('prop-types');

const UserMenu = (props) => {
  const { user, title, urls, i18n, platform, actualLocation } = props;
  const items = user ? ['myAccount', 'favorites'] : ['login'];
  items.push('syi');

  return (
    <div className="nav-footer-access-col">
      <h5 className="nav-footer-access-title">{title}</h5>
      <ul>
        {
          items.map((label) => {
            switch (label) {
              case 'myAccount':
                return <li key="myml"><a href={urls.myAccount.link}>{i18n.myAccountDashboard}</a></li>;
              case 'favorites':
                return <li key="favorites"><a href={`${urls.myAccount.link}/bookmarks/list`}>{i18n.favorites}</a></li>;
              case 'login':
                return (
                  <li key="login">
                    <a href={`${urls.login.link}?platform_id=${platform.id}&go=${encodeURIComponent(actualLocation)}&loginType=explicit`}>
                      {urls.login.name}
                    </a>
                  </li>
                );
              default:
                return <li key={label}><a href={urls[label].link}>{urls[label].name}</a></li>;
            }
          })
        }
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  title: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object,
  platform: PropTypes.object.isRequired,
  actualLocation: PropTypes.string.isRequired,
};

module.exports = UserMenu;
