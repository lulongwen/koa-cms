const sequelize = require('./index')

// 测试连接
sequelize.authenticate()
  .then(() => {
    console.log('connect ok')
  })
  .catch(err => {
    console.log('connect error')
  })


// 不需要编写sql语句， sequelize模型会自动创建sql
// sequelize.sync({ // 执行同步
//   force: false // true 删除表重新创建，会删除数据库，不要用
// })
