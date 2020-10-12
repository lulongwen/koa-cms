const {
  Model,
  Sequelize: { INTEGER }
} = require('sequelize')

// const axios = require('axios')

const sequelize = require('../sequelize')

const Favor = require('@models/favor')


// 定义一个模型
class Book extends Model {
  
  static getDetail (id) {
    // const data = await axios.get(url)
    return {
      "author":[
        "[美]保罗·格雷厄姆"
      ],
      "binding":"平装",
      "category":"编程",
      "id":7,
      "image":"https://img3.doubanio.com/lpic/s4669554.jpg",
      "isbn":"9787115249494",
      "pages":"264",
      "price":"49.00元",
      "pubdate":"2011-4",
      "publisher":"人民邮电出版社",
      "subtitle":"硅谷创业之父Paul Graham文集",
      "summary":"本书是硅谷创业之父Paul Graham 的文集，主要介绍黑客即优秀程序员的爱好和动机，讨论黑客成长、黑客对世界的贡献以及编程语言和黑客工作方法等所有对计算机时代感兴趣的人的一些话题。书中的内容不但有助于了解计算机编程的本质、互联网行业的规则，还会帮助读者了解我们这个时代，迫使读者独立思考。\n本书适合所有程序员和互联网创业者，也适合一切对计算机行业感兴趣的读者。",
      "title":"黑客与画家"
    }
  }
  
  static search ({ q, start, count, summary = 1 }) {
    console.log(q, start, count, 'search')
    // const data = await axios.get(url)
    return {
      book: ['前端架构', 'UI设计']
    }
  }
  
  static async getFavorCount (uid) {
    // 只求数量
    const count = await Favor.count({
      where: {
        uid,
        type: 400
      }
    })
    return count
  }
}

const attributes = {
  id: {
    type: INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: INTEGER,
    defaultValue: 0
  }
}

Book.init(attributes, {
  sequelize,
  tableName: 'book'
})


/*
外键关联 Blog.userId -> User.id
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  foreignKey: 'userId'
})
*/

module.exports = Book
