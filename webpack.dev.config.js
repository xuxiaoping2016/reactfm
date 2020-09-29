const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.config.js");

const devConfig = {
	devtool: "inline-source-map",
	entry : {
		app:[
      "babel-polyfill",
      "react-hot-loader/patch",
			path.join(__dirname,"src/index.js")
		]
  },

	output :{
		filename:"js/bundle.[hash].js",
	},

	module : {
		rules:[
      {
				test:/\.css$/,
				use:["style-loader","css-loader","postcss-loader"]
			},
			{
				test:/\.scss$/,
				use:[
					"style-loader",
					{
						loader: 'css-loader',
						// options: { 
						// 	modules: {
						// 		localIdentName: '[path][name]_[local]_[hash:base64:5]'
						// 	},
						// 	importLoaders: 1 
						// }
					},"postcss-loader",{
						loader: "sass-loader",
						// options: {
                        //     sassOptions:{
                        //         javascriptEnabled: true
                        //     }
                        // }
					}]
			}
		]
	},

  devServer: {
		contentBase:"./dist",
    historyApiFallback: {
			disableDotRule: true
		},
		port:"8001",
		headers: {
			"X-Custom-Foo": "bar"
		}
  },
	mode: "development"
};;

module.exports = merge({
  customizeArray(a, b, key) {
		/*entry.app不合并，全替换*/
		if (key === "entry.app") {
      return b;
    }
		return undefined;
	}
})(commonConfig, devConfig);
