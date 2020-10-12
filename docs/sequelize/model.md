# Model constructor隐藏的坑

1. Model 内的 class 不要写 `constructor`
    - id 是个对象，导致写库报错
    - `constructor` 只会显示有 `defaultValue` 值的字段，其他字段不显示

```js
class Book extends Model {
  constructor (id) { 
    super()
    this.id = id
  }
  // model 里面不能使用构造函数；写库时 id是个对象，不是个整型，会报错
}

// constructor find结果只会显示 nums字段
Book.init({
  id: Sequelize.INTEGER,
  content: Sequelize.STRING(12),
  nums: { 
    type: Sequelize.INTEGER,
    defaultValue: 0
  } 
}, {
  sequelize,
  tableName: 'book'
})
```

2. 自动创建数据库
    - `require('@/app/models/user')` 不引用不会执行模型，会自动创建数据库

