const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})

const WxServer = require('@app/service/wechat')
const Auth = require('@middleware/auth')
const User = require('@models/user')
const { createToken } = require('@utils')

const {
  LOGIN_TYPE: { USER_EMAIL, USER_PHONE, USER_WECHAT }
} = require('@config/dict.config')

const {
  TokenValidator,
  RequiredTokenValidator
} = require('@validator')

const {
  ParameterException
} = require('@exception')


router.post('/', async ctx => {
  const params = await new TokenValidator().validate(ctx)
  const {
    type, account, secret
  } = params.get('body')
  let token
  
  // 根据不同的 type 做不同的处理
  switch (type) {
    case USER_PHONE:
      console.log('phone login', USER_PHONE)
      break;
    case USER_WECHAT:
      token = await WxServer.code2Token(account)
      break;
    case USER_EMAIL:
      token = await emailServer(account, secret)
      break;
    
    default:
      throw new ParameterException('没有对应的处理函数')
  }
  
  ctx.body = {
    token
  }
})

// 验证 token不能为空
router.post('/verify', async (ctx, next) => {
  const params = await new RequiredTokenValidator().validate(ctx)
  const {token} = params.get('body')
  
  const valid = Auth.verifyToken(token)
  
  console.log('verify', valid)
  ctx.body = { valid }
})

async function emailServer (account, password) {
  const user = await User.verifyEmailPassword(account, password)
  // 获取用户，生成令牌
  return createToken(user.id, 8)
}

module.exports = router
