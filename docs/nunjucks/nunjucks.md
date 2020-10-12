# nunjucks

1. nunjucks 模板引擎，不需要安装 `koa-views`

   1. https://github.com/mozilla/nunjucks
   2. https://github.com/strawbrary/koa-nunjucks-2
   3. nunjucks模板语法文档 https://nunjucks.bootcss.com

2. `koa-nunjucks-2` 实例返回一个中间件，这个中间件会让**上下文获得一个渲染方法**

   1. 从渲染方法参数上获取传递的数据（其次从 `ctx.state` 获取），然后使用 nunjucks 渲染模板；
   2. 根据用户配置决定是否返回HTML页面

3. `koa-nunjucks-2` 的一个问题：

   1. `app.use(nunjucks({}))` 必须放在 `app.use(router.routes()).use(router.allowedMethods())` 前面

   2. 否则会报错 `ctx.render()` 不是一个 function

```bash
npm install nunjucks

npm install koa-nunjucks-2
```





```js
const koa = require('koa');
const app = new koa();
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');

app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

app.use(async (ctx) => {
  await ctx.render('home', {double: 'rainbow'});
});
```



异步文件读取，需要使用 await

```js
router.get('view', async (ctx) => {
  var food = {
    'ketchup': '5 tbsp',
    'mustard': '1 tbsp',
    'pickle': '0 tbsp'
  };
  await ctx.render('index',{title:'nunjucks',food});
})
```







## nunjucks原理

```js
const env = nunjucks.configure(config.path, config.nunjucksConfig);

env.renderAsync = bluebird.promisify(env.render);
```



```js
 return async (ctx, next) => {
    if (ctx[config.functionName]) {
      throw new Error(`ctx.${config.functionName} is already defined`);
    }

    /**
     * @param {string} view
     * @param {!Object=} context
     * @returns {string}
     */
    ctx[config.functionName] = async (view, context) => {
      const mergedContext = merge({}, ctx.state, context);

      view += config.ext;

      return env.renderAsync(view, mergedContext)
        .then((html) => {
          if (config.writeResponse) {
            ctx.type = 'html';
            ctx.body = html;
          }
        });
    };

    await next();
  };
```





在创建 koa-nunjucks-2 中间件时，可以传递文件后缀 `ext` ，渲染方法名 `functionName` ，以及 nunjucks 的配置信息 `nunjucksConfig` 等

```jsx
const express = require('express')
const app = express()

// req请求对象 ; res相应对象
app.get('/list', (req, res) => {

  const obj = {name: 'lucy'}
  res.json(obj)
})

app.listen(3000, () => {
  console.log('ok')
})


req.query // 获取 GET参数
req.method // 请求方式
req.path //

app.get()

app.post()

app.put()

无论使用哪种请求方式，服务端都能响应
app.all() // 忽略请求方式

app.all('*', (req, res) => {
  res.json({
    uri: req.path,
    method: req.method
  })
})

app.use() // 中间件，路由注册
```

































