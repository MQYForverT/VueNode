const fs = require('fs');
const path = require('path');

module.exports = config => {
  config.devServer = {
    host: '127.0.0.1',
    port: 8091,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'ssl/ssl.crt'))
    },
    proxy: {
      '/tour/static': {
        sw: false,
        target: 'https://127.0.0.1:8091',
        pathRewrite: { '^/tour/static': '/static' },
        changeOrigin: false
      }
    },
    disableHostCheck: true
  };
}