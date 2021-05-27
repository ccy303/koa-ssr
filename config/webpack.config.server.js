const path = require('path');
const assetsWebpackPlugin = require('assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const entryList = {
  home: path.resolve(__dirname, '../src/pages/home/index.js'),
  about: path.resolve(__dirname, '../src/pages/about/index.js'),
};
module.exports = {
  mode: 'development',
  target: 'node',
  entry: () => {
    return entryList;
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
          'isomorphic-style-loader',
          'css-loader', // translates CSS into CommonJS
          'less-loader', // compiles Less to CSS
        ],
      },
    ],
  },
  plugins: (() => {
    return [new ProgressBarPlugin()];
  })(),
};
