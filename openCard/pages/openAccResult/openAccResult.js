// openCard/pages/openAccResult/openAccResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconImg: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/icon/sess_icon.png',
    cmbcdata: {
      "accountNo": "6226 7465 8374 8685",
      "bindCardNo": "6217 7465 8374 8986",
      "cardNo": "6217 7465 8374 9586",
      "certificateNo": "string",
      "certificateType": "string",
      "createdAt": "2020-07-20T05:27:11.137Z",
      "extensionData": {},
      "id": 0,
      "mobile": "string",
      "openedAt": "string",
      "serverTransactionNo": "6217 7465 8374 9586",
      "status": "NONE",
      "step": "string",
      "transactionNo": "6226 7465 8374 9586",
      "updatedAt": "2020-07-20T05:27:11.137Z",
      "userId": 0,
      "username": "黄**"
    },
    errtextall: ''
  },
  backBtn:function(event){
    if(this.data.cmbcdata.status!='SUCCESS'){
      wx.redirectTo({
        url: '/openCard/pages/openAcc/openAcccount',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
        }
      });
    }else{
      wx.switchTab({
        url: '/pages/mine/mine',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
        }
      });
    }
  },
  copyText: function (event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    })
  },
  goindex: function (e) {
    wx.switchTab({
      url: '/pages/index/index',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  contactSupport: function (event) {
    getApp().contactSupport()
  },
  checkAccounts: function (event) {
    wx.redirectTo({
      url: '/openCard/pages/virtualBank/virtualBank',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  goTransfer: function (event) {
    wx.redirectTo({
      url: '/pages/transfer/transfer',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  goOpenAcc: function (event) {
    wx.redirectTo({
      url: '/openCard/pages/openAcc/openAcccount',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log('openresulr---transactionNo==', options.transactionNo)
    let transactionNo = wx.getStorageSync('transactionNo');
    if (transactionNo) {
      getApp().getaccountSatus(transactionNo + '/status').then(res => {
        console.log('getaccountSatus====', res)
        wx.hideLoading()
        if (res.statusCode == 200) {
          wx.removeStorageSync('back')
          wx.removeStorageSync('front')
          wx.removeStorageSync('cmbcmobile')
          wx.removeStorageSync('passByvalue')
          wx.removeStorageSync('storageObj')
          wx.setStorageSync('openResult', 'openResult');
          that.setData({
            cmbcdata: res.data
          })
          if (res.data.status == 'SUCCESS' || res.data.status == 'FAIL') {
            wx.removeStorageSync('transactionNo')
            wx.removeStorageSync('openResult')
          }
        } else {
          try {
            let errors = res.data.errors
            let error = res.data.error
            let mesge = res.data.message ? res.data.message : '请尽快联系客服'
            let errText
            errText = errors ? errors[Object.keys(errors)[0]] : error ? mesge : '请尽快联系客服'
            throw errText
          } catch (err) {
            that.setData({
              errtextall: err
            })
          }
          getApp().status_code(res)
        }
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