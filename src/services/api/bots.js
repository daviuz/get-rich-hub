import request from '@/services/request'

const threeCUrl = process.env.VUE_APP_THREEC_URL_VERSION

export default {
  getAllBots(accountId) {
    return request({
      url: `${threeCUrl}/bots?account_id=${accountId}`,
      method: 'get'
    })
  },

  getBlackListedPairs() {
    return request({
      url: `${threeCUrl}/bots/pairs_black_list`,
      method: 'get'
    })
  }
}
