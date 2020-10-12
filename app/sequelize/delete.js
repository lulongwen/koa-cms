const User = {}
const Blog = {}

;(async function(){

  const blog = await Blog.destroy({
    where: {
      id: 21
    }
  })
  console.log('update', blog > 0)
  
  // 删除外键，关联表的数据也会删除
  const user = await User.destroy({
    where: {
      id: 21
    }
  })
  console.log('update', user > 0)

})()
