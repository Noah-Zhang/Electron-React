var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './scripts/main.js'),
  output: {
    path: path.resolve(__dirname, './scripts'),
    filename: 'bundle.js',
  },
  target: "electron",
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      loaders: ['babel']
    }]
  }
};