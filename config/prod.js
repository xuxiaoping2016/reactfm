const path = require('path');
const { proxy } = require('./proxy');

// 根据 npm start --[参数] 进行环境切换
let proxyCurrent = proxy.online;
for (const key in proxy) {
  if (process.env[`npm_config_${key}`]) {
    proxyCurrent = { ...proxyCurrent, ...proxy[key] };
  }
}

const config = {
  entry: [
    path.resolve(__dirname, '../config/polyfill.js'),
    path.resolve(__dirname, '../src/publicPath.js'),
    path.resolve(__dirname, '../src/index.js'),
  ],
  output: {},
  devServer: {
    proxy: proxyCurrent,
  },
};

module.exports = config;
