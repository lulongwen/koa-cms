const { LOGIN_TYPE } = require('@config/dict.config')

// 参数校验
const checkType = ctx => {
  const { type } = ctx.body
  if (!type) {
    throw new Error('type 参数必填')
  }
  
  const status = Object.values(LOGIN_TYPE).includes(type)
  if (!status) {
    throw new Error('type参数错误')
  }
}

module.exports = {
  checkType
}
