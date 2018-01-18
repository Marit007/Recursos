const React = require('react');
const PropTypes = require('prop-types');
const Script = require('frontend-script');

const renderMeli = ({ siteId, domain, isMobile }) => (
  isMobile ? `if (!window.meli) {
    function Meli() {
      // Singleton pattern
      if (!(this instanceof Meli) && Meli.instance === undefined) {
        return new Meli();
      }
      if (Meli.instance) {
        return Meli.instance;
      }
      Meli.instance = this;

      this.siteId = '${siteId}';
      this.domain = '${domain}';

      return this;
    }

    var noop = function(){};
    var mitt = window.freya;
    Meli.prototype.on = freya ? freya.on : noop;
    Meli.prototype.off = freya ? freya.off : noop;
    Meli.prototype.emit = freya ? freya.emit : noop;

    window.Meli = Meli;
    window.meli = new Meli();
  }` : ''
);

const FloatNotifications = ({ siteId, domain, isMobile }) => (
  <Script>{`
    (function(){
      ${renderMeli({ siteId, domain, isMobile })}

      // create element
      var elem = document.createElement("link");
      // make it a stylesheet link
      elem.setAttribute("id", "float_notifications_css");
      elem.setAttribute("rel", "stylesheet");
      elem.setAttribute("type", "text/css");
      elem.setAttribute("href", "https://www.${domain}/notifications/float/css/float.min.css");
      // append to head
      document.querySelector("head").appendChild(elem);
    })();
    window.floatAsyncInit = function() {
      meli.floatNotifications.init({
        'debug': false,
        'isLoggedIn': true,
        'domain': '${domain}'
      });
    };
    (function initFloatNotifications() {
      var iframe = document.createElement('iframe');
      (iframe.frameElement || iframe).style.cssText = 'width: 0; height: 0; border: 0; position: absolute';
      iframe.src = "javascript:false";
      var where = document.getElementsByTagName('script')[0];
      where.parentNode.insertBefore(iframe, where);
      var doc = iframe.contentWindow.document;
      doc.open().write([
        '<body onload="',
          'window.inDapIF = true;',
          'var initFloatNotifications = function(){',
            'var js = document.createElement(\\'script\\');',
            'js.src = \\'https://www.${domain}/notifications/float/js/float.min.js\\';',
            'document.body.appendChild(js);',
          '};',
          'setTimeout(initFloatNotifications,0);',
          '">'
        ].join('')
      );
      doc.close();
    })();`}
  </Script>
);

FloatNotifications.propTypes = {
  domain: PropTypes.string.isRequired,
  siteId: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

module.exports = FloatNotifications;
