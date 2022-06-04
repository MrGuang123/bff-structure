const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const minify = require('html-minifier').minify
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpackBuildNotifier = require('webpack-build-notifier')

module.exports = {
  output: {
    filename: '[name].[contenthash:8].js'
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/client/views/layouts'),
          to: '../views/layouts',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true
            })
          }
        },
        {
          from: path.join(__dirname, '../src/client/components'),
          to: '../components',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true
            })
          }
        },
      ]
    }),
    new webpackBuildNotifier({
      title: 'client build success',
      suppressSuccess: true
    })
  ]
}