App({
  onLaunch: function () {
    wx.cloud.init({
      env: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"//你的环境ID
    })
  }
})