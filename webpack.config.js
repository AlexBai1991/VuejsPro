var VueLoader = require('vue-loader');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
console.log(__dirname);
module.exports = {
	watch: true,
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/build',
		publicPath: '../build/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('css') },
			{ test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('css!sass') },
			{ test: /\.vue$/, loader: 'vue' },
			{ test: /\.(jpe?g|png)$/, loader: 'url?limit=10&name=images/[name][hash:4].[ext]' }, 
			{
            	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            	loader: "url-loader?limit=10000&minetype=application/font-woff"
        	}, 
        	{
            	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	            loader: "file-loader"
	        }
		] 
	},
	vue: {
		loaders: {
			css: ExtractTextWebpackPlugin.extract('css'),
			sass: ExtractTextWebpackPlugin.extract('css!sass')
		}
	},
	plugins: [
		new ExtractTextWebpackPlugin('[name].css')
	]
}