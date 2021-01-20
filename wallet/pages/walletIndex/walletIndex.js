// wallet/pages/walletIndex/walletIndex.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmbcCard:{
      availableBalance:'0.00'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  cmbcAccountdetails:function(e){
    let account = this.data.cmbcCard.number
    wx.setStorageSync('walletListaccount',account)
    wx.navigateTo({
      url: '/wallet/pages/walletDettail/walletDettail',
      success: function(res) {
      }
    });
  },
  rechargeOrwithdrawcashCmbc:function(event){
    let rechargeOrwithdrawcash = event.currentTarget.dataset.type;
    let number = this.data.cmbcCard.number;
    wx.navigateTo({
      url: '/wallet/pages/walletrecharge/rechargeCmbc',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { accData:{rechargeOrwithdrawcashCmbc: rechargeOrwithdrawcash,number:number} })
      }
    });
  },
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
    let that = this
    let cmbcaccountNo = wx.getStorageSync('cmbcaccountNo')
    app.cmbcgetAccountbalance(cmbcaccountNo+'/balance').then(res => {
      console.log('cmbcgetAccountbalance==>==',res)
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          cmbcCard:res.data
        })
      }else{
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