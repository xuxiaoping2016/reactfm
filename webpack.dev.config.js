/*
 * @Author: xiaoping.xu
 * @Date: 2021-05-08 11:17:14
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-05-08 16:06:21
 * @Desc: 
 */
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    /*入口*/
    entry: path.join(__dirname, 'src/index.js'),
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use:["url-loader"]
        },
        {
            test:/\.css$/,
            use:[
                {
                    loader:MiniCssExtractPlugin.loader,
                },'css-loader',"postcss-loader"]
        },
        {
            test:/\.scss$/,
            use:[{
                // loader:MiniCssExtractPlugin.loader,
                loader:'style-loader'
            },'css-loader','sass-loader','postcss-loader']
        }]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        // new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),

        // new CopyWebpackPlugin([
        //     { from: 'src/api', to: 'api' }
        // ]),
        // new UglifyJSPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //      }
        //  }),
    ],

    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },

    devServer: {
        contentBase:["dist"],
        historyApiFallback: {
            disableDotRule: true
        },
        port:3000
    },
    resolve:{
        extensions: [".js","jsx", ".json"],
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    }
};