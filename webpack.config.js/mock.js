/* eslint-disable */

const webpack = require('webpack');

module.exports = (env) => {
 return {
  plugins: [
    new webpack.DefinePlugin({
      USE_MOCK_RESPONSES: !!env.mock,
      DELAY_RESPONSE: env.delayResponse || 2000,
    }),
  ],
 }
};
