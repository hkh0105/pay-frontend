// shared config (dev and prod)
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ChunkRenamePlugin = require('webpack-chunk-rename-plugin');

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
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[chunkhash].min.js',
    hashDigestLength: 8,
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
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.hbs$/,
        include: path.join(srcDir, 'template'),
        loader: 'handlebars-loader',
      },
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
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test (chunk) {
            return chunk.context && chunk.context.includes('node_modules') && !(/core-js/).test(chunk.context);
          },
        },
      },
    },
  },
  plugins: [
    new CheckerPlugin(),
    new ChunkRenamePlugin({
      initialChunksWithEntry: true,
      vendors: '[name].min.js',
    }),
  ],
  performance: {
    hints: false,
  },
};
