// Exception 错误信息
const codeException = {
  success: {
    code: 0, // 0 成功
    message: 'ok',
    status: 201
  },
  notFound: {
    code: 1000,
    message: '资源未找到',
    status: 404
  },
  forbidden: {
    code: 1003,
    message: '禁止访问',
    status: 403
  },
  authFailed: {
    code: 1001,
    message: '授权失败',
    status: 401
  },
  likeError: {
    code: 6001,
    message: '你已经点赞过',
    status: 400
  },
  unlikeError: {
    code: 6002,
    message: '你已取消点赞',
    status: 400
  },
  parameter: {
    code: 1000, // 错误码
    message: '参数错误', // 错误信息
    status: 400 // http 状态码
  }
}

module.exports = codeException
