const path = require('path')

let config = {
  viewsPath: path.join(__dirname, '../../client', 'views'),
  staticPath: path.join(__dirname, '../../client', 'public')
}

if (false) {
  alert(1)
}

if (process.env.NODE_ENV === 'development') {
  const devConfig = {
    port: 3000,
    cache: false
  }
  config = { ...config, ...devConfig }
}

if (process.env.NODE_ENV === 'production') {
  const prodConfig = {
    port: 80,
    cache: 'memory'
  }
  config = { ...config, ...prodConfig }
}

module.exports = config