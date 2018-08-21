/* eslint-disable */

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
    hashDigestLength: 8,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
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
      API_SEVER_URL: '"https://pay.ridi.com"',
      BOOKS_SERVER_URL: '"https://ridibooks.com"',
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.hbs',
      minify: true,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      moduleFilenameTemplate: 'webpack:///[id]',
      append: '\n//# sourceMappingURL=[url]',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { 
        autoprefixer: false,
        discardComments: { removeAll: true } 
      },
    }),
  ],
};