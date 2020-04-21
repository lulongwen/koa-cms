'use strict'
const {resolve} = require('path')

// webstorm alias 别名配置
module.exports = {
  // context: resolve('./'),
  resolve: {
    extensions: ['.js', '.json', '.ejs'],
    alias: {
      "@": resolve('./'),
      "@app": resolve('app'),
      "@src": resolve('src'),
      "@config": resolve('config'),
      "@models": resolve("app/models"),
      "@middleware": resolve("app/middleware"),
      "@validator": resolve("app/validator/index.js"),
      "@exception": resolve("app/exception/index.js"),
      "@utils": resolve("app/utils/index.js"),
      "@api": resolve("src/api")
    }
  }
}
