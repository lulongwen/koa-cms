const {
  Model, sequelize,
  Sequelize: {
    STRING, TINYINT, DATEONLY, INTEGER
  },
} = require('./db')


// 提取公众属性，类似的继承
const attributes = {
  image: {
    type: STRING
  },
  content: STRING,
  title: STRING,
  type: TINYINT,
  fav_nums: {
    type: INTEGER,
    defaultValue: 0
  }
  // update_at: DATEONLY
}


class Movie extends Model {}

Movie.init(attributes, {
  sequelize, // sequelize 实例
  tableName: 'movie'
})


class Sentense extends Model {}

Sentense.init(attributes, {
  sequelize,
  tableName: 'sentence'
})


class Music extends Model {}

const musicField = {
  ...attributes,
  url: STRING // 音乐链接
}

Music.init(musicField, {
  sequelize,
  tableName: 'music'
})

// Sequelize操作都是异步的，解决验证的方法：加上 await
module.exports = {
  Movie,
  Sentense,
  Music
}
