import axios from 'axios'

class Http {

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    })
  }

  async get(uri, params) {
    return await this.http.get(uri, {
      params: params
    })
  }

  async post(uri, params) {
    return await this.http.post(uri, {
      params: params
    })
  }

}
export default new Http()