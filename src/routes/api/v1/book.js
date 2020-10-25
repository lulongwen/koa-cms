const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/book'
})

const Auth = require('@middleware/auth')
const Book = require('@models/book')
const BookHot = require('@models/book-hot')
const BookComment = require('@models/book-comment')
const Favor = require('@models/favor')

const {
  SuccessException
} = require('@exception')

const {
  PositiveIntegerValidator,
  SearchValidator,
  AddComment
} = require('@validator')


// 热门书籍
router.get('/book_hot', async (ctx, next) => {
  ctx.body = await BookHot.getAllBook()
})


// 书籍详情
router.get('/:book_id/detail', async (ctx, next) => {
  const params = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  const {book_id} = params.get('path')
  ctx.body = Book.getDetail(book_id)
})


// 书籍搜索
router.get('/search', async (ctx, next) => {
  const params = await new SearchValidator().validate(ctx)
  const { q, start, count } = params.get('query')
  
  ctx.body = Book.search({ q, start, count })
})


// 书籍添加评论
router.post('/add/book_comment',
  new Auth().BearerToken,
  async ctx => {
    const params = await new AddComment().validate(ctx, {
      id: 'book_id'
    })
    const { book_id, content } = params.get('body')
    
    await BookComment.addComment({ book_id, content })
    throw new SuccessException()
})


// 获取书籍评论
router.get('/:book_id/book_comment',
  new Auth().BearerToken,
  async ctx => {
    const params = await new PositiveIntegerValidator().validate(ctx, {
      id: 'book_id'
    })
    const { book_id } = params.get('path')
    
    const comments = await BookComment.getComment(book_id)
    ctx.body = {
      comments, book_id
    }
  }
)


// 点赞喜欢的书籍
router.get('/favor',
  new Auth().BearerToken,
  async ctx => {
    const count = await Book.getFavorCount(ctx.auth.uid)
    ctx.body = { count }
  }
)


// 根据 id找书籍是否点赞
router.get('/:book_id/favor',
  new Auth().BearerToken,
  async ctx => {
    const params = await new PositiveIntegerValidator().validate(ctx, {
      id: 'book_id'
    })
    const {book_id} = params.get('path')
  
    ctx.body = await Favor.getBookFavor({ book_id, uid: ctx.auth.uid })
  }
)


// 热门搜索：营销功能，花钱的热搜
router.get('/hot_keyword', async ctx => {
  ctx.body = {
    hot: ['Python', '金庸', '向往的岁月', 'Flutter', 'APP', '韩非子']
  }
})

module.exports = router
