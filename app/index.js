const Router = require('@koa/router')
const requireDirectory = require('require-directory')

const path = `${process.cwd()}/restful`


class App {
  
  // 入口初始化
  static init (app) {
    this.app = app
    
    this.initRouter()
    // this.httpException()
  }
  
  // 路由的自动注册
  static initRouter () {
    // 自动加载全部路由 cwd 根目录
    requireDirectory(module, path, {
      visit: autoLoad
    })
    
    function autoLoad(route) {
      if (route instanceof Router) {
        // app.use()
        App.app.use(route.routes())
      }
    }
  }
  
  // 全局异常类，不推荐
  // static httpException () {
  //   global.exception = require('./exception')
  //   let error = new global.exception.NotfoundException()
  // }
}

module.exports = App
