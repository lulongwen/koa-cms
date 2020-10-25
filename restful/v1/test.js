/**
 * User: lulongwen
 * Date: 2020/10/13 21:12
 * Description:
 */
const Router = require('@koa/router')
const router = new Router({
  prefix: '/v1' // 优化 router.get('/v1/test'）
})

router.get('/test', async (ctx, next) => {
  // 接收的参数
  let { query, headers, body } = ctx.request
  let path = ctx.params
  
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    status: 200,
  }
})

module.exports = router
