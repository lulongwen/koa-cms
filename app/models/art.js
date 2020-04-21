const {
  ART_TYPE: { MOVIE, MUSIC, SENTENSE, BOOK }
} = require('@config/dict.config')

const {
  Movie, Music, Sentense
} = require('@models/classic')

const find = id => ({
  where: { id }
})

// 表的关联查询
class Art {
  
  static async getData(artId, type, useScope=true) {
    // scoped 事务 increment, decrement, update 500的坑
    const scoped = useScope ? 'excludeTime' : null
    let data
    
    switch (type) {
      case MOVIE:
        // scope 不带时间字段
        data = await Movie.scope(scoped).findOne(find(artId))
        break;
        
      case MUSIC:
        data = await Music.scope(scoped).findOne(find(artId))
        break;
        
      case SENTENSE:
        data = await Sentense.scope(scoped).findOne(find(artId))
        break;
        
      case BOOK:
        break;
    }
    return data
  }
}

module.exports = Art
