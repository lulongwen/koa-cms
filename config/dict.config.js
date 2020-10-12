// 登录 类型，字典配置
const LOGIN_TYPE = {
  USER_WECHAT: 100, // 小程序
  USER_EMAIL: 101, // 邮箱
  USER_PHONE: 102, // 手机
  ADMIN_EMAIL: 200 // 管理员
}

// classic 类型
const CLASSIC_TYPE = {
  MOVIE: 100,
  MUSIC: 200,
  SENTENSE: 300,
  BOOK: 400
}

module.exports = {
  LOGIN_TYPE,
  CLASSIC_TYPE
}
