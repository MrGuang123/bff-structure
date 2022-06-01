import Router from '@koa/router'

import IndexController from './IndexController'
import ApiController from './ApiController'

const router = new Router()

const indexController = new IndexController()
const apiController = new ApiController()

function initController(app) {
  router.get('/', indexController.actionIndex)
  router.get('/api/getDataList', apiController.actionDataList)

  app.use(router.routes())
    .use(router.allowedMethods())
}

export default initController