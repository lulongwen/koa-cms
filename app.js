// 引入 package.json 配置的别名
require('module-alias/register')

const Koa = require('koa')
const app = new Koa() // 应用程序对象中间件

// 中间件
const middleware = require('@middleware')
middleware(app)


const App = require('./app/index.js')
App.init(app)


// 后台路由
const router = require('./src/routes/index.js')
app.use(router.routes())


// 启动服务
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
