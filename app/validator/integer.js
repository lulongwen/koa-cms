// 验证器就像守卫，对参数进行校验
const { KoaValidator, Rule } = require('./koa-validator')
const { CLASSIC_TYPE } = require('@config/dict.config')

// URL ID 正整数验证
class PositiveIntegerValidator extends KoaValidator {
  constructor () {
    super()
    this.id = [
      new Rule('isInt', '值必须大于零', {min: 1})
    ]
  }
}

// 1 对 art_id进行验证，继承 id验证；2 type 类型验证
class ClassicValidator extends PositiveIntegerValidator {
  constructor() {
    super()
  }
  
  validateClassicType (ctx) {
    let type = ctx.body.type || ctx.path.type
    if (!type) {
      throw new Error('type 参数必填')
    }
    
    type = parseInt(type)
    const status = Object.values(CLASSIC_TYPE).includes(type)
    if (!status) {
      throw new Error('type参数错误')
    }
  }
}

// 评论校验
class AddComment extends PositiveIntegerValidator {
  constructor() {
    super()
    this.content = [
      new Rule('isLength', '评论字符 2-24个', {
        min: 2, max: 24
      })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  ClassicValidator,
  AddComment
}
