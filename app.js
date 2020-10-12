require('module-alias/register') // 引入别名

const Koa = require('koa')
const app = new Koa() // 应用程序对象中间件

const middleware = require('@middleware')
const APP = require('./app/index.js')

middleware(app)
APP.init(app)
app.listen(3000)
