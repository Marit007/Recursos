/**
 * Module dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');

/**
 * Class FooterMercadopago
 */
const FooterMercadopago = ({ labels, urls, configSchema }) => {
  const date = new Date();

  return (
    <footer role="contentinfo" className="nav-footer">
      <div className="nav-footer-primaryinfo">
        <div className="nav-footer-info">
          <nav className="nav-footer-navigation">
            {
              configSchema.footer.navigation.map(item => (
                urls[item] ?
                  <a
                    href={urls[item].link}
                    key={item}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {urls[item].name}
                  </a> :
                  null
              ))
            }
          </nav>

          <div className="nav-footer-social">
            {
              configSchema.footer.social.map(item => (
                urls[item] ?
                  <a
                    href={urls[item].link}
                    key={item}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={`nav-icon-${item}`} />
                  </a> :
                  null
              ))
            }
          </div>
        </div>

        <small className="nav-footer-copyright">{`Copyright © ${date.getFullYear()} ${labels.companyName}`}</small>
      </div>
    </footer>
  );
};

FooterMercadopago.propTypes = {
  labels: PropTypes.shape({
    companyName: PropTypes.string,
  }).isRequired,
  urls: PropTypes.objectOf(PropTypes.object).isRequired,
  configSchema: PropTypes.shape({
    footer: PropTypes.object,
  }).isRequired,
};

module.exports = FooterMercadopago;
