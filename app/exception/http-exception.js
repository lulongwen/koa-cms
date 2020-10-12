/**
 * 把所有的 已知错误封装成 HttpException，只是一个基类，还可以继续定义子类
 * HttpException extends Error 是为了 throw error 抛出错误
 * HttpException 默认 500 serverError
 */

const {
  success,
  notFound,
  forbidden,
  authFailed
} = require('./code-exception')

const error = {
  code: 1005,
  message: '服务器在忙',
  status: 500
}

// 500 默认
class HttpException extends Error {
  constructor(code= error.code, message=error.message, status=error.status) {
    super()
    this.status = status
    this.code = code
    this.message = message
  }
}

// 200 抛错方式返回成功
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

module.exports = {
  HttpException,
  SuccessException,
  AuthFailedException,
  ForbiddenException,
  NotFoundException
}
