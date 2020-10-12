# ejs

1. `yarn add koa-views ejs`
2. 使用 ejs、pug 模板引擎，直接使用 `koa-views` 进行模板加载即可
3. 使用 render 的时候，需要进行异步文件模板读取，因此 `ctx.render` 需要使用 `await`

```jsx
const app= require('koa')();
const koaViews= require('koa-views');
const path = require('path');

// 指定 ejs的模板目录
app.use(koaViews(path.join(__dirname, './view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  const title = "postbird";
  await ctx.render('index', {
    title
  })
})

app.listen(3000)
```
