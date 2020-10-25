const path = require('path')

// token配置
const security = {
  secretKey: 'abc123', // 加密 key
  // expiresIn: 60 * 60 // 一个小时
  expiresIn: 60 * 60 * 24 * 30
}

// 微信小程序配置
const wx = {
  appId: 'wx176b1ec6ecc2694f',
  appSecret: 'b70a67a4f317462f7e7316b7ec8d0109',
  loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}

// 每个角色的权限数字
const authCode = {
  USER: 8, // 用户
  ADMIN: 16, // 管理员
  SUPER_ADMIN: 32 // 超级管理员
}

const host = 'localhost:3000'

// 全局路径
const viewPath = {
  view: path.join('/src/views'), // 后台模板路径
  restful: ''
}


module.exports = {
  security,
  wx,
  authCode,
  host,
  viewPath
}
