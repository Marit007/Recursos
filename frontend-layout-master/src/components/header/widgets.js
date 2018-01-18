const React = require('react');
const Script = require('frontend-script');
const PropTypes = require('prop-types');

/**
 * WidgetManager component orchestrates interactions between widgets.
 * Assumes `freya` event bus is available and is used by all widgets.
 * @prop {Array<String>} widgets
 */
const WidgetManager = ({ widgets }) => {
  return widgets && widgets.length ? (
    <Script>{`
      (function WidgetManager() {
        if (freya) {
          var notificationsLink = document.getElementById('notiLink');

          function handleWidgetClose(event, widget) {
            // Close notifications widget
            if (widget !== 'notifications') {
              var layerNotif = document.querySelector('.layerNotif');
              if (layerNotif && notificationsLink && layerNotif.getAttribute('aria-hidden') === 'false') {
                notificationsLink.click();
              }
            }

            // Close user menu widget
            if (widget !== 'user-menu') {
              var userMenu = document.getElementById('nav-header-user-switch');
              if (userMenu && userMenu.checked) {
                userMenu.checked = false;
              }
              freya.emit('user-menu:hide');
            }

            // Close bookmarks
            if (widget !== 'bookmarks') {
              freya.emit('bookmarks:hide');
            }

            // Close categories
            if (widget !== 'categories') {
              freya.emit('categories:hide');
            }
          };

          function bindNotificationsHandler() {
            notificationsLink.addEventListener('click', function(ev) {
              handleWidgetClose(ev, 'notifications');
            });
          };

          ${widgets.map((widget) => {
            if (widget === 'notifications') {
              return 'bindNotificationsHandler();';
            }

            return `freya.on('${widget}:show:before', function(ev) {
              handleWidgetClose(ev, '${widget}');
            });`;
          }).join('\n')}
        }
      })();
    `}</Script>
  ) : null;
};

WidgetManager.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

module.exports = WidgetManager;
