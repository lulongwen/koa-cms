const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const Auth = require('@middleware/auth')
const Flow = require('@models/flow')
const Art = require('@models/art')
const Favor = require('@models/favor')

const {
  LikeValidator,
  PositiveIntegerValidator
} = require('@validator')

const {
  NotFoundException
} = require('@exception')


// new Auth(9).verifyToken 权限不足
router.get('/latest',
  new Auth().BearerToken,
  async ctx => {
    ctx.body = await Flow.getLatest(ctx.auth.uid)
})


// 上一期
router.get('/:index/prev',
  new Auth().BearerToken,
  async ctx => getData(ctx, -1)
)


// 下一期
router.get('/:index/next',
  new Auth().BearerToken,
  async ctx => getData(ctx, 1)
)

// 喜欢的类型
router.get('/:type/:id/favor',
  new Auth().BearerToken,
  async ctx => {
    const params = await new LikeValidator().validate(ctx)
    const { id, type } = params.get('path')
    
    const art = await Art.getData(id, type, false)
    if (!art) {
      throw new NotFoundException()
    }
    
    const like = await Favor.likeStatus({
      art_id: id, type, uid: ctx.auth.uid
    })
  
  }
)


// 喜欢的期刊列表


async function getData (ctx, value) {
  const params = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const {index} = await params.get('path')
  
  ctx.body = await Flow.prevNext({
    index: index + value,
    uid: ctx.auth.uid
  })
}


module.exports = router
