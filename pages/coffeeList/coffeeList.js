// pages/coffeeList/coffeeList.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coffeeCouponList:[{
      channelCode: "170194",
      code: "9138b1cf1ad8",
      createdAt: "2018-08-24 09:02:25",
      denomination: 0,
      id: 677,
      pictures:[],
      point: 2200,
      price: 22,
      product:{},
      sold: true,
      stock: 0,
      title: "全场饮品券"
    },{
      channelCode: "170194",
      code: "9138b1cf1ad8",
      createdAt: "2018-08-24 09:02:25",
      denomination: 0,
      id: 677,
      pictures:[],
      point: 2500,
      price: 25,
      product:{},
      sold: true,
      stock: 0,
      title: "全场饮品券"
    },{
      channelCode: "170194",
      code: "9138b1cf1ad8",
      createdAt: "2018-08-24 09:02:25",
      denomination: 0,
      id: 677,
      pictures:[],
      point: 2800,
      price: 28,
      product:{},
      sold: true,
      stock: 0,
      title: "全场饮品券"
    }]
  },
  goPaycoofee:function(event){
    let tokenData = wx.getStorageSync('tokenData');
    if(!tokenData.refresh_token){
      wx.navigateTo({
        url: '../login/login',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
            // console.log(data)
          },
          someEvent: function(data) {
            // console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        },
        fail: function(res) {
          
          console.log('fail'+JSON.stringify(res))
        },
        complete: function(res) {
          console.log('complete'+JSON.stringify(res))
        },
      })
    }else{
      let inx = event.currentTarget.dataset.index
      let date = this.data.coffeeCouponList[inx]
      wx.navigateTo({
        url: '../payOrder/payOrder',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
            // console.log(data)
          },
          someEvent: function(data) {
            // console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: date })
        },
        fail: function(res) {
          
          console.log('fail'+JSON.stringify(res))
        },
        complete: function(res) {
          console.log('complete'+JSON.stringify(res))
        },
      })
    }
    
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    app.mobileRecharge('COFFEE_COUPON').then(res => {
      wx.hideLoading()
      if(res.data.length>= 1&&res.data!=null){
        that.setData({
          coffeeCouponList:res.data
        })
      }else if(res.statusCode!=200){
        getApp().status_code(res)
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})