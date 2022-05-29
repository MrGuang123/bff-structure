const Controller = require('./Controller')

class ApiController extends Controller {
  constructor() {
    super()
  }

  actionDataList(ctx) {
    ctx.body = [
      {
        id: 1,
        name: 'apple'
      },
      {
        id: 2,
        name: 'orange'
      },
    ]
  }
}

module.exports = ApiController