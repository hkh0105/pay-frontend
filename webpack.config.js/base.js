// shared config (dev and prod)
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ChunkRenamePlugin = require('webpack-chunk-rename-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {  
  baseDir, 
  srcDir,
  outputDir, 
} = require('./paths');

module.exports = {
  context: srcDir,
  entry: {
    polyfill: ['core-js/shim'],
    main: 'app/index.tsx',
  },
  output: {
    path: outputDir,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        include: path.join(srcDir, 'app'),
        use: {
          loader: 'tslint-loader',
          options: {
            configFile: path.join(baseDir, 'tslint.js'),
            fix: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        include: path.join(srcDir, 'app'),
        use: ['babel-loader?cacheDirectory', 'awesome-typescript-loader'],
      },
      {
        test: /\.hbs$/,
        include: path.join(srcDir, 'template'),
        loader: 'handlebars-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      srcDir,
      'node_modules',
    ],
    symlinks: false, // for performance 
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    noEmitOnErrors: true,
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: false,
        common: {
          name: 'common',
          chunks: 'all',
          test (chunk) {
            return chunk.context && chunk.context.includes('node_modules') && !(/core-js/).test(chunk.identifier());
          },
        },
      },
    },
  },
  plugins: [
    new CheckerPlugin(),
    new ChunkRenamePlugin({
      initialChunksWithEntry: true,
      common: '[name].[chunkhash].min.js',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: 'styles.[chunkhash].css',
    }),
  ],
  performance: {
    hints: false,
  },
};
