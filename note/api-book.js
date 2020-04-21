const Router = require('koa-router')
const router = new Router()

const utils = require('@utils') // alias
const {ParameterException} = require('@exception')

router.post('/v1/:id/book/latest', (ctx, next) => {
  // 获取 url参数
  // let { query, headers, body } = ctx.request
  // let path = ctx.params
  
  // 异常返回格式，优化：class类封装
  if (true) {
    throw new ParameterException() // 默认参数
    
    // throw new HttpException({
    //   message: 'busying', errorCode: 1002, status: 401
    // })
    
    // const error = new Error('你那么美')
    // error.code = 10000
    // error.status = 403
    // error.requestUrl = `${ctx.method} ${ctx.path}` 放到中间件里面获取
  }
  
  // ctx.body = {
  //   utils,
  //   key: Object.keys(ctx),
  //   query,
  //   path,
  //   headers,
  //   body
  // }
  // 抛出异常 ctx.body 不会执行
  // throw new Error('API exception')
})

module.exports = router
