const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user' // 路由前缀；优化 router.get('/v1/user/register'）
})

const User = require('@models/user')
const { RegisterValidator } = require('@validator')
const { SuccessException } = require('@exception')

// 思维： 1 要接收的参数；2 参数校验；3 插入数据库
router.post('/register', async (ctx, next) => {
  // let {phone, email, password, nickname} = ctx.request.body
  // 所有的 Sequelize操作都是异步的，解决验证的方法：加上 await
  const params = await new RegisterValidator().validate(ctx)
  const {password, nickname, email, phone } = params.get('body')
  const user = {password, nickname, email, phone }
  
  await User.create(user)
  new SuccessException()
})

module.exports = router
