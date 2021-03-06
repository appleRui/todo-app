import axios from 'axios'
import get from 'lodash/get'
import auth from '@/services/auth'
import router from '@/router/index'
import dialog from '@/store/modules/dialog'

const storage = window.localStorage

class Http {

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    })
    this.init()
  }

  init() {

    this.http.interceptors.request.use(
      async (config) => {
        const refresh_token = storage.getItem('refresh_token')
        const authorization = storage.getItem('token')

        if (config.method === "get") {
          if (!config.params) config.params = {}
          config.params['refresh_token'] = refresh_token
        }

        if (config.method === "post") {
          config.data['refresh_token'] = refresh_token
        }

        if (config.method === "patch") {
          config.data['refresh_token'] = refresh_token
        }

        if (config.method === "delete") {
          if (!config.params) config.params = {}
          config.params['refresh_token'] = refresh_token
        }

        config.headers['Authorization'] = authorization
        return config;
      }
    )

    this.http.interceptors.response.use(
      (res) => {
        const result = get(res.data, 'result', null)
        const logout = get(res.data, 'logout', null)

        if (!result && logout) {
          auth.logout()
          router.push("/login")
        }

        if (process.env.NODE_ENV === 'development') console.log(res.data)
        return res;
      },
      (error) => {
        // console.error(error.response)
        console.error(error.response.status + ":" + error.response.statusText)
        dialog.commit('close')
        if (error.response.status === 404) {
          router.push({
            name: 'notfound'
          })
        }
      }
    )
  }

  // Request methods
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

  async patch(uri, params) {
    return await this.http.patch(uri, {
      params: params
    })
  }

  async delete(uri, params) {
    return await this.http.delete(uri, {
      params: params
    })
  }

}
export default new Http()