const path = require('path');
const { argv } = require('yargs')
const glob = require('glob');
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { mode } = argv
const envConfig = require(`./build/webpack.${mode}.js`);

const files = glob.sync('./src/client/views/**/*.entry.js')
const htmlPlugins = []
const entrys = files.reduce((all, url) => {
  if (/(\w+-\w+)\.entry\.js/.test(url)) {
    const entryKey = RegExp.$1
    const [pageName, actionName] = entryKey.split('-')
    all[entryKey] = `./src/client/views/${pageName}/${entryKey}.entry.js`

    htmlPlugins.push(new HtmlWebpackPlugin({
      filename: `../client/views/${pageName}/pages/${actionName}.html`,
      template: `./src/client/views/${pageName}/pages/${actionName}.html`,
      chunks: ['runtime', entryKey]
    }))
  }

  return all
}, {})

const baseConfig = {
  mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, './src/client/views/layouts'),
          to: '../client/views/layouts'
        },
        {
          from: path.join(__dirname, './src/client/components'),
          to: '../client/components'
        },
      ]
    })
  ]
}

module.exports = merge(baseConfig, envConfig)