const React = require('react');
const Head = require('react-declarative-head');

const getFontUrl = type => `https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-${type}.woff2`;

const Fonts = () => (
  <Head>
    <link
      rel="preload"
      href={getFontUrl('light')}
      as="font" type="font/woff2" crossOrigin
    />
    <link
      rel="preload"
      href={getFontUrl('regular')}
      as="font" type="font/woff2" crossOrigin
    />
    <link
      rel="preload"
      href={getFontUrl('semibold')}
      as="font" type="font/woff2" crossOrigin
    />
    <style>{`@font-face{font-family:'Proxima Nova';font-weight:300;font-style:normal;src:url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff2) format("woff2"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.woff) format("woff"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-light.ttf) format("truetype")}@font-face{font-family:'Proxima Nova';font-weight:400;font-style:normal;src:url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff2) format("woff2"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.woff) format("woff"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-regular.ttf) format("truetype")}@font-face{font-family:'Proxima Nova';font-weight:600;font-style:normal;src:url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff2) format("woff2"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.woff) format("woff"),url(https://http2.mlstatic.com/ui/webfonts/v3.0.0/proxima-nova/proximanova-semibold.ttf) format("truetype")}`}</style>
  </Head>
);

module.exports = Fonts;
