const path = require("path");
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        filename:"js/[name].[hash].js",
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
            // {
            //     test:/\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: "css-loader"
            //       })
            //     // use:['style-loader','css-loader']
            // },
            {
                test:/\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: ['css-loader','sass-loader']
                //   })
                use:[
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it use publicPath in webpackOptions.output
                      publicPath: '../'
                    }
                  },'css-loader','sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:["url-loader"]
            }
        ]
    },

    plugins:[
        new CleanWebpackPlugin(['dist']),
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        // new ExtractTextPlugin({
        //     filename: 'css/[name].[contenthash:5].css',
        //     allChunks: true
        // }),

        new CopyWebpackPlugin([
            { from: 'src/api', to: 'api' }
        ]),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         }),
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
    
    // devServer: {
    //     contentBase:'./dist',
    //     historyApiFallback: true,
    //     port:"8001",
    //     headers: {
    //     'X-Custom-Foo': 'bar'
    //     }
    // },

    resolve:{
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    },
    devtool: 'cheap-module-source-map',
    mode: "development"
}