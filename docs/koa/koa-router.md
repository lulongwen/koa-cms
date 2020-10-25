# koa-router

2. @koa/router文档 https://github.com/koajs/router/blob/master/API.md
2. `koa-router` 路由拆分；按模块，按版本
2. 路由的自动注册
   2. https://www.npmjs.com/package/require-directory
   2. 默认 module.exports = router
   2. 优化兼容：module.exports = { router1, router2 }



安装 router 

```bash
npm i @koa/router

yarn add @koa/router

// 不推荐使用
npm i koa-router
```







## koa-router基础

1. next 是下一个中间件
2. ctx 上下文
3. koa中间件，return 无效，返回值必须在 ctx.body上；koa是中间件编程



一个简单的路由中间件

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// index.html
router.get('/', (ctx, next) => {
  ctx.body = '<h1>index.html</h1>'
})

router.get('/api/list', (ctx, next) => {
	ctx.body = { method: ctx.method, path: ctx.path }
})

app.use(router.routes()) // 注册路由
app.listen(3000)
```





### koa中间件

```js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(ctx.path, ctx.method)
  
  if (ctx.path === '/list/next' && ctx.method === 'GET') {
    ctx.body = {method: ctx.method, path: ctx.path}
  }
})
```



### router.all

```js
router.get

router.post

router.delete

router.put
```







## 多router路由拆分

> 分层思维，按主题和模块，划分路由 <br>
>
> 用 model来对应主题



1. 路由**主题和模块**划分，将路由抽离为中间件
    - 对不同模块的路由进一步拆分，还要考虑新旧版本路由的兼容问题
    - 不要把所有路由都放在一个文件里 `router.js`
    - 把所有路由放在一个文件里，不利于维护和扩展，不是好的实践
    
2. `koa-router` 不要放在入口的 `app.js`里面，造成代码臃肿
    - `app.js` 不应该写太多的代码

3. 模块化的方式存放，一个路由对应一个文件，方便维护开发
    - 所有的路由都导出，例如： `module.exports = user`
    - `app.js` 入口文件配置自动注册路由
4. v1, v2, v3 多个版本的路由

```jsx
/api
	/v1
		/user.js
	/v2
		/list.js
```



/api/v1/test.js

```js
const Router = require('@koa/router')
const router = new Router({
  prefix: '/v1' // 优化 router.get('/v1/test'）
})

router.get('/test', async (ctx, next) => {
  // 接收的参数
  let { query, headers, body } = ctx.request
  ctx.body = {
    method: ctx.method,
    path: ctx.path
  }
})

module.exports = router
```



app.js  注册路由，看下面的自动注册路由

```jsx
const test = require('./app/api/v1/test.js')
app.use(test.routes())
```







## 路由自动加载

1. `npm i require-directory`
2. 自动获取指定目录下所有文件导出的 `module`, 包括嵌套的目录
    - 默认扁平化不嵌套，如果嵌套还要做判断
    - 优化 `module.exports = user`，`module.exports = { user }`
    - 要判断当前导出的是不是路由，不是路由会报错
3. `requireDirectory(module, './api')` 检索 `./api` 下每一个文件导出的 `module`, 
4. 每导入一个 `module`, 都会执行 whenLoadModule 函数, 并且将导出的 `module.exports` 作为参数传给这个函数 

```js
const Router = require('koa-router')
const requireDirectory = require('require-directory')

// 1 导入那个路径下的路由，根目录下的 /api
const routes = requireDirectory(module, './api')
const {v1, v2} = routes

// 2 注册路由前判断是不是路由
for (let r in v1) {
  if (v1[r] instanceof Router) {
    app.use(v1[r].routes())
  }
}

// 2 高级用法，每当导入一个模块，就会调用 visit回调函数
requireDirectory(module, './api', {
  visit: autoLoad
})
function autoLoad(route) {
  // 要判断是不是路由，嵌套路由的注册
  if (route instanceof Router) {
    app.use(route.routes())
  }
}
```



### path

```jsx
process.cwd() // 根目录 /Users/lulongwen/Applications/node/koa-cms

const path = `${process.cwd()}/app/api`
```







### 导出路由格式

1. 约定规范：路由导出格式
    - 直接导出 `module.exports = user`
    - 对象形式 `module.exports = { user }`
2. 处理嵌套路由






### 异常路由

1. 路由异常处理，放在所有路由的最后面，中间件是链式调用
2. 全局错误处理，放在最下面

```js
app.use(404)
app.use(error)
```
