const Koa = require('koa')
const app = new Koa() // 应用程序对象 中间件

// 1 导入路由
const book = require('./api/v1/book')
const classic = require('./api/v1/classic')


// 2 注册路由 router 内部注册中间件
app.use(classic.routes())
app.use(book.routes())


app.listen(3000)
