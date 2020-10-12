const {
  unset
} = require('lodash')

const {
  Model
} = require('sequelize')

const {
  host
} = require('@config/config')


// 自定义 JSON序列化
// book.exclude = ['created_at', 'index'] 最终的 api排除
// Book.prototype.exclude = ['created_at', 'index']

Model.prototype.toJSON = function () {
  let { dataValues, exclude } = this
  const data = {...dataValues}
  
  if (!Array.isArray(exclude)) {
    throw new Error('exclude 必须是数组')
  }
  
  exclude.forEach(key => {
    unset(data, key)
  })
  
  // 序列化 image 时判断 相对路径和绝对路径
  if (data.image) {
    if (data.image.startsWith('http')) return
    data.image = host + data.image
  }
  
  return data
}
