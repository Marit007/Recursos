const React = require('react');
const PropTypes = require('prop-types');
const GuestMenu = require('./guest-menu');
const LoggedMenu = require('./logged-menu');

const UserMenu = props =>
  (props.user ? <LoggedMenu {...props}/> : <GuestMenu {...props} />);

UserMenu.propTypes = {
  i18n: PropTypes.object,
  urls: PropTypes.object,
  user: PropTypes.object,
};

module.exports = UserMenu;
