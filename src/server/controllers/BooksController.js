import Controller from './Controller'

class BooksController extends Controller {
  constructor() {
    super()
  }

  async actionBooksList(ctx) {
    // throw new Error('custom error')
    ctx.body = await ctx.render('books/pages/list', {
      data: [
        {
          id: 1,
          name: 'javascript'
        },
        {
          id: 2,
          name: 'go lang'
        },
      ]
    })
  }
}

export default BooksController