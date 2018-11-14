
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
