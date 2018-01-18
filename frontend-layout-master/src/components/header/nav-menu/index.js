const React = require('react');
const PropTypes = require('prop-types');
const Script = require('nordic/script');

const NavMenu = props => (
  <div className="nav-menu">
    { !props.links ? null :
      <div>
        <ul className="nav-menu-list">
          {
            props.links.map((item, key) => {
              const itemClassName = item.className || 'nav-menu-item';

              return (
                <li key={ `nmi-${ key }` } className={ itemClassName }>
                  <a href={ item.link } className={ `${ itemClassName }-link` } rel="nofollow" data-js={ `${ itemClassName }-trigger` }>{ item.text }</a>
                </li>
              );
            })
          }
        </ul>
        <Script src="https://http2.mlstatic.com/resources/frontend/statics/ml-widgets/categories/v1.0.3/categories.js">
          {`
            (function(win, freya) {
              if (win.CategoriesWidget && freya) {
                new CategoriesWidget({
                  bus: freya,
                  endpoint: '${props.domain}/menu/departments',
                });
              }
            })(window, window.freya);
          `}
        </Script>
      </div>
    }
  </div>
);

NavMenu.propTypes = {
  domain: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};

module.exports = NavMenu;
