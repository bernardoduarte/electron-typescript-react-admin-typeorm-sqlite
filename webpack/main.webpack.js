const nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
  externals: [nodeExternals(), 'reflect-metadata'],
}