const util = require('util')
const axios = require('axios')

const {
  AuthFailedException
} = require('@exception')

const {
  createToken
} = require('@utils')

const {
  wx: { loginUrl, appId, appSecret },
  authCode
} = require('@config/config')

const User = require('@models/user')

// 微信小程序登录
class WxServer {
  static async code2Token (code) {
    // url格式化； %s参数替换
    const url = util.format(loginUrl, appId, appSecret, code)
    const {
      status, data: { errcode, errmsg, openid }
    } = await axios.get(url)

    if (status !== 200 || errcode) {
      throw new AuthFailedException(`openid 获取失败 ${errmsg}`)
    }
    
    // 判断用户存在不存在，用 uid 代替 openid
    let user = await User.getUserByOpenid(openid)
    if (!user) {
      user = await User.registerByOpenid(openid)
    }
    return createToken(user.id, authCode.USER)
  }
}

module.exports = WxServer

// 微信服务端 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
