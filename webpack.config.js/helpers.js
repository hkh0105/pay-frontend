const htmlWebpackPluginFiles = {
  chunks: {
    head: {
      entry: ['manifest', 'vendors', 'polyfill'],
      css: ['normalize.css'],
    },
    main: {
      entry: 'main',
    },
  },
};

exports.module = {
  htmlWebpackPluginFiles,
};