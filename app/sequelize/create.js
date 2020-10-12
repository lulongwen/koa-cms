const User = {}

// 插入数据
;(async function(){
  const user = await User.create({
    userName: 'lucy',
    password: 123456,
    nickName: 'lovey'
  })
  console.log('user', user.dataValues)
  
  const blog = await Blog.create({
    title: '荀子-劝学',
    content: '青出于蓝而胜于蓝，冰水为止而寒于水',
    user_Id: user.getDataValue('id')
  })
  console.log('user', user.dataValues)
})()
