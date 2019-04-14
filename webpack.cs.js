const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const lessToJs = require('less-vars-to-js');
const fs = require("fs");

function getTheme(path) {
    let themeContent = '';
  
    // 解决 theme 文件不存在的异常
    try {
      themeContent = fs.readFileSync(path, 'utf8');
    } catch (error) {
      console.error('【错误】读取主题文件异常', error);
      themeContent = '';
    }
  
    const themes = lessToJs(themeContent, {
      resolveVariables: true,
      stripPrefix: true,
    });
    return themes;
  }

  console.log(getTheme('./src/pages/Home/theme.less'))
  