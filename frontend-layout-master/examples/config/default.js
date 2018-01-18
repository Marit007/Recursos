const {env} = require('process');
module.exports = {
  ragnar: {
    basePath: '/',
    server: {
      port: env.port || 8080,
      securePort: 8443,
      host: '0.0.0.0',
      static: './examples/build',
    },
    version: require(`${__dirname}/../../package.json`).version,
  },
  apiScope: '/beta',
};
