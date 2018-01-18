const React = require('react');
const PropTypes = require('prop-types');
const GuestMenu = require('./guest-menu');
const LoggedMenu = require('./logged-menu');

const UserMenu = props =>
  (props.user ?
    <LoggedMenu {...props} /> :
    <GuestMenu {...props} />);

UserMenu.propTypes = {
  actualLocation: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  type: PropTypes.string,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object,
  navItems: PropTypes.array,
  fixed: PropTypes.bool,
};

UserMenu.defaultProps = {
  navItems: [],
  fixed: false,
};

module.exports = UserMenu;
