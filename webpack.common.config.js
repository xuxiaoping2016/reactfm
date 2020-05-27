const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
    entry : {
        app:[
            "babel-polyfill",
            path.join(__dirname,'src/index.js')
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
            //     test: /\.tsx?$/, 
            //     loader: "tslint-loader",
            //     options:{
            //         "fix": false
            //     }
            // },
            { 
                test: /\.tsx?$/, 
                use:[
                    {
                        loader: "ts-loader"
                    },
                    // {  // 没有配置好，使用不了
                    //     loader: 'eslint-loader',
                    //     options: {
                    //         fix: true,
                    //         cache: true, // 缓存lint结果，可以减少lint时间
                    //     }
                    // }
                ]
            },
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
        extensions: [".js",".jsx", ".ts", ".tsx", ".json"],
        alias:{
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            store: path.join(__dirname,'src/redux')
        }
    }
}

module.exports = commonConfig;