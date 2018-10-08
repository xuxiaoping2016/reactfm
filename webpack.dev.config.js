const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config.js');

const devConfig =  {
 
    /*入口*/
    entry:{
        app:[
            'react-hot-loader/patch',
            path.join(__dirname, 'src/pages/router1/router1.js')
        ]
    },
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        filename: '[name].[hash].js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         }]
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: {
            disableDotRule: true   
        },
        // hot:true
    },
   devtool: 'inline-source-map'
};

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);