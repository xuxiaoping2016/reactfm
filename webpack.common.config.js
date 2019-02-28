const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    entry : {
        app:[
            "babel-polyfill",
            path.join(__dirname,'src/index.tsx')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    output :{
        path : path.join(__dirname,'dist'),
        filename:"js/bundle.[chunkhash].js",
        chunkFilename: 'js/[name].[chunkhash].js',
        publicPath:"/"
    },

    module : {
        rules:[
            // {
            //     test:/\.(js|jsx)$/,
            //     use:{
            //         loader:"babel-loader",
            //         options:{
            //             cacheDirectory:true,
            //         }
            //     },
            //     exclude: /(node_modules|bower_components)/,
            //     include: path.join(__dirname, 'src')
            // },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    }
}

module.exports = commonConfig;