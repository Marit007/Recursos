const React = require('react');
const Script = require('frontend-script');

const EventEmitter = () => (
  <Script>
    {`
      !function(n,e){n.mitt=e()}(this,function(){function n(n){return n=n||Object.create(null),{on:function(e,t){(n[e]||(n[e]=[])).push(t)},off:function(e,t){n[e]&&n[e].splice(n[e].indexOf(t)>>>0,1)},emit:function(e,t){(n[e]||[]).map(function(n){n(t)}),(n["*"]||[]).map(function(n){n(e,t)})}}}return n});
      window.freya = mitt();
    `}
  </Script>
);

module.exports = EventEmitter;
