const path = require('path');
const webpack = require("webpack")

var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
 
    /*入口*/
    entry:{
        app:[
            path.join(__dirname, 'src/index.js')
        ] ,
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: "/"
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
        // {
        //     test: /\.css$/,
        //     use: ['style-loader', 'css-loader']
        //  },
         {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new CopyWebpackPlugin([
            { from: './api', to: 'api' }
        ])
   ],

   resolve:{
       alias:{
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        router: path.join(__dirname, 'src/router'),
        actions: path.join(__dirname, 'src/redux/actions'),
        reducers: path.join(__dirname, 'src/redux/reducers'),
        reduxs: path.join(__dirname, 'src/redux')
       }
   }
};