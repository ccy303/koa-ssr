const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    home: path.resolve(__dirname, '../src/pages/home'),
    // detail: path.resolve(__dirname, '../src/views/detail'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    // filename: `static/js/[name].[${isProd ? 'chunkhash' : 'hash'}:8].js`,
    // filename: `[name].[chunkhash:8].js`,
    filename: `js/[name].js`,
    libraryTarget: 'commonjs',
    // chunkFilename: 'static/js/[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        /* 指定src文件下的内容 */
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'less-loader', // compiles Less to CSS
        ],
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css',
      chunkFilename: 'css/[name].[contenthash].min.css',
    }),
  ],
};
