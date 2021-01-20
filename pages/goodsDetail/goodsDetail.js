// pages/goodsDetail/goodsDetail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodnav: [
      { linkUrl:'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/other/detail_nav.jpg',
        goodetall: '01'
      }, {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/other/detail_nav.jpg',
        goodetall: '01'
      }
    ]
  },
  backBtn:function(event){
    let pages = getCurrentPages(); //当前页面
    console.log('backBtn===pages==',pages)
    let prevPage = pages[pages.length - 2];
    console.log('prevPage===pages==',prevPage.route)
    let rotePage
    if(prevPage){
      rotePage = prevPage.route.replace('pages','..')
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.navigateBack({
        delta: 1,
        success: function (e) { 
          var page = getCurrentPages().pop(); 
          if (page == undefined || page == null) return; 
          page.onLoad(); 
        } 
      })
    }
    // wx.reLaunch({
    //   url: '../index/index'
    // })
  },
  goPayOrder:function(event){
    let that =this
    let date = {
      code: that.data.goodsDetail.code,
      denomination: that.data.goodsDetail.denomination,
      icon: that.data.goodsDetail.product.icon,
      point: that.data.goodsDetail.point,
      price: that.data.goodsDetail.price,
      sold: that.data.goodsDetail.sold,
      title: that.data.goodsDetail.title,
      type: that.data.goodsDetail.product.type
    }
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
  },
  getgoodsDetail:function(a){
    let that = this
    app.goodsdetail(a).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          goodsDetail:res.data,
          goodnav:res.data.product.pictures
        })
      }else{
        getApp().status_code(res)
      }
    })
  },
  contactSupport:function(e){
    getApp().contactSupport()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      code:options.code
    })
    that.getgoodsDetail(options.code)
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