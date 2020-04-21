const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/like'
})

const {
  LikeValidator
} = require('@validator')

const {
  SuccessException
} = require('@exception')

const Auth = require('@middleware/auth')
const Favor = require('@models/favor')


// like
router.post('/',
  new Auth().BearerToken,
  async (ctx, next) => {
    const params = await new LikeValidator().validate(ctx, {
      id: 'art_id' // alias别名验证
    })
    const { art_id, type } = params.get('body')

    await Favor.like({ art_id, type, uid: ctx.auth.uid })
    throw new SuccessException()
})


// unlike
router.post('/cancel',
  new Auth().BearerToken,
  async (ctx, next) => {
    const params = await new LikeValidator().validate(ctx, {
      id: 'art_id'
    })
    const { art_id, type } = params.get('body')
    
    await Favor.unlike({ art_id, type, uid: ctx.auth.uid })
    throw new SuccessException()
  })

module.exports = router
