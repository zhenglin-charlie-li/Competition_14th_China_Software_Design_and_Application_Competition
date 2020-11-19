// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'scu-zhi-neng-qu-jian-4in4f'
})


/** 
 * @param {itemid: string}
 * @param {bool}  
 * @returns openid
 */
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // const cmd = db.command
  const pageHelp = db.collection('page-help')
  const itemid = event.itemid
  const status = event.status
  
  pageHelp.doc(itemid).update({
    data: {
      coming: status,
      ordererOpenid: wxContext.OPENID
    }
  }).then(res=>{
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
  return;
}