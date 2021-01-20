// pages/transferes/results.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rolloutnam: '',
    rolloutIntegral: '',
    rollinaccType: '',
    rollinaccKey: '',
    status: '',
    bonuspoints: {
      couponCode: '',
      faceValue: '',
      cardMsg: '()',
      rechargeStatus: false
    }
  },
  goMine: function (event) {
    wx.switchTab({
      url: '../mine/mine'
    })
  },
  goTransfer: function (event) {
    wx.navigateTo({
      url: '../transfer/transfer',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: '结果页返回'
        })
      },
      fail: function (res) {

        console.log('fail' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete' + JSON.stringify(res))
      },
    })
  },
  goirechage: function (event) {
    wx.redirectTo({
      url: '../integral/recharge',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function(data) {
        //   console.log(data)
        // },
        // someEvent: function(data) {
        //   console.log(data)
        // }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: '结果页返回' })
      },
      fail: function (res) {

        console.log('fail' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete' + JSON.stringify(res))
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (JSON.stringify(options) != "{}") {
      console.log(JSON.stringify(options))
      this.setData({
        bonuspoints: options
      })
      
      return
    }
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log('acceptDataFromOpenerPage===',data)
      if (data.data.status == 'SUCCESS') {
        that.setData({
          rolloutnam: data.data.rolloutnam,
          rolloutIntegral: data.data.rolloutIntegral,
          rollinaccType: data.data.rollinaccType,
          rollinaccKey: data.data.rollinaccKey,
          status: data.data.status
        })
      } else {
        that.setData({
          rolloutnam: data.data.rolloutnam,
          status: data.data.status
        })
      }

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
    let windowIsBang = wx.getStorageSync('windowIsBang')
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