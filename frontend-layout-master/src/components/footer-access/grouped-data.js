const React = require('react');
const PropTypes = require('prop-types');

const GroupedData = props =>
  <div className="nav-footer-access-col">
    <h5 className="nav-footer-access-title">{props.title}</h5>
    <ul>
      { props.labels.map((item) => {
        const link = props.urls[item] ? props.urls[item].link : '#';
        const label = props.urls[item] ? props.urls[item].name : '';
        return (<li key={item}><a href={link}>{label}</a></li>);
      })
      }
    </ul>
  </div>;

GroupedData.propTypes = {
  labels: PropTypes.array.isRequired,
  urls: PropTypes.object.isRequired,
};

module.exports = GroupedData;
