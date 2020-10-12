const {
  Model,
  Sequelize: {INTEGER, STRING}
} = require('sequelize')

const sequelize = require('../sequelize')


// 定义一个模型
class BookComment extends Model {
  
  static async addComment({book_id, content}) {
    const comment = await this.findOne({
      where: {
        book_id, content
      }
    })
    
    // 如果没有新增评论
    if (comment) {
      const data = await this.increment('nums', {
        by: 1
      })
      return data
    }
  
    const data = await this.create({
      book_id, content, nums: 1
    })
    return data
  }
  
  static async getComment(book_id) {
    const data = await this.findAll({
      where: {
        book_id
      }
    })
    return data
  }
  
  // toJSON() {
    // this.dataValues {...this.dataValues} 删除不要的字段
    // return {
    //   content: this.getDataValue('content'),
    //   nums: this.getDataValue('nums')
    // }
  // }
}


const attributes = {
  book_id: INTEGER,
  content: STRING(16),
  nums: {
    type: INTEGER,
    defaultValue: 0
  }
}

BookComment.init(attributes, {
  sequelize,
  tableName: 'book_comment'
})

module.exports = BookComment
