/* eslint-disable */

require('dotenv-safe').config();

const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./base');
const prodConfig = require('./prod');
const devConfig = require('./dev');
const getMockConfig = require('./mock');

module.exports = (env = {}) => {
  return merge(
    baseConfig,
    env.production ? prodConfig : devConfig,
    env.analyze ? {
      plugins: [new BundleAnalyzerPlugin()],
    } : {},
    getMockConfig(env),
  );
};
