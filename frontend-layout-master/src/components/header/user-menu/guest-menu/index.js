/**
 * Module dependencies
 */
const React = require('react');
const GuestMenuBase = require('./guest-menu');
const GuestMenuMercadopago = require('./guest-menu.mp');

/**
 * Class Username
 */
const Username = props => (
  props.platform.id === 'MP' ? <GuestMenuMercadopago {...props} /> : <GuestMenuBase {...props} />
);

module.exports = Username;
