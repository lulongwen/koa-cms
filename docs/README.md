# koa2 打造服务端 CMS

> Author: 卢珑文 <br>
> Email: lulongwen@live.com <br>
> Wechat: 18915972355 <br>
> Website: www.lulongwen.com <br>
> Github: www.github.com/lulongwen <br>

![卢珑文的 JavaScript 技术栈](assets/images/koa-cms.jpg)


## 1 KOA-CMS 技术栈

> KOA-CMS 前后端分离的 Content Management System；独立完成一个项目，自己完整的开发一个前后端项目

1. nodejs + npm + Koa + ES9 + Babel + Typescript + JWT

2. mysql + sequelize + redis + navicat + RestFul API

3. 微信开发者工具 + PostMan + nodemon + pm2
4. 服务器部署
5. 系统设计，分层思路，接口设计思路
    - 渐进式开发，在已有功能上开发新功能，不是一步到位
    - 设计，抽离，分层
    - 如何设计 server 端架构，API 和路由，数据模型设计
    - 模板路由和 API设计

```bash
    npm i axios lodash npm-check require-directory validator sequelize
    npm i basic-auth jsonwebtoken mysql2 bcryptjs
    npm i koa-router koa-static koa-bodyparser
```

### KOA-CMS技术点

1. validator 参数校验
    - 每个请求都有一个唯一的 validator
    - Validator中间件来构建验证层
    
2. 全局异常处理中间件
    - http错误状态码
    
3. 路由自动注册 `require-directory`
    - 路由按照主题拆分；主题划分是渐进式，先找出核心主题
    - `app.js入口`导入子模块；子模块不应该调用入口文件；分层次，上层调用下层
    
4. Sequelize & Mysql
    - 服务端开发你是绕不过 mysql的
5. Web分层结构
    - model service logic
6. RestFul
    - web开发不考虑状态
    - 权限中间件
    - 设计框架的 hooks

### 安全

1. 身份验证 httpbasicAuth
2. bcryptjs 密码加密
3. XSS
4. 真正的权限控制还是服务端，前端只是辅助展示




## 2 KOA-CMS 目录结构

```tree
    app CMS系统代码
    src 业务代码
```
2. CMS规范
3. 配置
    权限管理
4. 行为日志
5. 校验器
6. 令牌
8. 单元测试




## 3 为什么开发 KOA-CMS

1. CMS是前后端一体化的解决方案；是一个系统不可或缺的组成部分
    - 开发大多数都是操作和管理数据，然后展示界面，拒绝重复劳动，框架解决
    - 技术的积累和进阶，拒绝搬砖
    
2. 移动端主要浏览和展示数据，web端录入和管理数据，生产数据
    - 移动端数据录入的难度很大，需要放到 web端来做
    - web生产数据，多端展示数据

3. `PHP CMS` 基于模板渲染的架构，不能适应前后端分离
    - 服务端模板语言生成，增加开发的复杂度和学习成本
    - 技术的边界和范围

4. SPA适合做中后台管理系统开发，不需要 SEO
    - SEO需要 SSR服务端渲染
    - SPA开发 CMS 用户体验好

6. 如何做好一个产品
    - 商业性的项目才能驱动进步；做出有人用的产品，做出高质量的成品项目
    - 选择小而美的公司，技术的提升，必须有复杂的业务驱动
    - 以解决问题为目标，懂得取舍，卖东西都说自己的好
    
    


### eggjs缺点

1. `eggjs` 给出的是一个企业级别的框架，是一个宏大的架子，怎么写代码并没有限定，例如：
    - 没有给出像ThinkPHP、SpringBoot、Flask框架中那些及其有用工具类、校验器、DAO操作；
    - 针对 API优化的异常处理
    - ORM层也没有给出范例代码

2. `eggjs` 不是为了打造好用的框架，解决的问题是在企业级别的角度
3. `eggjs` 丢失了很多细节，web框架都必备的，比如验证层，验证器，egg是没有的
    - 数据层 DAO，egg框架并没有一个解决方案，还需要自己来完成
    - 比如：安全方面的校验   
    
    


### 前端进阶提升

1. 接受即成的事实

2. 我并不认为我的能力和编程水平，学习能力比大厂的人差在哪里

3. 我还能做很多事情，未来有很大的进步空间
    
    - 能力不断提升，更多的职责，与人沟通做管理，亲自动手和实践
    
4. 综合素质：交流，管理，认知，学习，任务规划

5. 培养一个兴趣：摄影，写作，画画

6. 前后端分离缺点：削弱了技能的进阶，扼杀了成长，必须要进阶服务端
    - 掌握服务端，统领全局
    - 拒绝原地打转，玩溜一个技术栈，比如 vue

7. 自我解决问题，寻找答案的思考过程

    


### 陈述做过的项目

1. 你需要用尽可能简练的文字来描述项目的背景
2. 你在项目中承担的角色、参与项目的时长
3. 你用到的技术，以及你在项目中亮点等信息
4. 善于归纳，一针见血地发现问题或把一个问题说清楚
