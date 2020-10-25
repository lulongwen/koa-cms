/**
 * User: lulongwen
 * Date: 2020/10/13 22:17
 * Description:
 */
const router = require('@koa/router')()
// const router = require('koa-router')()

router.get('/', async (ctx) => {
  // 使用 ctx.render 可以通过 nunjucks 渲染页面
  await ctx.render('index/index', {
    title: 'koa-cms'
  })
})

router.get('/login', async (ctx) => {
  await ctx.render('login', {
    title: '登录页面'
  })
})

module.exports = router
