// wallet/pages/walletrecharge/resultCmbc.js
var app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmbcAcc:''
  },
  strTime:function(t){
    let timeStr = t.replace(/T/g," ")
    return timeStr
  },
  gowalletIndex:function(e){
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bankUrl = wx.getStorageSync('bankUrl');
    let seccObj = wx.getStorageSync('seccObj');
    let textttle;
    this.setData({
      bankUrl:bankUrl,
      seccObj:seccObj
    })
    switch (bankUrl) {
      case 'recharge':
        textttle='充值'
        break;
    
      default:
        textttle='提现'
        break;
    }
    wx.setNavigationBarTitle({
      title: textttle
    })
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
    let that = this
    app.getaccountsdetail().then(res => {
      console.log('getaccountsdetail',res)
      wx.hideLoading()
      if(res.statusCode!=200){
        getApp().status_code(res)
      }else{
        that.setData({
          cmbcAcc:res.data
        })
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