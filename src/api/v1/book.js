const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator } = require('@validator')
const {ParameterException} = require('@exception')


router.post('/v1/:id/book/latest', async (ctx, next) => {
  // 获取 url参数
  let { query, headers, body } = ctx.request
  let path = ctx.params
  
  const data = await new PositiveIntegerValidator().validate(ctx)
  // data.get('body', parsed=false) post参数
  console.log('value', data.get('path.id'))
  
  
  // class封装异常返回格式
  if (path.id !== '29') {
    throw new ParameterException() // 默认参数
  }

  ctx.body = {
    key: Object.keys(ctx),
    query,
    path,
    headers,
    body
  }
})

module.exports = router
