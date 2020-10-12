# toJSON 参数序列化

1. sequelize  scope
2. class 类 toJSON
3. Model.prototype.toJSON

## toJSON

```js
const obj = {
  name:'7yue',
    age:18,
    toJSON: function(){
      return {
        name1:'8yue'
      }
    }
}
JSON.stringify(obj)
```
	

## Model.prototype.toJSON 序列化

1. sequelize 全局的序列化

```js
const {unset} = require('lodash')

Model.prototype.toJSON = function () {
  const { dataValues, exclude } = this
  let data = {...dataValues}
  
  if (data.image) {
    // 静态资源图片：添加绝对路径
    if (data.image.startsWith('http')) {
      data.image = config.host + data.image
    } 
  } 
  
  if (!Array.isArray(exclude)) {
    throw new ParameterException('exclude 必须是数组')
  }
  
  exclude.forEach(key => {
    unset(data, key) // 删除过滤的字段
  }) 
}


// Models/ class类 exclude 排除字段
const data = Favor.getData(id, type)
data.setDataValue('index', index)

data.exclude = ['updated_at', 'deleted_at', 'created_at']
ctx.body = data
```


2. class 类私有的 toJSON

```js
class Book extends Model {
  static async getBooks () {
    const book = await this.findAll({
      where: { type: 100 }
    })
    // ...展开对象报错 Converting circular structure to JSON
    const data = {...book}
  } 

  toJSON () {
    return {
      title: this.getDataValue('title'),
      content: this.getDataValue('content')
    } 
  } 
}
```


## 排除无效字段的方式
1 json序列化时排除这些字段
2 sql查找时 排除这些字段
3 手动删除查询的结果



