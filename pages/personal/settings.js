// pages/personal/settings.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    cmbc:false,
    cmbcqualification:false,
    authorizeCmbcEcard:false
  },
  checkAccounts:function(event){
    let cmbc,goUrl
    cmbc = this.data.cmbc
    console.log('cmbc==',cmbc)
    if(cmbc){
      goUrl = '/openCard/pages/virtualBank/virtualBank'
    }else{
      goUrl = '/openCard/pages/openAcc/openAcccount'
    }
    console.log(goUrl)
    wx.navigateTo({
      url: goUrl,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  applyforpermission:function(e){
    wx.navigateTo({
      url: '../permission/applications',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  logoff:function(){
    try {
      wx.clearStorageSync()
      app.js_code()
      wx.reLaunch({
        url: '../index/index',
        success() {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          console.log('=====',page)
          page.onLoad();
          page.onShow()
        }
      })
    } catch(e) {
      wx.clearStorage()
      app.js_code()
      wx.reLaunch({
        url: '../index/index',
        success() {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          console.log('=====',page)
          page.onLoad();
          page.onShow()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let mobile,cmbc
    mobile=wx.getStorageSync('userInfo').mobile
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log('setting==',data)
      let cmbcStr=data.cmbc
      that.setData({
        cmbc:cmbcStr
      })
    })
    this.setData({
      mobile:mobile
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
   let cmbcqualification = wx.getStorageSync('cmbcqualification')
   let authorizeCmbcEcard = wx.getStorageSync('authorizeCmbcEcard')
   this.setData({
    cmbcqualification:cmbcqualification,
    authorizeCmbcEcard:authorizeCmbcEcard
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