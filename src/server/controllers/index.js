import Router from '@koa/router'

import IndexController from './IndexController'
import BooksController from './BooksController'
import ApiController from './ApiController'

const router = new Router()

const indexController = new IndexController()
const booksController = new BooksController()
const apiController = new ApiController()

function initController(app) {
  router.get('/', indexController.actionIndex)
  router.get('/books/list', booksController.actionBooksList)
  router.get('/books/create', booksController.actionBooksCreate)
  router.get('/api/getDataList', apiController.actionDataList)

  app.use(router.routes())
    .use(router.allowedMethods())
}

export default initController