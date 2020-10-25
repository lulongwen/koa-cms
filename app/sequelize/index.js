const {
  Sequelize
} = require('sequelize')

const {
  dbName, user, password
} = require('@config/db.config').db

// const config = {
//   host: 'localhost', dialect: 'mysql'
// }

const table = require('./table')

// sequelize全局实例；Sequelize 4个参数
const sequelize = new Sequelize(dbName, user, password, table)

module.exports = sequelize
