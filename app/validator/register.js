const { KoaValidator, Rule } = require('./koa-validator')
const User = require('@models/user')

// 用户注册验证
class RegisterValidator extends KoaValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '邮箱格式错误')
    ]
    
    this.password = [
      new Rule('isLength', '密码最小6个字符，最大32个字符', {
        min: 6, max: 32
      }),
      new Rule('matches', '密码必须是数字和字母', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password
    
    this.nickname = [
      new Rule('isLength', '昵称最小4位，最大32位', {
        min: 4, max: 32
      })
    ]
  }
  
  validatePassword (ctx) {
    const { password, password2 } = ctx.body
    if (password !== password2) {
      throw new Error('两个密码不一致')
    }
  }
  
  async validateEmail (ctx) {
    const {email} = ctx.body
    const user = await User.findOne({
      where: {
        email, // id: 23
      }
    })
    
    if (user) {
      throw new Error('email已存在')
    }
  }
}

module.exports = RegisterValidator
