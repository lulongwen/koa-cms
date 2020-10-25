/**
 * User: lulongwen
 * Date: 2020/10/25 17:30
 * Description:
 */
const nunjucks = require('koa-nunjucks-2')
// const { viewPath } = require('@config/config')

const nunjucksPath = nunjucks({
  ext: 'html', // 使用HTML后缀的模板
  path: `${process.cwd()}/src/views`,// 模板所在路径
  nunjucksConfig: {
    trimBlocks: true // 开启转义 防Xss
  }
})

module.exports = nunjucksPath
