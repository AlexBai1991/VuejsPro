var path = require('path');
var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  watch: true,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextWebpackPlugin.extract('css') },
      { test: /\.scss$/, loader: ExtractTextWebpackPlugin.extract('css!sass') },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.(jpe?g|png)$/, loader: 'url?limit=10&name=images/[name][hash:4].[ext]' }, 
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }, 
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ] 
  },
  vue: {
    loaders: {
      css: ExtractTextWebpackPlugin.extract('css'),
      sass: ExtractTextWebpackPlugin.extract('css!sass')
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new ExtractTextWebpackPlugin('[name].css')
  ]
};