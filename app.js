import Koa from 'koa'
import render from 'koa-swig'
import co from 'co'
import staticServe from 'koa-static'
import log4js from 'log4js'
import { historyApiFallback } from 'koa2-connect-history-api-fallback'

import config from './configs'
import initController from './controllers'
import ErrorHandler from './middlewares/ErrorHandler'

const app = new Koa()

// 初始化swig模板引擎配置
app.context.render = co.wrap(render({
  root: config.viewsPath,
  cache: config.cache,
  varControls: ['[[', ']]']
}))

// 配置日志
log4js.configure({
  appenders: { globalErrors: { type: "file", filename: "./logs/error.log" } },
  categories: { default: { appenders: ["globalErrors"], level: "error" } }
});

const logger = log4js.getLogger();

/**
 * 初始化中间件
 */
// 初始化静态资源服务
app.use(staticServe(config.staticPath))
// 解决前后端路由兼容问题
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }))
// 全局错误处理
ErrorHandler.error(app, logger)

// 初始化路由
initController(app)

app.listen(config.port, () => {
  console.log(`server is running at: http://localhost:${config.port}`)
})