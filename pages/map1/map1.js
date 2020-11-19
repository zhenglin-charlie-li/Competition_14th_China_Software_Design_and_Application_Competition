function consoleshow(that) {
  console.group("consoleshow")
  console.log(that.data.userlatitude);
  console.log(that.data.userlongitude);
  console.log(that.data.userlatitude - 30.552287992828123);
  console.log(that.data.userlongitude - 103.99773484973251);
  console.log(that.data.lengthy);
  console.log(that.data.lengthx);
  console.log(that.data.length);
  console.log(typeof(that.data.length));
  console.log(Page);
  console.log(that.data);
  console.log(Page.data)
  console.groupEnd("consoleshow")
}

Page({
  onLaunch: function() {

  },
  onShow: function() {
    this.getLocation();
  },
  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 14,
      })
    }
  },
  functiona(e){
    //11.5
    var DB = wx.cloud.database().collection("coming")
    let info = {
      code:this.data.code,
      distance:this.data.length,
      expectTime:new Date().toLocaleString( )+this.data.time,
      startTime:new Date().toLocaleString( )
    }
    console.log(info)
    DB.add({
      data: info,
      success(res) {
        that.onPullDownRefresh()
        that.setData({currentTab: 0})
        console.log("添加数据成功", res)
        wx.showToast({
          title: '成功',
          icon: 'success',
        })
      },
      fail(res) {
        console.log("添加数据失败", res)
        wx.showToast({
          title: "提交失败了，请再试一次吧",
          icon: "none"
        })
      }
    })
    wx.showModal({
      title: '成功了',
      content: '成功将信息传给工作人员',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  getLocation: function(e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var length = parseInt(Math.sqrt((longitude - 103.99773484973251) * 10000 * (longitude - 103.99773484973251) * 10000 + (latitude - 30.552287992828123) * 10000 * (latitude - 30.552287992828123) * 10000));
        that.setData({
          userlatitude: latitude,
          userlongitude: longitude,
          // lengthx: (longitude - 103.99773484973251) * 10000,
          // lengthy: (latitude - 30.552287992828123) * 10000,
          length: length,
          time: parseInt(length/150)
        })
        // that.caculatelength();
        consoleshow(that);
        //弹框
        // wx.showModal({
        //   title: '当前位置',
        //   content: "纬度:" + latitude + ",经度:" + longitude,
        // })
      }
    })

  },
  codeInput:function(e){
    this.setData({
      code:e.detail.value
    })
    console.log(this.data.code)
  },
  /**
   * 页面的初始数据
   */
  data: {
    userlatitude: 0,
    userlongitude: 0, //用户当前的经纬度
    latitude: 30.55472727865198,
    longitude: 103.99494026913302, //地图中心默认经纬度
    code:0,
    // lengthx: 0,
    // lengthy: 0,
    length: 0, //用户和id1直线距离
    time: 0,
    markers: [{
      id: 1,
      latitude: 30.552287992828123,
      longitude: 103.99773484973251, //菜鸟驿站经纬度

      /*      //气泡label (可与callout 2选1)
            label: {
              content: '菜鸟驿站',  //文本
              color: '#FF0202',  //文本颜色
              borderRadius: 3,  //边框圆角
              borderWidth: 1,  //边框宽度
              borderColor: '#FF0202',  //边框颜色
              bgColor: '#ffffff',  //背景色
              padding: 0,  //文本边缘留白
              textAlign: 'center'  //文本对齐方式。有效值: left, right, center
            },
      */
      //气泡callout
      callout: {
        // content: '菜鸟驿站-'+56+' 米- mins', //文本
        color: '#FF0202', //文本颜色
        borderRadius: 3, //边框圆角
        borderWidth: 1, //边框宽度
        borderColor: '#FF0202', //边框颜色
        bgColor: '#ffffff', //背景色
        padding: 2, //文本边缘留白
        textAlign: 'center', //文本对齐方式。有效值: left, right, center
        display: 'ALWAYS',
        anchorY: -23
      }
      //     },{
      //         id: 2,
      //         latitude: 30.5530917734463951,
      //         longitude: 103.99323714463951,

      //         //气泡label (可与callout 2选1)
      // /*        label: {
      //           content: '商业街百世快递',  //文本
      //           color: '#FF0202',  //文本颜色
      //           borderRadius: 3,  //边框圆角
      //           borderWidth: 1,  //边框宽度
      //           borderColor: '#FF0202',  //边框颜色
      //           bgColor: '#ffffff',  //背景色
      //           padding: 0,  //文本边缘留白
      //           textAlign: 'center'  //文本对齐方式。有效值: left, right, center
      //         },
      // */
      //         //气泡callout
      //         callout: {
      //           content: '商业街百世快递- 米- mins',  //文本
      //           color: '#FF0202',  //文本颜色
      //           borderRadius: 3,  //边框圆角
      //           borderWidth: 1,  //边框宽度
      //           borderColor: '#FF0202',  //边框颜色
      //           bgColor: '#ffffff',  //背景色
      //           padding: 2,  //文本边缘留白
      //           textAlign: 'center'  //文本对齐方式。有效值: left, right, center
      //         }
      //     },{
      //         id: 3,
      //         latitude: 30.553718449790914,
      //         longitude: 103.99100896400175,

      //         //气泡label (可与callout 2选1)
      // /*        label: {
      //           content: '京东派',  //文本
      //           color: '#FF0202',  //文本颜色
      //           borderRadius: 3,  //边框圆角
      //           borderWidth: 1,  //边框宽度
      //           borderColor: '#FF0202',  //边框颜色
      //           bgColor: '#ffffff',  //背景色
      //           padding: 0,  //文本边缘留白
      //           textAlign: 'center'  //文本对齐方式。有效值: left, right, center
      //         },
      // */
      //         //气泡callout
      //         callout: {
      //           content: '京东派- 米- mins',  //文本
      //           color: '#FF0202',  //文本颜色
      //           borderRadius: 3,  //边框圆角
      //           borderWidth: 1,  //边框宽度
      //           borderColor: '#FF0202',  //边框颜色
      //           bgColor: '#ffffff',  //背景色
      //           padding: 2,  //文本边缘留白
      //           textAlign: 'center'  //文本对齐方式。有效值: left, right, center
      //         }

      //     
    }],

  },
})