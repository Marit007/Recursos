const React = require('react');
const PropTypes = require('prop-types');
const Body = require('./body');

class Layout extends React.Component {
  render() {
    return (
      <Body {...this.props} />
    );
  }
}

Layout.propTypes = {
  configSchema: PropTypes.object,
  device: PropTypes.object,
  labels: PropTypes.object,
  platform: PropTypes.object,
  scripts: PropTypes.array,
  styles: PropTypes.array,
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
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
  }),
  metrics: PropTypes.object,
};

module.exports = Layout;
