/* eslint-disable */

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { htmlWebpackPluginFiles } = require('./helpers');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          sourceMap: true,
          safari10: true,
          compress: {
            warnings: false,
            drop_console: false,
          },
          comments: false,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_SEVER_URL: 'https://ridi.pay.com',
      BOOKS_SERVER_URL: 'https://ridibooks.com',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.hbs',
      minify: true,
      files: htmlWebpackPluginFiles,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      moduleFilenameTemplate: 'webpack:///[id]',
      append: '\n//# sourceMappingURL=[url]',
    }),
  ],
};