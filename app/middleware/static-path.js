// const path = require('path')
const koaStatic = require('koa-static')

const staticPath = koaStatic(`${process.cwd()}/public`)

module.exports = staticPath
