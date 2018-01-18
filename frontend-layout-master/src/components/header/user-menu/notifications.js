const React = require('react');
const Script = require('frontend-script');
const Head = require('react-declarative-head');

const Notifications = props => (
  <a href={props.urls.notificationsCenter.link}
     id="notiLink"
     className="option-notifications notifications-widget"
     rel="nofollow"
     tabIndex="4">
    <i className="nav-icon-notifications"><span>{props.i18n.notifications}</span></i>
    {props.device.mobile ? null :
      <Script src={`https://www.${props.platform.domain}/notifications/js/notif.standalone.min.js`}>
        {`
          meli.init({siteId: '${props.platform.siteId}', domain: '${props.platform.domain}'});meli.notifications.init({'debug': false,'isLoggedIn': true,'text': {'header': '${props.i18n.notifications}','empty': '${props.i18n.noNotifications}'},'domain': '${props.platform.domain}','trigger': '#notiLink','reloadUri':'/reload-standalone', 'name': 'notif.standalone.min.js'});
        `}
      </Script>
    }
  </a>
);


module.exports = Notifications;
