const jwt = require('jsonwebtoken')

const {
  ForbiddenException
} = require('@exception')

const {
  security
} = require('@config/config')

const {
  authCode: { USER, ADMIN, SUPER_ADMIN }
} = require('@config/config')


class Auth {
  constructor (level=1) {
    this.level = level
    
    Auth.USER = USER
    Auth.ADMIN = ADMIN
    Auth.SUPER_ADMIN = SUPER_ADMIN
  }
  
  // 验证token
  static verifyToken (token) {
    try {
      const decode = jwt.verify(token, security.secretKey)
      const { uid, scope } = decode
      return !!(uid && scope)
    } catch (e) {
      return false
    }
  }

  // 获取token
  get BearerToken() {
    // 返回 token检测中间件函数
    return async (ctx, next) => {
      let errMsg = '无效的 Bearer Token'
      const {authorization} = ctx.request.header
      if (!authorization) {
        throw new ForbiddenException(errMsg)
      }
      
      let decode = {}
      try {
        const [, token] = authorization.split(' ')
        decode = jwt.verify(token, security.secretKey)
      }catch(e) {
        // token过期
        if (e.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        // 无效的 name=JsonWebTokenError
        throw new ForbiddenException(errMsg)
      }
  
      const {uid, scope} = decode
      if (scope < this.level) {
        throw new ForbiddenException('权限不足，请联系管理员')
      }
      
      ctx.auth = {
        uid, scope
      }
      await next()
    }
  }
}

module.exports = Auth
