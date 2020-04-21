require('module-alias/register') // 引入别名
// require('@/app/models/user') // 不引用不会执行模型，会自动创建数据库

const Koa = require('koa')
const app = new Koa() // 应用程序对象中间件

const { catchError } = require('@exception') // 全局异常处理

// 获取 http body参数
const parser = require('koa-bodyparser')
app.use(parser())
app.use(catchError)

const APP = require('./app/index.js')
APP.init(app)

app.listen(3000)
