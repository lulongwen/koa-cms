const {
  Model, sequelize, Op,
  Sequelize: { INTEGER }
} = require('./db')

const Art = require('@models/art')

const {
  LikeException,
  UnlikeException,
  NotFoundException
} = require('@exception')

// 业务表
class Favor extends Model {
  
  // 一个 like要操作 2张表；事务-保持2张表的一致性
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
  
  // 不喜欢
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
  
  static async likeStatus ({ art_id, type, uid }) {
    const favor = await this.findOne({
      where: {
        art_id, type, uid
      }
    })
    
    return !!favor
  }
  
  // 喜欢的列表
  static async myFavor (uid) {
    const favor = await this.findAll({
      where: {
        uid,
        type: { [Op.not]: 400 } // Op.not 排除
      }
    })
    
    if(!favor) {
      throw new NotFoundException('没有找到喜欢的资料')
    }
  
    // favor记录基本信息, 根据 favor-id-type去实体表查询具体信息
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
