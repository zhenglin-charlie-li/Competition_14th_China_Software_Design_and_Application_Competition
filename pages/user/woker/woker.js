// pages/user/woker/woker.js
Page({
  data: {
    array: []
  },
  onLoad() {
    const db = wx.cloud.database()
    const that = this
    const watcher = db.collection("coming")
       .orderBy("distance", "asc").watch({
        onChange: function(snapshot) {
          console.log("changed")
          console.log(snapshot)
          let array = snapshot.docs
          array.forEach(el => {
            console.log(el.expectTime.toLocaleString())
            el.expectTimeString = el.expectTime.toLocaleString()
          })
          /* 每次被watch的元素改变时都会触发onChange方法. */
          that.setData({
            array
          })
        },
        onError: function(err) {
          console.log("watch error")
          console.error(err)
        }
      }) 
  },
  onPullDownRefresh(){ 
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  }
})