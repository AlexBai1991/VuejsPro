var VueLoader = require('vue-loader');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
	watch: true,
	entry: './src/js/main.js',
	output: {
		path: './src/build',
		publicPath: './build/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('css!sass') },
			{ test: /\.vue$/, loader: 'vue' }
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