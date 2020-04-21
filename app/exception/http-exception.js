/**
 * 把所有的 已知错误封装成 HttpException，只是一个基类，还可以继续定义子类
 * HttpException extends Error 是为了 throw error 抛出错误
 * HttpException 默认 500 serverError
 */

const {
  parameter,
  success,
  notFound,
  forbidden,
  authFailed,
  serverError,
  likeError,
  unlikeError
} = require('./exception-code')

class HttpException extends Error {
  constructor(code=serverError.code, message=serverError.message, status=serverError.status) {
    super()
    this.status = status
    this.code = code
    this.message = message
  }
}

class ParameterException extends HttpException {
  constructor(message, code) {
    super()
    this.status = parameter.status
    this.code = code || parameter.code
    this.message = message || parameter.message
  }
}

// 抛错方式返回成功
class SuccessException extends HttpException {
  constructor(message, code) {
    super()
    this.status = success.status
    this.code = code || success.code
    this.message = message || success.message
  }
}

// 404
class NotFoundException extends HttpException {
  constructor(message, code) {
    super();
    this.status = notFound.status
    this.code = code || notFound.code
    this.message = message || notFound.message
  }
}

// 401
class AuthFailedException extends HttpException {
  constructor(message, code) {
    super()
    this.status = authFailed.status
    this.code = code || authFailed.code
    this.message = message || authFailed.message
  }
}

// 403
class ForbiddenException extends HttpException {
  constructor(message, code) {
    super()
    this.status = forbidden.status
    this.code = code || forbidden.code
    this.message = message || forbidden.message
  }
}

// 点赞
class LikeException extends HttpException {
  constructor(message, code) {
    super()
    this.status = likeError.status
    this.code = code || likeError.code
    this.message = message || likeError.message
  }
}

// 取消点赞
class UnlikeException extends HttpException {
  constructor(message, code) {
    super()
    this.status = unlikeError.status
    this.code = code || unlikeError.code
    this.message = message || unlikeError.message
  }
}

module.exports = {
  HttpException,
  ParameterException,
  SuccessException,
  AuthFailedException,
  ForbiddenException,
  NotFoundException,
  LikeException,
  UnlikeException
}
