/**
 * Module dependencies
 */
const serialize = require('serialize-javascript');
const countryConfig = require('frontend-country_config');

/**
 * Create JS snippet which exposes the initial state of the app
 * @param {Object} initialState
 */
function getInitialState(initialState) {
  return initialState ?
    `\n<script id="__PRELOADED_STATE__">(function(win) {
  win.__PRELOADED_STATE__ = ${serialize(JSON.stringify(initialState))}
})(window || this);</script>` : '';
}

/**
 * Get lang code by countryId
 * @param {String} countryId
 */
function getLang(countryId) {
  const { locale } = countryConfig(countryId);
  return locale.replace('_', '-');
}

/**
 * Create JS snippet to include injected scripts
 * @param {String} scripts
 * @param {Boolean} lowEnd
 */
function getInjectedScripts(scripts, lowEnd = false) {
  return !lowEnd && scripts ? `<script>${scripts}</script>` : '';
}

/**
 * Generate HTML markup used by all layout types but `none`
 * @param {Object} props
 */
function getLayoutBase(props) {
  const {
    html,
    app,
    preconnects,
    newrelicTimingHeader,
    head,
    initialState,
    headsync,
    styles,
    analytics,
    countryId,
    scripts,
    melidata,
    metrics,
    lowEnd,
  } = props;

  const lang = getLang(countryId);
  const InitialStateSnippet = getInitialState(initialState);
  const injectedScripts = getInjectedScripts(scripts, lowEnd);

  // Start to write html output
  let output = (
`<!DOCTYPE html>
<html lang="${lang}">
<head>${preconnects}${newrelicTimingHeader}${head}${InitialStateSnippet}
${headsync}${styles}${analytics}
</head>`
  );

  // Add application html and scripts, and write it to response stream
  output += html.replace('{{children}}', app)
    .replace('{{melidata}}', melidata)
    .replace('{{scripts}}', `${injectedScripts}\n${metrics}`);
  output += '</html>';

  return output;
}

/**
 * Generate clean HTML markup for `none` layout type
 * @param {Object} props
 */
function getLayoutNone(props) {
  const {
    app,
    initialState,
    headsync,
    styles,
    countryId,
    scripts,
  } = props;

  const lang = getLang(countryId);
  const InitialStateSnippet = getInitialState(initialState);
  const injectedScripts = getInjectedScripts(scripts);

  return (`<!DOCTYPE html><html lang="${lang}">
<head>${headsync}${InitialStateSnippet}${styles}</head>
<body><div id="app-content">${app}${injectedScripts}</div></body></html>`);
}

/**
 * Expose getLayoutBase
 */
exports.getLayoutBase = getLayoutBase;

/**
 * Expose getLayoutNone
 */
exports.getLayoutNone = getLayoutNone;
