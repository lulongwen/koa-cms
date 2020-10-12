const {
  Model,
  Op,
  Sequelize: { INTEGER }
} = require('sequelize')

const sequelize = require('../sequelize')

const Art = require('@models/classic')

const {
  LikeException,
  UnlikeException,
  NotFoundException
} = require('@exception')

// 业务表
class Favor extends Model {
  
  // 点赞；一个 like要操作 2张表；事务-保持2张表的一致性
  static async like ({ art_id, type, uid }) {
    
    const favor = await this.findOne({
      where: {
        art_id, type, uid
      }
    })
    if (favor) {
      throw new LikeException()
    }
    
    // 开启事务必须 return返回事务
    return sequelize.transaction(async transaction => {
      await this.create({
        art_id, type, uid
      }, { transaction })
      
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', {
        by: 1,
        transaction
      })
    })
  }
  
  // 取消点赞
  static async unlike ({ art_id, type, uid }) {
    const favor = await this.findOne({
      where: {
        art_id, type, uid
      }
    })
    if (!favor) { // 如果不存在，就无法删除
      throw new UnlikeException()
    }
  
    // return返回事务
    return sequelize.transaction(async transaction => {
      await favor.destroy({
        // false 软删除，不会删除表，在 delete_at 添加时间戳，标记删除
        // true 直接删除表
        force: false,
        transaction
      })
    
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', {
        by: 1,
        transaction
      })
    })
  }
  
  // 点赞状态
  static async likeStatus ({ art_id, type, uid }) {
    const favor = await this.findOne({
      where: {
        art_id, type, uid
      }
    })
    return !!favor
  }
  
  // 点赞的 classic列表
  static async getFavor (uid) {
    const favor = await this.findAll({
      where: {
        uid,
        type: { [Op.not]: 400 } // Op.not 排除
      }
    })
    if(!favor) {
      throw new NotFoundException('没有找到喜欢的期刊')
    }

    // favor记录基本信息, 根据 favor 的 id-type去实体表查询具体信息
    return await Art.getAll(favor)
  }
  
  
  // 点赞的书籍
  static async getBookFavor ({ book_id, uid }) {
    const fav_nums = await Favor.count({
      where: {
        art_id: book_id,
        type: 400
      }
    })
    
    const favor = await Favor.findOne({
      where: {
        art_id: book_id,
        uid,
        type: 400
      }
    })
    
    return {
      fav_nums,
      like_status: favor ? 1: 0
    }
  }
}

const attributes = {
  uid: INTEGER,
  art_id: INTEGER,
  type: INTEGER
}

Favor.init(
  attributes, {
  sequelize, // sequelize 实例
  tableName: 'favor'
})

module.exports = Favor
