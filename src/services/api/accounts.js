import request from '@/services/request'

export default {
  getAccountDetails(accountId) {
    return request({
      url: `${process.env.VUE_APP_THREEC_URL_VERSION}/accounts/${accountId}`,
      method: 'get'
    })
  }
}
