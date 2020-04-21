const bcrypt = require('bcryptjs')

const {
  Model, Sequelize, sequelize
} = require('./db')

const {
  NotFoundException,
  AuthFailedException
} = require('@exception')


// 定义一个模型
class User extends Model {
  static async verifyEmailPassword (email, password) {
    const user = await this.findOne({
      where: { email }
    })
    
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new AuthFailedException('密码错误')
    }
    return user
  }
  
  // 查询 openid
  static async getUserByOpenid (openid) {
    const user = await this.findOne({
      where: { openid }
    })
    return user
  }
  
  static async registerByOpenid (openid) {
    const user = await this.create({
      openid
    })
    return user
  }
}

// init 代替 sequelize.define 定义字段
// 后续添加新字段不会自动创建，1删除表重启项目
User.init({
  // 主键不能为空，不能重复，主键 数字id，查询高于字符串，不能是随机字符串 UUID
  // 自增 id容易猜到用户编号，接口保护：权限，token
  // 不设置 id会自动创建 主键为 id属性
  // id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  
  nickname: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING(120),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set (val) {
      // model的属性操作
      const salt = bcrypt.genSaltSync(10)
      const psd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psd)
    }
  },
  openid: { // 多种限制条件，用对象
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize, // sequelize 实例
  tableName: 'user' // 不写会自动创建大驼峰命名
})

// 页面不引用 user.js 是无法执行的; require('./user.js') 会执行文件
// 所有的 Sequelize操作都是异步的，解决验证的方法：加上 await
module.exports = User
