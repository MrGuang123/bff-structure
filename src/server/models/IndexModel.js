import SafeRequest from '../utils/safeRequest'

class IndexModel {
  getIndexModel() {
    return [
      {
        id: 1,
        name: 'index hello'
      },
      {
        id: 2,
        name: 'index worldd'
      }
    ]
    // return SafeRequest.fetch('http://xxx').catch(() => {
    //   return [
    //     {
    //       id: 1,
    //       name: 'index hello'
    //     },
    //     {
    //       id: 2,
    //       name: 'index worldd'
    //     }
    //   ]
    // })
  }
  findIndex() {

  }
}

export default IndexModel