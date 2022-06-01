import Controller from './Controller'
import IndexModel from '../models/IndexModel'

class ApiController extends Controller {
  constructor() {
    super()
  }

  async actionDataList(ctx) {
    const indexModel = new IndexModel()
    ctx.body = await indexModel.getIndexModel()
  }
}

export default ApiController