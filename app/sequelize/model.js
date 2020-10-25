/**
 * User: lulongwen
 * Date: 2020/10/24 12:20
 * Description:
 */
const { Sequelize } = require('sequelize')


const Blog = sequelize.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nickName: {
    type: Sequelize.TEXT,
    comment: '昵称',
  },
  // 自动创建 createdAt & updatedAt 字段
})

// 外键关联
Blog.belongsTo(User, {
  // 创建外键 Blog.userId = User.id
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  // 创建外键 Blog.userId = User.id
  foreignKey: 'userId'
})

module.exports = {
  Blog, User
}
