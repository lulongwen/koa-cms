const { KoaValidator, Rule } = require('./koa-validator')

class SearchValidator extends KoaValidator {
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1, max: 20
      })
    ]
    
    this.start = [ // 分页起始
      new Rule('isInt', 'start 不符合规范', {
        min: 0, max: 50000
      }),
      new Rule('isOptional', '', 0)
    ]
    
    this.count = [ // 每页数量
      new Rule('isInt', 'count 不符合规范', {
        min: 1, max: 60
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = SearchValidator
