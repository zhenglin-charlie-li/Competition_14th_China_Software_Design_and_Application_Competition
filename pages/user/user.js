// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navToinfo(e) {
    console.log(e)
    wx.navigateTo({
      url: './info/info',
    })
  },
  navToaddress(e) {
    console.log(e)
    wx.navigateTo({
      url: './address/address',
    })
  },
  navTocash(e) {
    console.log(e)
    wx.navigateTo({
      url: './cash/cash',
    })
  },
  makePhone(e) {
    wx.showModal({
      title: '电话客服',
      content: '请致电15398475433',
      success: function(res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  navToabout(e){
    wx.navigateTo({
      url: './about/about',
    })
  },
  navToregister(e) {
    wx.navigateTo({
      url: './register/register',
    })
  },
  navTowoker(e) {
    wx.navigateTo({
      url: './woker/woker',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})