const React = require('react');
const PropTypes = require('prop-types');

const LoggedMenu = props => {
  const showLogout = props.type.indexOf('plus') === -1;
  return (
    <p className="nav-footer-user logged">
      {props.i18n.signinAs} <strong> {props.user.nickname} </strong>
      {
        showLogout ?
        (<a href={props.urls.logout.link} rel="nofollow">
          {props.urls.logout.name}
        </a>) : null
      }
    </p>
  );
};

LoggedMenu.propTypes = {
  i18n: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

module.exports = LoggedMenu;
