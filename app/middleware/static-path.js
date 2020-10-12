// 静态资源
const path = require('path')
const koaStatic = require('koa-static')

const staticPath = koaStatic(path.join(__dirname, '/public'))

module.exports = staticPath
