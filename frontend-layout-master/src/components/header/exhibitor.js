const React = require('react');
const PropTypes = require('prop-types');

const Exhibitor = (props) => {
  const { permalink, picture, title } = props.info;
  if (permalink) {
    return (
      <a href={permalink} className="exhibitor__picture">
        <img src={picture} title={title} />
      </a>
    );
  } else {
    return null
  }
};

Exhibitor.propTypes = {
  info: PropTypes.object.isRequired
};

module.exports = Exhibitor;
