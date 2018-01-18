/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');

/**
 * Class LoggedMenuMercadopago
 */
const LoggedMenuMercadopago = ({ browser, header, user, urls }) => {
  const isLessThanIe9 = browser.name === 'ie' && browser.version < 9;
  const isGreaterThanIe8 = browser.name === 'ie' && browser.version > 8;
  const isIe = browser.name === 'ie';
  const fullname = `${user.firstName} ${user.lastName}`;
  let avatar = 'https://http2.mlstatic.com/resources/frontend/statics/point-landings/c4d7a19d750a38727d7f57a2b6eb4c8a.png';

  if (user.raw.thumbnail && user.raw.thumbnail.picture_url) {
    avatar = user.raw.thumbnail.picture_url.replace(/-O.jpg$/, '-M.jpg');
  }

  return (
    <nav className="nav-header-logged">
      <input type="checkbox" id="nav-header-user-switch" />
      <div className="nav-header-user-layer">
        <label
          className="nav-header-user-trigger"
          htmlFor="nav-header-user-switch"
          id="nav-header-user-trigger"
          role="button"
        >
          <div className="nav-header-user-avatar">
            <img alt={fullname} width="100%" height="100%" src={avatar} />
          </div>

          { isLessThanIe9 ?
            <a href="https://www.mercadopago.com.ar/summary" rel="nofollow">
              <span className="nav-header-user-name">{fullname}</span>
            </a> :
            <span className="nav-header-user-name">{fullname}</span>
          }

          { (!isIe || isGreaterThanIe8) && <span className="nav-header-user-chevron" /> }
        </label>

        <nav className="nav-header-user-menu" role="navigation">
          {
            header.menu.map((item) => {
              if (item.isBreak) {
                return <hr key={item.key} />;
              }

              return (
                urls[item.key] ?
                  <a
                    href={urls[item.key].link}
                    key={item.key}
                    target={item.target}
                  >
                    {urls[item.key].name}
                  </a> :
                  null
              );
            })
          }
        </nav>
      </div>
    </nav>
  );
};

LoggedMenuMercadopago.propTypes = {
  browser: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.number,
  }).isRequired,
  urls: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    raw: PropTypes.object,
  }).isRequired,
  header: PropTypes.shape({
    menu: PropTypes.array,
  }).isRequired,
};

module.exports = LoggedMenuMercadopago;
