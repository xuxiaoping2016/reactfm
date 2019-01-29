const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

const commonConfig = {
    entry : {
        app:[
            "babel-polyfill",
            path.join(__dirname,'src/index.js')
        ],
        vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react']
    },

    output :{
        path : path.join(__dirname,'dist'),
        filename:"js/bundle.[chunkhash].js",
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath:"/"
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
                test: /\.(png|svg|jpg|gif)$/,
                use:["url-loader"]
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        })
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

    resolve:{
        extensions: [".js",".jsx", ".json"],
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
			store: path.join(__dirname,'src/redux'),
			utils: path.join(__dirname,"src/utils")
        }
    }
}

module.exports = commonConfig;
