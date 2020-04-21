const {
  HttpException,
  ParameterException,
  SuccessException,
  AuthFailedException,
  ForbiddenException,
  NotFoundException,
  LikeException,
  UnlikeException
} = require('./http-exception')

// 全局异常捕获，不需要再函数调用链中使用 try catch
// 可以监听到 函数调用链上的任何异常，并且把所有的错误逻辑集中处理 AOP 面向切片编程
const catchError = async (ctx, next) => {
  try {
    await next() // 没有错误，直接 next
    if (ctx.status === 404) {
      throw new NotFoundException()
    }
  }catch(e) {
    let isHttpException = e instanceof HttpException
    let env = 'dev' // global.config.env === 'dev'
    if (env === 'dev' && !isHttpException) {
      throw e
    }
    console.log('00000', e)

    // 已知异常 & 未知异常 500
    let { message, code, status } = isHttpException ? e : new HttpException()

    ctx.body = {
      message,
      code,
      url: `${ctx.method} ${ctx.path}`
    }
    ctx.status = status
  }
}


module.exports = {
  catchError,
  HttpException,
  ParameterException,
  SuccessException,
  AuthFailedException,
  ForbiddenException,
  NotFoundException,
  LikeException,
  UnlikeException
}
