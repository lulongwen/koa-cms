const {
  Sequelize, Model
} = require('sequelize')

const {
  dbName, user, password, host, port
} = require('@config/db.config').db

// sequelize全局实例；Sequelize 4个参数
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 指定数据库类型 要安装 MySQL驱动 mysql2
  host,
  port,
  logging: true, // cli显示原始 sql语句
  timezone: '+08:00', // 设置时区
  define: {
    // timestamps: false, // 不会自动生成 createdAt updatedAt deleteAt
    paranoid: true,
    underscored: true, // 驼峰转下划线
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    scopes: {
      excludeTime: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }
})

// 不需要编写sql语句， sequelize模型会自动创建sql
// sequelize.sync({
//   force: false // true 删除表重新创建，会删除数据库，不要用
// })

module.exports = {
  Sequelize,
  Model,
  sequelize
}
