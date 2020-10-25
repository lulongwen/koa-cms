// KOAValidator 验证返回的参数
{
  data: {
    body: {
      phone: '18915972355',
      nickname: 'luc88',
      password: '123456abc',
      password2: '123456abc',
      email: 'lucy@live.com'
    },
    query: {},
    path: {},
    header: {
      'content-type': 'application/json',
      'user-agent': 'PostmanRuntime/7.24.1',
      accept: '*/*',
      'cache-control': 'no-cache',
      'postman-token': 'b648e7b4-5109-45a1-92a7-73c22c41651c',
      host: 'localhost:3000',
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
      'content-length': '133'
    }
  },
  parsed: {
    body: {
      phone: '18915972355',
      nickname: 'luc88',
      password: '123456abc',
      password2: '123456abc',
      email: 'lucy@live.com'
    },
    query: {},
    path: {},
    header: {
      'content-type': 'application/json',
      'user-agent': 'PostmanRuntime/7.24.1',
      accept: '*/*',
      'cache-control': 'no-cache',
      'postman-token': 'b648e7b4-5109-45a1-92a7-73c22c41651c',
      host: 'localhost:3000',
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
      'content-length': '133'
    }
  },
  email: [ Rule { name: 'isEmail', msg: '邮箱格式错误', params: [] } ],
  password: [
    Rule { name: 'isLength', msg: '密码最小6个字符，最大32个字符', params: [Array] },
    Rule { name: 'matches', msg: '密码必须是数字和字母', params: [Array] }
  ],
  password2: [
    Rule { name: 'isLength', msg: '密码最小6个字符，最大32个字符', params: [Array] },
    Rule { name: 'matches', msg: '密码必须是数字和字母', params: [Array] }
  ],
  nickname: [ Rule { name: 'isLength', msg: '昵称最小4位，最大32位', params: [Array] } ],
  alias: {}
}
