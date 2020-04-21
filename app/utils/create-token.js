const jwt = require('jsonwebtoken')

const {security} = require('@config/config')


const createToken = (uid, scope) => {
  let {secretKey, expiresIn} = security
  // 生成token
  return jwt.sign({uid, scope},
    secretKey, {
    expiresIn
  })
}

module.exports = createToken
