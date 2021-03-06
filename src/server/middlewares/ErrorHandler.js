class ErrorHandler {
  static error(app, logger) {
    // 处理全局错误
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        logger.error(e.message);
        ctx.body = '500, 正在修复'
      }
    })

    // 处理404错误
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status === 404) {
        ctx.body = '404, 接口不存在啊'
      }
    })
  }
}

export default ErrorHandler