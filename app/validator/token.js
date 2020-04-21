const { KoaValidator, Rule } = require('./koa-validator')
const { LOGIN_TYPE } = require('@config/dict.config')

// token 验证
class TokenValidator extends KoaValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '最小4个字符，最大32个', {
        min: 4, max: 32
      })
    ]
    
    this.secret = [
      new Rule('isOptional'), // 可以不填，有值必须符合规则
      new Rule('isLength', '最小6个字符，最大120个', {
        min: 6, max: 120
      })
    ]
  }
  
  // checkType
  validateLoginType (ctx) {
    const {type} = ctx.body
    if (!type) {
      throw new Error('type必须是参数')
    }
    
    const status = Object.values(LOGIN_TYPE).includes(type)
    if (!status) {
      throw new Error('type参数错误')
    }
  }
}

// token不能为空
class RequiredTokenValidator extends KoaValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', 'token不允许为空', {
        min: 60
      })
    ]
  }
}

module.exports = {
  TokenValidator,
  RequiredTokenValidator
}
