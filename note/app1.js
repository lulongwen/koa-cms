const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa() // 应用程序对象 中间件
const router = new Router()

router.get('/api/list', (ctx, next) => {
  ctx.body = {a: ['reduce', 'map', 'forEach'], b: 200, c: 300, d: 500} // 返回 json
})
// 注册路由 router 内部注册中间件
app.use(router.routes())


// 洋葱模型 ctx 上线文；next 下一个函数
// 先执行第一个函数，打印 10，然后执行 next，调用下一个函数，打印 30
// 然后 next 执行下一个函数，是啥未知，因为只定义了 2个函数？直接往下走，打印 50
// 第二个函数执行完了，回到第一个函数，执行 next() 下面的代码，打印 20

// app.use(async (ctx, next) => {
//   console.log(10)
//   await next() // next的返回结果一定是 promise，也可以 return new Promise
//   console.log('ctx', Object.keys(ctx), ctx)
//   if (ctx.path === '/api/list' && ctx.method === 'GET') {
//     // ctx.body = 'list.html' 返回字符串
//     ctx.body = {a: 100, b: 200, c: 300, d: 500} // 返回 json
//   }
// })


// 洋葱模型的执行顺序
app.use((ctx, next) => {
  console.log(100)
  next()
  console.log('ctx200', ctx.data)
})

app.use(async (ctx, next) => {
  console.log(300)
  let data = await axios.get('http://www.lulongwen.com')
  ctx.data = data
  next()
  console.log(400)
})


app.listen(3000)
