const {
  CLASSIC_TYPE: { MOVIE, MUSIC, SENTENSE, BOOK }
} = require('@config/dict.config')

const {
  Movie, Music, Sentense
} = require('@models/classic-table')

const {
  NotFoundException
} = require('@exception')

const { Op } = require('sequelize')


// 表的关联查询
class Classic {
  
  // 查询全部数据；3种类型的数据；3次 in查询
  static async getAll (favorList) {
    const artList = {
      100: [],
      200: [],
      300: []
    }
    for (let item of favorList) {
      const { type, art_id } = item
      artList[type].push(art_id)
    }
  
    let temp = []
    // for 循环里面的代码抽离成一个函数
    for (let key in artList) {
      const ids = artList[key]
      if (!ids.length) continue // 空值跳出循环
      
      let data = await this._getDataByType(ids, parseInt(key))
      temp = [...temp, ...data]
    }

    return temp
  }
  
  static async _getDataByType (ids, type) {
    const scoped = 'excludeTime'
    const find = {
      where: {
        id: { [Op.in]: ids }
      }
    }
    let data
    
    switch (type) {
      case MOVIE:
        // scope 不带时间字段
        data = await Movie.scope(scoped).findAll(find)
        break;
    
      case MUSIC:
        data = await Music.scope(scoped).findAll(find)
        break;
    
      case SENTENSE:
        data = await Sentense.scope(scoped).findAll(find)
        break;
    
      case BOOK:
        break;
    }
    return data
  }
  
  
  // 查询单个数据
  static async getData(art_id, type, useScope=true) {
    // scoped 事务 increment, decrement, update 500的坑
    const scoped = useScope ? 'excludeTime' : null
    let data
    const find = {
      where: { id: art_id }
    }
    
    type = parseInt(type)
    switch (type) {
      case MOVIE:
        // scope 不带时间字段
        data = await Movie.scope(scoped).findOne(find)
        break;
        
      case MUSIC:
        data = await Music.scope(scoped).findOne(find)
        break;
        
      case SENTENSE:
        data = await Sentense.scope(scoped).findOne(find)
        break;
        
      case BOOK:
        const Book = require('./book')
        data = await Book.scope(scoped).findOne(find)
        if (data) return
        data = await Book.create({ id: art_id })
        break
    }
    return data
  }
  
  // 查询详情
  static async getDetail (art_id, type, uid) {
    const art = await this.getData(art_id, type)
    if (!art) {
      throw new NotFoundException('没有找到期刊')
    }
  
    // 放在上面会造成循环引用，报错
    const Favor = require('@models/favor')
    const like = await Favor.likeStatus({ art_id, type, uid })
  
    art.setDataValue('like_status', like)
    return art
  }
}

module.exports = Classic
