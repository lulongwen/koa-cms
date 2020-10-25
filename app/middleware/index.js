// middleware
const parser = require('koa-bodyparser') // body参数
const catchError = require('./catch-error') // 全局异常处理
const staticPath = require('./static-path') // 静态资源
const nunjucks = require('./nunjucks')

module.exports = app => {
  app.use(staticPath)
  app.use(nunjucks)
  app.use(parser())
  app.use(catchError)
}
