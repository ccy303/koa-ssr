const path = require('path');
const assetsWebpackPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const entryList = {
  home: path.resolve(__dirname, '../src/pages/home/index.js'),
  about: path.resolve(__dirname, '../src/pages/about/index.js'),
};
module.exports = {
  mode: 'development',
  target: 'web',
  entry: () => {
    const entry = {};
    for (const key in entryList) {
      entry[key] = {
        import: `${entryList[key]}`,
        library: {
          name: key,
          type: 'umd',
          umdNamedDefine: true,
        },
      };
    }
    entry['hydrate'] = {
      import: path.resolve(__dirname, '../util/hydrate.js'),
      library: {
        name: 'hydrate',
        type: 'window',
      },
    };
    return entry;
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: `js/[name].js`,
    globalObject: 'this',
    enabledLibraryTypes: ['umd', 'window'],
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
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'less-loader', // compiles Less to CSS
        ],
      },
    ],
  },
  optimization: {
    // minimizer: [new UglifyJsPlugin()],
    // runtimeChunk: true,
    splitChunks: {
      name: false,
      chunks: 'all',
    },
  },
  plugins: (() => {
    return [
      new ProgressBarPlugin(),
      // new WebpackManifestPlugin({
      //   fileName: 'manifest1.json',
      // }),
      new assetsWebpackPlugin({
        filename: 'manifest.json',
        path: path.join(__dirname, '../build'),
        entrypoints: true,
        update: true,
        manifestFirst: true,
      }),
      new MiniCssExtractPlugin({
        // filename: 'css/[name].[contenthash].min.css',
        // chunkFilename: 'css/[name].[contenthash].min.css',
        filename: 'css/[name].min.css',
        chunkFilename: 'css/[name].min.css',
      }),
      // new BundleAnalyzerPlugin(),
    ];
  })(),
};
