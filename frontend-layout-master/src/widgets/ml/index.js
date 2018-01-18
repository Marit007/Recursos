const cart = require('./cart');
const categories = require('./categories');
const exhibitor = require('./exhibitor');

module.exports = (params) => {
    return Promise.all([cart(params), categories(params), exhibitor(params)]).then((widgetsInfo) => {
      return widgetsInfo.reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});
    });
};
