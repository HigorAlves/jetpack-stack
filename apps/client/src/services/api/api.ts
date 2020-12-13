import axios, { AxiosInstance } from 'axios'

class API {
  readonly api: AxiosInstance
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: { 'Content-Type': 'application/json' },
      timeout: 3 * 1000
    })
  }
}

const apiInstance = new API()
export default apiInstance.api
