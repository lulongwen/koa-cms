const RegisterValidator = require('./register')

const {
  TokenValidator,
  RequiredTokenValidator
} = require('./token')

const {
  ClassicValidator,
  PositiveIntegerValidator,
  AddComment
} = require('./integer')

const SearchValidator = require('./search')


module.exports = {
  ClassicValidator,
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  RequiredTokenValidator,
  SearchValidator,
  AddComment
}
