const React = require('react');
const Script = require('frontend-script');

const Bookmarks = props => (
  <a href={`${props.urls.myAccount.link}/bookmarks/list`} className="option-bookmarks bookmarks-widget" rel="nofollow" tabIndex="5">
    <i className="nav-icon-bookmarks"><span>{props.i18n.favorites}</span></i>
    {/* Bug fix for notifications and bookmarks overlay */}
    {props.device.mobile ? null :
    <Script src="https://http2.mlstatic.com/ui/navigation/modeless-box/2.0.8/modeless-box.js">
      {`
        (function(win, freya) {
          var modelessCss = document.createElement('link');
          modelessCss.type = 'text/css';
          modelessCss.rel = 'stylesheet';
          modelessCss.href = 'https://http2.mlstatic.com/ui/navigation/modeless-box/2.0.8/modeless-box.css';
          document.head.appendChild(modelessCss);

          window.layoutBookmarks = new Bookmarks({
            trigger: document.querySelector('.bookmarks-widget'),
            hostname: '${props.urls.mainDomain.link}',
            fixed: ${props.fixed},
            bus: freya,
          });
        })(window, window.freya);
      `}
    </Script>
    }
  </a>
);

module.exports = Bookmarks;
