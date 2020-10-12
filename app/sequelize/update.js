const User = {}
const Blog = {}

;(async function(){

  const user = await User.update({
    nickname: '荀子'
  }, {
    where: {
      username: 'lucy'
    }
  })
  console.log('update', user[0] > 0)

})()
