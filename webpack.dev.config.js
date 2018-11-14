const path = require("path");
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry : {
        app:[
            "react-hot-loader/patch",
            path.join(__dirname,'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    output :{
        path : path.join(__dirname,'dist'),
        filename:"js/bundle.[hash].js",
        chunkFilename: 'js/[name].[chunkhash].js'
    },

    module : {
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        cacheDirectory:true,
                        // presets:['@babel/preset-env']
                    }
                },
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, 'src')
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:["url-loader"]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new CopyWebpackPlugin([
            { from: 'src/api', to: 'api' }
        ]),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    
    devServer: {
        contentBase:'./dist',
        historyApiFallback: true,
        port:"8001",
        headers: {
        'X-Custom-Foo': 'bar'
        }
    },

    resolve:{
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    },
    devtool: 'inline-source-map',
    mode: "development"
}