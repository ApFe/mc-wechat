// openCard/pages/cmbcClose/closeAccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconImg:'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/icon/sess_icon.png',
    cmbcdata:{
      
    }
  },
  goindex:function(e){
    wx.switchTab({
      url: '/pages/index/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        wx.removeStorageSync('clossObj');
      }
    });
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  // checkAccounts:function(event){
  //   wx.redirectTo({
  //     url: '/openCard/pages/virtualBank/virtualBank',
  //     success: function(res) {
  //       // 通过eventChannel向被打开页面传送数据
  //     }
  //   });
  // },
  // goTransfer:function(event){
  //   wx.redirectTo({
  //     url: '/pages/transfer/transfer',
  //     success: function(res) {
  //       // 通过eventChannel向被打开页面传送数据
  //     }
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    
    let clossObj = wx.getStorageSync('clossObj');
    that.setData({
      cmbcdata:clossObj
    })
    console.log('clossObj---clossObj==',clossObj)
    if(clossObj.status == '00'){
      
      wx.removeStorageSync('closeaccobj');
      wx.removeStorageSync('passByvalue');
      wx.removeStorageSync('accountNo');
      wx.removeStorageSync('transactionNo');
      wx.removeStorageSync('cmbcmobile');
      wx.removeStorageSync('bankUrl');
     
            
    }
    that.setData({
      cmbcdata:clossObj
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