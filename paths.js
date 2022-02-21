const paths = require('path');

module.exports = {
  src: paths.resolve(__dirname, '../src'),

  build: paths.resolve(__dirname, '../build'),

  public: paths.resolve(__dirname, '../public'),

  assets: paths.resolve(__dirname, '../src/assets'),
};
