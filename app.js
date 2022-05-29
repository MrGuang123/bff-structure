const Koa = require('koa')
const render = require('koa-swig')
const co = require('co')
const staticServe = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');

const config = require('./configs')
const initController = require('./controllers')
const ErrorHandler = require('./middlewares/ErrorHandler')

const app = new Koa()

// 初始化路由
initController(app)

// 初始化swig模板引擎配置
app.context.render = co.wrap(render({
  root: config.viewsPath,
  cache: config.cache,
  varControls: ['[[', ']]']
}))

/**
 * 初始化中间件
 */
// 初始化静态资源服务
app.use(staticServe(config.staticPath))
// 解决前后端路由兼容问题
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }))
// 全局错误处理
ErrorHandler.error(app)

app.listen(config.port, () => {
  console.log(`server is running at: http://localhost:${config.port}`)
})