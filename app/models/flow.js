const {
  Model,
  Sequelize: {
    INTEGER
  }
} = require('sequelize')

const sequelize = require('../sequelize')

const {
  NotFoundException
} = require('@exception')

const Art = require('@models/classic')
const Favor = require('@models/favor')


// 定义一个模型
class Flow extends Model {
  // 获取最新一期
  static async getLatest (uid) {
    const flow = await this.findOne({
      order: [
        ['index', 'DESC'] // desc倒序
      ]
    })
  
    const { art_id, type, index } = flow
    const art = await Art.getData(art_id, type);
    const favor = await Favor.likeStatus({ art_id, type, uid })
  
    // art.dataValues.index = flow.index
    art.setDataValue('index', index)
    art.setDataValue('like_status', favor)
    
    return art
  }
  
  
  // 获取上一期或下一期
  static async prevNext ({ index, uid }) {
    const flow = await this.findOne({
      where: { index }
    })
    if (!flow) {
      throw new NotFoundException()
    }
  
    const { art_id, type, index: value} = flow
    const art = await Art.getData(art_id, type);
    const favor = await Favor.likeStatus({ art_id, type, uid })
  
    // art.dataValues.index = flow.index
    art.setDataValue('index', value)
    art.setDataValue('like_status', favor)
    return art
  }
}

const attributes = {
  index: INTEGER,
  type: INTEGER,
  art_id: INTEGER
}

Flow.init(
  attributes,
  {
    sequelize,
    tableName: 'flow'
  }
)

// 所有的 Sequelize操作都是异步的，解决验证的方法：加上 await
module.exports = Flow
