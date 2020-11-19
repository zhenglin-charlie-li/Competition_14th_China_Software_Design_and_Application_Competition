// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'scu-zhi-neng-qu-jian-4in4f'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let array = []
  await cloud.database().collection('page-help').get().then(res => {
    console.log(res.data)
    array = res.data
    // console.log(array)
  })
  
  const {OPENID} = wxContext
  /* Get orderedArray by OPENID */
  orderedArray = array.filter(el => {
    if( el.ordered && el.ordererOpenid === OPENID) return true;
    else return false
  })
  console.log(orderedArray)
  
  /* remove OPENID from objects before returning for security reasons. */
  array.forEach(el => {
    delete el.ordererOpenid
  })
  // orderedArray.forEach(el => {
  //   delete el.ordererOpenid
  // })
  /** Objects are references.
      so when a property of an object is deleted,
      it's deleted everywhere.
      */
  
  
  return {array, orderedArray}
}