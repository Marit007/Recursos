/**
 * Generate `content` value for meta refresh
 * @param {String} go URL to redirect to
 * @param {String} domain Base domain for platform
 */
const getMetaRefreshContent = (go, domain) =>
  `0;URL=${domain}/gz/webdevice/config?go=${encodeURIComponent(go)}&noscript=true`;

/**
 * Return meta in noscript tag if platform is ML
 * @param {Boolean} isLowEnd Whether if the device is low end
 * @param {String} platformId ID of platform
 * @param {String} baseDomain Base domain for platform
 * @param {String} actualLocation Current request location
 */
const noScriptRedirect = ({ isLowEnd, platformId, baseDomain, actualLocation }) => {
  if (platformId === 'ML' && !isLowEnd && baseDomain) {
    const go = actualLocation || baseDomain.link;
    return `<noscript><meta http-equiv="refresh" content="${getMetaRefreshContent(go, baseDomain.link)}"/></noscript>`;
  }

  return '';
};

/**
 * Expose noScriptRedirect
 */
module.exports.noScriptRedirect = noScriptRedirect;
