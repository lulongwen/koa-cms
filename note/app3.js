const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa() // 应用程序对象 中间件

// 1 自动注册路由
const requireDirectory = require('require-directory')
const routes = requireDirectory(module, './api')
const {v1} = routes

// 2 注册路由前判断是不是路由
for (let r in v1) {
  if (v1[r] instanceof Router) {
    app.use(v1[r].routes())
  }
}

app.listen(3000)
