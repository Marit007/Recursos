/**
 * Module dependencies
 */
const React = require('react');
const HeaderMercadopago = require('./header.mp');
const HeaderMercadolibre = require('./header.ml');

const Header = props => (
  props.platform.id === 'MP' ? <HeaderMercadopago {...props} /> : <HeaderMercadolibre {...props} />
);

module.exports = Header;
