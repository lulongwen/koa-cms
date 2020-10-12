# sequelize

1. 数据表，用JS中的模型代替，class或对象
2. 一条用 JS中的一个对象
3. 多条记录用数组代替
4. sql语句，用对象方法代替
1. ORM 对象关系映射 Object Relational Mapping
2. Sequelize 以ORM的方式操作MySQL



```bash
npm install sequelize sequelize-cli

npx sequelize-cli init

/models/index.js
```







## ORM

1. ORM

2. nodejs中集成 sequelize








## 1 sequelize 总结

避免for循环查询数据库
Op.in  in查询避免循环查询数据库

group分组查询
Model中禁止使用构造函数 constructor




## 1 Sequelize的坑

1. models 定义的 class类不能使用 构造函数 `constructor`
    - `new class`会创建对象，导致写库时的 id是个对象，而不是数字报错

2. scope 事务

链接 mysql
1. 安装 mysql2驱动
node-application - ORM sequelize - 驱动 mysql2 - mysql

操作数据库，依赖模型 models/user


## 数据搬家 migration




## 返回数据的细节

this.dataValues 不受 get方法的影响，存储的是 原始的值
循环导入优化：
	模块的导入，变成函数内部的局部导入


## 数据查询

循环查询数据库是危险的行为
	查询不可控，把不可控的查询次数，变为可控的查询
	in 查询 id 数组 [10, 20, 30]

group 分组
	Sequelize.fn('SUM', 'score') 求和，对 score
	
	
## 参考资料
https://blog.csdn.net/yaodong379/article/details/97621301
