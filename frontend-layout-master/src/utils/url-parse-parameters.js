/**
 * Replace expression %params% in query string for data.
 */
module.exports = (url, params = [], delimiter = '%') => {
  let result = url;
  let reg = new RegExp();
  const keys = Object.keys(params);

  for (let i = 0; i < keys.length; i += 1) {
    reg = new RegExp(`${delimiter}${keys[i]}${delimiter}`);
    result = result.replace(reg, params[keys[i]]);
  }

  return result;
};
