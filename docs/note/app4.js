const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa() // 应用程序对象 中间件

// 1 自动注册路由
const requireDirectory = require('require-directory')
// 1 自动加载全部路由
requireDirectory(module, '../src/router/api', {
  visit: autoLoad
})

function autoLoad(route) {
  if (route instanceof Router) {
    app.use(route.routes())
  }
}

app.listen(3000)
