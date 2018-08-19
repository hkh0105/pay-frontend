/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {   
  baseDir,
  outputDir, 
} = require('./paths');
const { htmlWebpackPluginFiles } = require('./helpers');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      API_SEVER_URL: '"https://pay.ridi.io/api"',
      BOOKS_SERVER_URL: '"https://dev.ridi.io"',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.hbs',
      cache: true,
      files: htmlWebpackPluginFiles,
    }),
    new webpack.EvalSourceMapDevToolPlugin({
      test: /\.(jsx?|tsx?)($|\?)/i,
      module: true,
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 9000,
    contentBase: [
      outputDir,
      path.join(baseDir, 'public'), 
      path.join(baseDir, 'src'), 
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
