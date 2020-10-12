const {
  Model,
  Sequelize,
  Op
} = require('sequelize')

const sequelize = require('../sequelize')

const Favor = require('@models/favor')

// 定义一个模型
class BookHot extends Model {
  
  static async getAllBook () {
    // 查找热门书籍
    // 数据库不要用 for循环遍历查询，找到所有 id in查询
    const books = await this.findAll({
      order: ['index']
    })
    
    // 2 单个图书的点赞数量 group 分组求和
    const favors = await Favor.findAll({
      where: {
        art_id: { // 指定字段进行 in查询
          [Op.in]: books.map(item => item.id),
        },
        type: 400 // 指定类型
      },
      group: ['art_id'], // sql的分组
      attributes: [
        'art_id',
        [Sequelize.fn('COUNT', '*'), 'count']
      ]
    })
    
    return this._mergeBook(books, favors)
  }
  
  static _mergeBook (books, favors) {
    return books.map(book => {
      let find = favors.find(item => book.id === item.art_id)
      let count = find ? find.get('count') : 0
      
      book.setDataValue('fav_nums', count)
      // this.exclude = ['created_at', 'updated_at', 'deleted_at']
      return book
    })
  }
}

const { STRING, INTEGER } = Sequelize

const attributes = {
  index: INTEGER, // 排序用的
  title: STRING,
  author: STRING,
  image: STRING
}

BookHot.prototype.exclude = ['created_at', 'updated_at', 'deleted_at']

BookHot.init(attributes, {
  sequelize,
  tableName: 'book_hot'
})

module.exports = BookHot
