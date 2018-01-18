/**
 * Module dependencies
 */
const React = require('react');
const FooterBase = require('./footer');
const FooterMercadopago = require('./footer.mp');

const Footer = props => (
  props.platform.id === 'MP' ? <FooterMercadopago {...props} /> : <FooterBase {...props} />
);

module.exports = Footer;
