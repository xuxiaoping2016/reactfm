
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. 
Learn more: https://webpack.js.org/concepts/mode/


二、babel5 和 babel6 的区别
https://www.cnblogs.com/sker/p/5482400.html

三、webpack Dev Server Invalid Options
options.historyApiFallback should be {Boolean} 
(https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback)

四、webpack配置react-hot-loader热加载局部更新
https://blog.csdn.net/huangpb123/article/details/78556652

https://gaearon.github.io/react-hot-loader/getstarted/

五、redux原理
https://blog.csdn.net/juhaotian/article/details/79509053
https://github.com/reduxjs/redux

https://blog.csdn.net/weixin_42420703/article/details/82227734     import  很详细
中文文档
http://cn.redux.js.org/docs/recipes/reducers/BasicReducerStructure.html

六、ERROR in ./src/pages/Counter/Counter.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: F:/reactfm/src/pages/Counter/Counter.js: Decorators are not officially supported yet in 6.x pending a proposal update.
However, if you need to use them you can install the legacy decorators transform with:

npm install babel-plugin-transform-decorators-legacy --save-dev

and add the following line to your .babelrc file:

{
  "plugins": ["transform-decorators-legacy"]
}

The repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.


七、file-loader 和 url-loader的区别
https://blog.csdn.net/qq_38652603/article/details/73835153
https://blog.csdn.net/hdchangchang/article/details/80175782

相关问题：我使用的是file-loader，当我在项目中使用webpack-dev-server开始完毕后，页面所有图片浏览正常。然后使用webpack将项目打包出来后，页面中的所有图片加载失败。
https://blog.csdn.net/WEB_YH/article/details/79325182?utm_source=blogxgwz9

八、react 按需加载 的实现及原理
https://segmentfault.com/a/1190000009539836

九、提取公共代码使用webpack.optimize.CommonsChunkPlugin报错
webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead

https://blog.csdn.net/github_36487770/article/details/80228147
详解CommonsChunkPlugin的配置和用法
https://segmentfault.com/a/1190000012828879


十、代码压缩
UglifyJSPlugin   vendor 直接从2600KB 变为330多kb
webpack.DefinePlugin  vendor 直接从330KB 变为209kb

十一、在使用extract-text-webpack-plugin给webpack打包时出现报错
(node:14844) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
(node:14844) DeprecationWarning: Tapable.apply is deprecated. Call apply on the plugin directly instead

问题原因：extract-text-webpack-plugin目前版本不支持webpack4。
解决方案：使用extract-text-webpack-plugin的最新的beta版
        npm install extract-text-webpack-plugin@next
参考 ：https://blog.csdn.net/u011215669/article/details/81269386

同类问题参考  Vue项目升级到Webpack 4.x初步踩坑总结
              https://blog.csdn.net/harsima/article/details/80819747


终极解决方案
webpack 插件 mini-css-extract-plugin 配置项请教 https://segmentfault.com/q/1010000015723367/a-1020000015729448


十二、nginx 配置解决 react 、vue 单页面刷新404问题
https://blog.csdn.net/a20023930/article/details/80436663
https://www.jianshu.com/p/b4f004bb8b66

react单页面应用本地开发环境下刷新会停留在当页，部署在服务器上刷新404
https://segmentfault.com/q/1010000011004310

apache服务器开启rewrite模式总结 解决404错误

通过比对本地wampserver的配置文件和服务器上的apache配置文件，解决了404错误


十三、测试环境和正式环境接口地址不同应该怎么处理？

十四、CSS MODULES
https://www.w3cplus.com/blog/tags/555.html


十五、json-server 详解
https://www.cnblogs.com/fly_dragon/p/9150732.html