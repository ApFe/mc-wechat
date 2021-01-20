// pages/payMsg/payMsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargeShow:false,
  },
  goOrderDetail:function(event){
    let tradeNo = this.data.tradeNo
    wx.navigateTo({
      url: '../orderDetail/orderDetail?tradeNo='+tradeNo,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goBack:function(event){
    if(this.data.description=='charge'){
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options.payStatus=='FAILED'||options.payStatus=='NONE'||options.payStatus=='CANCELLED'){
      that.setData({
        payMsg:options.payStatus,
        chargeShow:true,
        description:options.description,
        tradeNo:options.tradeNo
      })
    }else{
      that.setData({
        payMsg:options.payStatus,
        chargeShow:false,
        description:options.description,
        tradeNo:options.tradeNo
      })
    }
    
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
    let  windowIsBang = wx.getStorageSync('windowIsBang')
    this.setData({
      windowIsBang
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