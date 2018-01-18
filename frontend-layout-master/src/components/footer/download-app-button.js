const React = require('react');
const PropTypes = require('prop-types');

const DownloadAppButton = props =>
  <div className="nav-footer-downloadapp-wrapper">
    {/* <!-- "Download app" button --> */}
    <a className="nav-footer-downloadapp" href={props.url}>
      <i className="nav-icon nav-icon-downloadapp"></i>
      <span dangerouslySetInnerHTML={ { __html: props.label } } />
    </a>
  </div>;

DownloadAppButton.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

module.exports = DownloadAppButton;
