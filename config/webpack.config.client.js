const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const assetsWebpackPlugin = require('assets-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'home.js': path.resolve(__dirname, '../src/pages/home'),
    // detail: path.resolve(__dirname, '../src/views/detail'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    // filename: `static/js/[name].[${isProd ? 'chunkhash' : 'hash'}:8].js`,
    // filename: `[name].[chunkhash:8].js`,
    filename: `js/[name].[contenthash].js`,
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
          limit: false,
          name: 'images/[name].[hash:7].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: false,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'less-loader', // compiles Less to CSS
        ],
      },
    ],
  },
  plugins: (() => {
    return [
      new assetsWebpackPlugin({
        filename: 'manifest.json',
        path: path.join(__dirname, '../dist'),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].min.css',
        chunkFilename: 'css/[name].[contenthash].min.css',
      }),
    ]
  })()
};
