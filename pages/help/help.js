/**
 * +-----------------------+
 * | OPENID不能保存在前端!!! |
 * +-----------------------+
 */

//index.js
const app = getApp()
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');
const DB = wx.cloud.database().collection("page-help")


//获取应用实例
Page({
  data: {
    /**
    * 页面配置
    */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    //next page
    taskTypes: ['取件', '送餐', '二手交易', '其他'],
    imgs: [],
    title: '',
    description: '',
    money: 0,
    taskType: '取物',
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: '',
    array: [],
    orderedArray: []
  },
  setOrdered(e) {
    // This function certianly should be enhanced.
    // console.log("接单了")
    const that = this
    wx.showToast({
      title: "接单成功",
      icon: "success"
    })
    const id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: "toggleOrdered",
      data: {
        "itemid": id,
        /* get the OPENID in the cloudFunction */
        "status": true
      }
    }).then(that.onPullDownRefresh())
  },
  setComing(e) {
  const id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: "toggleComing",
      data: {
          "itemid": id,
          /* get the OPENID in the cloudFunction */
          "status": true
      }
    })
    wx.showModal({
      title: '成功了',
      content: '联系qq1125806272',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  // 查询搜索的接口方法
  search: function () {
    console.log("这里有待完善,search搜索功能")
  },
  onLoad: function () {
    wx.showNavigationBarLoading()
    
    let that = this;
    //next page3
    var now = timeApi.formatDate(new Date());
    var time = timeApi.formatTime(new Date());
    this.setData({
      startDate: now,
      startTime: time,
      endDate: now,
      endTime: time,
      winHeight: 1500
    })
    /* 为保证安全性, 此处采用云函数获取互助取件列表 */
     wx.cloud.callFunction({
      name: "getArray"
    }).then(res=>{
      // console.log(res.result)
      res.result.array = res.result.array.filter(el => {
        return !el.ordered
      })
      that.setData(res.result)
    }).catch(err=>{
      console.errer(err)
    }).finally(()=> {
      wx.hideNavigationBarLoading()
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    let that = this
     wx.cloud.callFunction({
      name: "getArray"
    }).then(res=>{
      res.result.array = res.result.array.filter(el => {
        return !el.ordered
      })
      that.setData(res.result)
    }).catch(err=>{
      console.errer(err)
    }).finally(() => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    console.log("You've reached bottom. You cannot go down.")
    /* Load the next 20 items.*/
    /* success:*/wx.hideNavigationBarLoading();
  },
  handleSubmit: function () {
    if(!this.data.money) {
      wx.showToast({
        title: "酬劳不能为0",
      })
      return;
    }
    let info = {
      title: this.data.title,
      description: this.data.description,
      money: this.data.money,
      taskType: this.data.taskType,
      startDate: this.data.startDate,
      startTime: this.data.startTime,
      endDate: this.data.endDate.substring(5, 9),
      endTime: this.data.endTime,
      ordered: false
    }
    console.log(info)
    console.log('调用添加数据的方法')
    let that = this
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
  },
  bindInputTitle: function (e) {
    this.setData({
      title: e.detail.detail.value
    })
    console.log('bingInputTitle is called...')
  },
  bindInputMoney: function (e) {
    this.setData({
      money: e.detail.detail.value
    })
  },
  bindInputDescription: function (e) {
    this.setData({
      description: e.detail.detail.value
    })
    console.log('bindInputDesc is called...')
  },
  setTaskType: function (e) {
    this.setData({
      taskType: this.data.taskTypes[e.detail.value]
    })
  },
  setStartDate: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  setStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  setEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  setEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})