const { argv } = require('yargs')
const { merge } = require('webpack-merge')
const glob = require('glob');
const path = require('path');

const { mode } = argv
const envConfig = require(`./build/webpack.${mode}.js`);

const files = glob.sync('./src/client/views/**/*.entry.js')
const entrys = files.reduce((all, url) => {
  if (/(\w+-\w+)\.entry\.js/.test(url)) {
    const entryKey = RegExp.$1
    const [pageName, actionName] = entryKey.split('-')
    all[entryKey] = `./src/client/views/${pageName}/${entryKey}.entry.js`
    console.log(RegExp.$1)
  }

  return all
}, {})
console.log(files)

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
      }
    ]
  }
}

module.exports = merge(baseConfig, envConfig)