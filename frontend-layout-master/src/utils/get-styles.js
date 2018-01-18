const fs = require('fs');
const path = require('path');
const { mlstatic } = require('../../config/head-config');
const config = require('frontend-config');
const { platforms, sites } = require('frontend-config/config/platforms');
const uiNavigationPkg = require('ui-navigation/package.json');

const uiNavigationVersion = uiNavigationPkg.version || '2.0.1';
const cdnBase = `${mlstatic}/ui/navigation/${uiNavigationVersion}`;
const cdnHtml5shiv = `<script src="${mlstatic}/static/org-img/ch/vendor/html5shiv/html5shiv-3.7.0.js"></script>`;

// Get file content
const readFile = (filePath, encoding = 'utf-8') => (
  fs.existsSync(filePath) ? fs.readFileSync(filePath, encoding) : null
);

// Platform styles helpers
const normalizePlatformName = platformName => platformName.replace(/\W/g, '').toLowerCase();
const getPlatformName = platform => config.get('platformName', platform, sites[platform][0]);
const getPlatformStyles = (platform, layoutType) => {
  const filePath = `${path.resolve()}/node_modules/ui-navigation/dist/${platform}`;
  const navigationSheet = ['plus', 'pluslite', 'plusclean'].includes(layoutType) ? 'navigation-plus' : 'navigation';
  return {
    id: platform,
    cdn: `${cdnBase}/${platform}/${navigationSheet}.css`,
    cdnLarge: `${cdnBase}/${platform}/navigation__large.css`,
    internalCdn: `${cdnBase}/${platform}/navigation-internal__small.css`,
    responsiveCss: readFile(`${filePath}/${navigationSheet}.css`),
    smallCss: readFile(`${filePath}/navigation__small.css`),
    largeCss: readFile(`${filePath}/navigation__large.css`),
    internalCss: readFile(`${filePath}/navigation-internal__small.css`),
  };
};

const platformNames = platforms.map(platform => normalizePlatformName(getPlatformName(platform)));

const platformStyles = (platformId, layoutType) => {
  return platforms.reduce((styles, platformKey, index) => {
    styles[platformKey] = getPlatformStyles(platformNames[index], layoutType);
    return styles;
  }, {})[platformId];
};

module.exports = {
  platformStyles,
  cdnBase,
  cdnHtml5shiv,
};
