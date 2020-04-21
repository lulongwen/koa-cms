const { HttpException } = require('./HttpException')

// 全局异常捕获，不需要再函数调用链中使用 try catch
// 可以监听到 函数调用链上的任何异常，并且把所有的错误逻辑集中处理
// AOP 面向切片编程
const catchError1 = async (ctx, next) => {
  try {
    await next() // 没有错误，直接 next
  }catch(e) {
    // 有错误，返回给 body，error信息特别多，简化 error
    // 返回清晰明了的信息给前端
    ctx.body = { message: '服务器有点忙，你等会' }
  }
}

// 全局异常
const catchError2 = async (ctx, next) => {
  try {
    await next() // 没有错误，直接 next
  }catch(e) {
    if (e.errorCode) { // 是不是已知错误
      ctx.body = {
        message: e.message,
        errorCode: e.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
    }
    ctx.status = e.status
  }
}

const catchError = async (ctx, next) => {
  try {
    await next() // 没有错误，直接 next
  }catch(e) {
    // 已知异常
    if (e instanceof HttpException) {
      ctx.body = {
        message: e.message,
        errorCode: e.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = e.status
    }
    else { // 未知异常
      ctx.body = {
        message: 'missing taking error',
        errorCode: 999,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}


module.exports = {
  catchError,
  HttpException
}
