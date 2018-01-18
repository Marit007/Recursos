/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');
const Header = require('./components/header');
const FooterAccess = require('./components/footer-access');
const Footer = require('./components/footer');
const EventEmitter = require('./event-emitter');
const Script = require('frontend-script');
const fs = require('fs');
const messagesInit = fs.readFileSync('node_modules/ui-navigation/scripts/messages_init.js', 'utf-8');
const Fonts = require('./fonts');
const { Metrics } = require('frontend-metrics');

class Body extends React.Component {
  render() {
    const { type, platform, configSchema, metrics } = this.props;
    const hideFooterAccess = configSchema.footerAccess.hidden;
    const useProximaNova = configSchema.styles && configSchema.styles.useProximaNova;
    return (
      <body data-site={platform.id} data-country={platform.countryId}>
        {/* <!-- Global Event Emitter using `meli` --> */}
        <EventEmitter />
        <Script>{messagesInit}</Script>
        { metrics && <Metrics {...metrics} />}
        { useProximaNova ? <Fonts /> : null }
        { type !== 'hidden' ? <Header {...this.props} /> : null }
        { type === 'hidden' ? '{{children}}' : <main role="main" id="root-app">{'{{children}}'}</main> }
        { type === 'internal' || type === 'hidden' || hideFooterAccess ? null :
        <input type="checkbox" id="nav-footer-access-switch" defaultChecked /> }
        { (type === 'full' || type === 'plus') && !hideFooterAccess ? <FooterAccess {...this.props} /> : null }
        { type === 'internal' || type === 'hidden' ? null : <Footer {...this.props} /> }
        {'{{melidata}}\n{{scripts}}'}
      </body>
    );
  }
}

Body.propTypes = {
  actualLocation: PropTypes.string,
  configSchema: PropTypes.object,
  device: PropTypes.object,
  labels: PropTypes.object,
  platform: PropTypes.object,
  scripts: PropTypes.array,
  type: PropTypes.string,
  urls: PropTypes.object,
  user: PropTypes.object,
  searchFocus: PropTypes.bool,
  cartInfo: PropTypes.shape({
    badge_icon: PropTypes.shape({
      quantity: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  metrics: PropTypes.object,
};

module.exports = Body;
