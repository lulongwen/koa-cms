// 验证器就像守卫，对参数进行校验
const { KoaValidator, Rule } = require('./koa-validator')
const { checkType } = require('./public')

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
class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.validateType = checkType
  }
}

module.exports = {
  PositiveIntegerValidator,
  LikeValidator
}
