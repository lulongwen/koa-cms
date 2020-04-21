// 1 把所有的 已知错误封装成 HttpException，只是一个基类，还可以继续定义子类
// 继承 Error是为了 throw error 抛出错误
class ApiException extends Error {
  constructor({message='服务器在忙', errorCode= 10000, status=500}) {
    super()
    this.errorCode = errorCode
    this.status = status
    this.message = message
  }
}

// 404
class NotFound extends ApiException {
  constructor() {
    super()
    this.message = '资源未找到'
    this.errorCode = 40004
    this.status = 404
  }
}

// 授权失败
class AuthFailed extends ApiException {
  constructor() {
    super()
    this.message = '授权失败'
    this.errorCode = 40001
    this.status = 401
  }
}

module.exports = {
  NotFound,
  AuthFailed
}
