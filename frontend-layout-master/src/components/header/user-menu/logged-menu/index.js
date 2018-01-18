/**
 * Module dependencies
 */
const React = require('react');
const LoggedMenuBase = require('./logged-menu');
const LoggedMenuMercadopago = require('./logged-menu.mp');

/**
 * Class LoggedMenu
 */
const LoggedMenu = props => (
  props.platform.id === 'MP' ? <LoggedMenuMercadopago {...props} /> : <LoggedMenuBase {...props} />
);

module.exports = LoggedMenu;
