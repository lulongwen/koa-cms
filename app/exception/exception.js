/**
 * 把所有的 已知错误封装成 HttpException，只是一个基类，还可以继续定义子类
 * HttpException extends Error 是为了 throw error 抛出错误
 * HttpException 默认 500 serverError
 */

const {
  HttpException
} = require('./http-exception')

const {
  parameter,
  likeError,
  unlikeError
} = require('./code-exception')


class ParameterException extends HttpException {
  constructor(message, code) {
    super()
    this.status = parameter.status
    this.code = code || parameter.code
    this.message = message || parameter.message
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
  ParameterException,
  LikeException,
  UnlikeException
}
