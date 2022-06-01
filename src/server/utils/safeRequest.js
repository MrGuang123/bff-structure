import axios from "axios";

class SafeRequest {
  static fetch(url) {
    const result = {
      code: 200,
      msg: '',
      data: null
    }

    return new Promise(resolve => {
      axios.get(url).then(data => {
        result.data = data.data
        resolve(result)
      }).catch(e => {
        result.code = 400
        result.msg = `request error: ${e.message}`
        resolve(result)
      })
    })
  }
}

export default SafeRequest