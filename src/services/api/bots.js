import request from '@/services/request'

const urlVersion = '/public/api/ver1'

export default {
  getAllBots(accountId) {
    return request({
      url: `${urlVersion}/bots?account_id=${accountId}`,
      method: 'get'
    })
  }
}
