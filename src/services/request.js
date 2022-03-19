import axios from 'axios'
import CryptoJS from 'crypto-js'

const baseURL = process.env.VUE_APP_THREEC_BASE_URL
const service = axios.create({
  baseURL: baseURL
})

service.interceptors.request.use(
  config => {
    const signature = CryptoJS.HmacSHA256(config.url, process.env.VUE_APP_THREEC_SECRET).toString()
    config.headers['APIKEY'] = process.env.VUE_APP_THREEC_API_KEY
    config.headers['Forced-Mode'] = 'paper'
    config.headers['Signature'] = signature

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
