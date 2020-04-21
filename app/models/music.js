// sequelize导入 { sequelize:db } 冒号别名
const { Sequelize, Model, sequelize } = require('./db')

// 定义一个模型
class Music extends Model {

}

// init 代替 sequelize.define 定义字段
// 后续添加新字段不会自动创建，1删除表重启项目
Music.init({
  // 主键不能为空，不能重复，主键 数字id，查询高于字符串，不能是随机字符串 UUID
  // 自增 id容易猜到用户编号，接口保护：权限，token
  
  // 不设置 id会自动创建 主键为 id属性
  // id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  nickname: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: Sequelize.STRING,
  openid: { // 多种限制条件，用对象
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize, // sequelize 实例
  tableName: 'music' // 不写会自动创建大驼峰命名
})

module.exports = { Music }
