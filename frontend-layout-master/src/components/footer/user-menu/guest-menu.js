const React = require('react');
const PropTypes = require('prop-types');

const GuestMenu = props =>
  <p className="nav-footer-user">
    <a className="nav-footer-login" href={props.urls.login.link} rel="nofollow">
      {props.urls.login.name}
    </a>
    <a className="nav-footer-registration" href={props.urls.registration.link} rel="nofollow">
      {props.urls.registration.name}
    </a>
  </p>;

GuestMenu.propTypes = {
  urls: PropTypes.object.isRequired,
};

module.exports = GuestMenu;
