/* eslint-disable */
require('dotenv-safe').config();

const fs = require('fs');
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
    port: process.env.DEV_SERVER_PORT,
    contentBase: [
      outputDir,
      baseDir,
      // path.join(baseDir, 'public'),
      path.join(baseDir, 'src'), // to support sourcemap
    ],
    host: '0.0.0.0',
    https: {
      cert: fs.readFileSync(path.join(baseDir, '.ssl', `${process.env.RIDI_PAY_HOST}.pem`), 'utf-8'),
      key: fs.readFileSync(path.join(baseDir, '.ssl', `${process.env.RIDI_PAY_HOST}-key.pem`), 'utf-8'),
    },
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: false,
  },
  watchOptions: {
    poll: true,
  },
};
