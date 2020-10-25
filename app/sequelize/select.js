const User = {}
const Blog = {}
// const { Blog, User } = require('./model.js')


;(async function(){
  // 查询一条 .findOne
  const user = await User.findOne({
    where: {
      id: 23
    },
    attributes: ['username', 'nickname'] // 列字段查询
  })
  console.log('user', user.dataValues)
  
  
  // 查询全部 .findAll
  const list = await Blog.findAll({
    where: {
      userid: 23
    },
    order: [ // order排序
      ['id', 'desc'],
      ['title', 'desc']
    ]
  })
  console.log('blog', list.map(item => item.dataValues))
  
  
  // 分页 .findAll & .findAndCountAll 查询不分页的总数
  const pageList = await Blog.findAndCountAll({
    limit: 2, // 本次查询 2条
    offset: 0, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  })
  // pageList.count 总数 & pageList.rows 分页数据
  console.log('blog', pageList.map(item => item.dataValues))
  
  
  // Blog连表查询，关键：要提前定义好 表的外键
  const blogWithUser = await Blog.findAndCountAll({
    order: [ // 排序规则
      ['id', 'desc']
    ],
    include: [ // 连表查询的核心
      {
        model: User,
        attributes: ['username', 'nickname'],
        where: {
          username: 'lucy'
        }
      }
    ]
  })
  
  blogWithUser.count
  blogWithUser.rows.map(item => {
    let blog = item.dataValues
    blog.user = blog.user.dataValues
    return blog
  })
  
  
  // User连表查询
  const userWithBlog = await User.findAndCountAll({
    attributes: ['username', 'nickname'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: Blog
      }
    ]
  })
  
})()
