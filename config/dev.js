const path = require('path');
const { proxy } = require('./proxy');

// 根据 npm start --[参数] 进行环境切换
let proxyCurrent = proxy.dev;
for (const key in proxy) {
  // console.log(key)
  // console.log(process.env[`npm_config_${key}`],`npm_config_${key}`)

//   dev
// undefined 'npm_config_dev'
// qa
// undefined 'npm_config_qa'
// online
// undefined 'npm_config_online'
// mock
// undefined 'npm_config_mock'

  if (process.env[`npm_config_${key}`]) {
    proxyCurrent = { ...proxyCurrent, ...proxy[key] };
  }
}

const config = {
  entry: [
    path.resolve(__dirname, '../config/polyfill.js'),
    path.resolve(__dirname, '../src/index.js'),
  ],
  output: {},
  devServer: {
    proxy: proxyCurrent,
  },
};
module.exports = config;
