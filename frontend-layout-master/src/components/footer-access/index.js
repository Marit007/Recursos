const React = require('react');
const PropTypes = require('prop-types');
const GroupedData = require('./grouped-data');
const UserMenu = require('./user-menu');
const Script = require('frontend-script');
const fs = require('fs');

const scriptContent = fs.readFileSync('node_modules/ui-navigation/scripts/footer-access.js', 'utf-8');

// TODO: Chequear si todos estos links son condicionales
// de acuerdo a las urls provistas en el config

const FooterAccess = (props) => {
  const { configSchema, urls, platform, actualLocation } = props;

  return (
    <div className="nav-footer-access">
      <label htmlFor="nav-footer-access-switch">
        {configSchema.footerAccess.title} <i className="nav-icon-chevron-up"></i>
      </label>

      <div className="nav-footer-access-content">
        <div className="nav-bounds">
          { configSchema.footerAccess.items.map(data => (
            data.id === 'myAccount' ?
              <UserMenu
                user={props.user}
                title={data.title}
                i18n={configSchema.i18n}
                urls={urls} key={data.id}
                platform={platform}
                actualLocation={actualLocation}
              /> :
              <GroupedData
                title={data.title}
                labels={data.items}
                urls={urls} key={data.id}/>
          ))
          }
        </div>
      </div>

      <Script>{scriptContent}</Script>
    </div>
  );
};

FooterAccess.propTypes = {
  configSchema: PropTypes.object.isRequired,
  urls: PropTypes.object.isRequired,
  platform: PropTypes.object.isRequired,
  actualLocation: PropTypes.string.isRequired,
};

module.exports = FooterAccess;
