/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  baseDir,
  outputDir,
} = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    // webpack dev server doesn't allow to use `contenthash`
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[hash].min.js',
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_SEVER_URL: '"https://pay.local.ridi.io/api"',
      BOOKS_SERVER_URL: '"https://dev.ridi.io"',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.hbs',
      cache: true,
    }),
    new webpack.EvalSourceMapDevToolPlugin({
      test: /\.(jsx?|tsx?)($|\?)/i,
      module: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: process.env.port || 9000,
    contentBase: [
      outputDir,
      path.join(baseDir, 'public'),
      path.join(baseDir, 'src'), // to support sourcemap
    ],
    proxy: {
      '/api': 'http://localhost:3030', // TODO: change to backend local host
      secure: false,
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
  },
  watchOptions: {
    poll: true,
  },
};
