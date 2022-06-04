
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pluginName = 'InjectCssJsPlugin';

function createHtml(type, dataArray) {
  let result = ''

  if (type === 'js') {
    dataArray.forEach(url => {
      result += `<script src="${url}"></script>`
    })
  } else if (type === 'css') {
    dataArray.forEach(url => {
      result += `<link href="${url}" rel="stylesheet"></link>`
    })
  }

  return result
}

class InjectCssJsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      console.log('input plugin')
      // 获取css js
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(pluginName, (data, cb) => {
        this.jsArray = data.assets.js
        this.cssArray = data.assets.css

        cb(null, data)
      })
      // 写入css js
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(pluginName, (data, cb) => {
        data.html = data.html.replace('<!-- injectjs -->', createHtml('js', this.jsArray))
        data.html = data.html.replace('<!-- injectcss -->', createHtml('css', this.cssArray))

        cb(null, data)
      })
    })
  }
}

module.exports = InjectCssJsPlugin;