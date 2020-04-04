const Router = require('koa-router')
const requireDirectory = require('require-directory')

// 自动加载全部路由
class App {
  // 入口的总称
  static init (app) {
    this.app = app
    this.initRouter()
  }
  
  static initRouter () {
    // 1 自动加载全部路由 cwd 根目录
    const path = `${process.cwd()}/src/router/api`
    requireDirectory(module, path, {
      visit: autoLoad
    })
    
    function autoLoad(route) {
      if (route instanceof Router) {
        App.app.use(route.routes())
      }
    }
  }
}

module.exports = App
