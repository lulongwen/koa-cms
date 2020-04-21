const RegisterValidator = require('./register')

const {
  TokenValidator,
  RequiredTokenValidator
} = require('./token')

const {
  LikeValidator,
  PositiveIntegerValidator
} = require('./integer')


module.exports = {
  LikeValidator,
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  RequiredTokenValidator
}
