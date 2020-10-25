const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})

const Auth = require('@middleware/auth')
const Flow = require('@models/flow')
const Art = require('@models/classic')
const Favor = require('@models/favor')

const {
  ClassicValidator,
  PositiveIntegerValidator
} = require('@validator')


// new Auth(9).verifyToken 权限不足
router.get('/latest',
  new Auth().BearerToken,
  async ctx => {
    ctx.body = await Flow.getLatest(ctx.auth.uid)
})


// 上一期
router.get('/:index/prev',
  new Auth().BearerToken,
  async ctx => _getData(ctx, -1)
)


// 下一期
router.get('/:index/next',
  new Auth().BearerToken,
  async ctx => _getData(ctx, 1)
)

// 喜欢的期刊
router.get('/:type/:id/favor',
  new Auth().BearerToken,
  async ctx => {
    const params = await new ClassicValidator().validate(ctx)
    const { id, type } = params.get('path') // url 参数用 path
    
    const data = await Art.getDetail(id, type, ctx.auth.uid)
    
    const {like_status, fav_nums} = data.dataValues
    ctx.body = {
      fav_nums,
      like_status
    }
  }
)

// 喜欢的期刊的详细信息
router.get('/:type/:id/detail',
  new Auth().BearerToken,
  async ctx => {
    const params = await new LikeValidator().validate(ctx)
    const { id, type } = params.get('path')
  
    ctx.body = await Art.getDetail(id, type, ctx.auth.uid)
  }
)


// 喜欢的期刊列表
router.get('/favor',
  new Auth().BearerToken,
  async ctx => {
    ctx.body = await Favor.getFavor(ctx.auth.uid)
  }
)


async function _getData (ctx, value) {
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
