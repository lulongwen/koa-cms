/**
 * 全局异常捕获，不需要单独在函数调用链中使用 try catch捕获异常
 * 可以监听到 函数调用链上的任何异常，并且把所有的错误逻辑集中处理
 * AOP 面向切片编程
 * @param ctx 上下文环境
 * @param next 下一个中间件函数
 * @returns {Promise<void>}
 */

const {
  HttpException,
  NotFoundException
} = require('@exception')


const catchError = async (ctx, next) => {
  try {
    await next() // 没有错误，直接 next
    if (ctx.status === 404) {
      throw new NotFoundException()
    }
  }catch(e) {
    const isHttpException = e instanceof HttpException
    let env = 'dev' // global.config.env === 'dev'
    if (env === 'dev' && !isHttpException) {
      throw e
    }
    console.log('error global', e)
    
    // 已知异常 & 未知异常 500
    const { message, code, status } = isHttpException ? e : new HttpException()
    
    ctx.body = {
      message,
      code,
      url: `${ctx.method} ${ctx.path}`
    }
    ctx.status = status
  }
}

module.exports = catchError
