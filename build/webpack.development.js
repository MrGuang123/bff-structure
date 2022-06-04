const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const webpackBuildNotifier = require('webpack-build-notifier')

module.exports = {
  watch: true,
  output: {
    filename: '[name].[hash:8].js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/client/views/layouts'),
          to: '../views/layouts'
        },
        {
          from: path.join(__dirname, '../src/client/components'),
          to: '../components'
        },
      ]
    }),
    new webpackBuildNotifier({
      title: 'start client server success',
      suppressSuccess: true
    })
  ]
}