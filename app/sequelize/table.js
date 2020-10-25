const {
  host, port
} = require('@config/db.config').db

const table = {
  dialect: 'mysql', // 指定数据库类型 要安装 MySQL驱动 mysql2
  host,
  port,
  logging: true, // cli显示原始 sql语句
  timezone: '+08:00', // 设置时区
}


// define 定义字段
table.define = {
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


// 线上环境使用连接池
// table.pool = {
//   max: 5, // 连接池中最大的链接数量
//   min: 0,
//   idle: 10000 // 如果一个链接池 10s内没有被使用，就释放
// }

module.exports = table
