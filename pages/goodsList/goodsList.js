// pages/goodsList/goodsList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listproductsArr:[],
    pageNum: 0,    //分页记录数
    pageSize:5,  //分页大小
    show: false
  },
  goGoodsDetail: function (event) {
    let code = event.currentTarget.dataset.code
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?code='+code,
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
      },
      fail: function (res) {

        console.log('fail' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete' + JSON.stringify(res))
      },
    })
  },
  getproductsList:function(a,b,c){
    let that = this
    app.indexproductsList(a,b,c).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          listproductsArr:that.data.listproductsArr.concat(res.data),
          total:res.data.length,
          pageNum:that.data.pageNum + 1
        })
        if (that.data.total <= 0 ) {
          that.setData({
            show: true
          })
          // wx.showToast({
          //     title   : '无更多数据',
          //     icon    : 'loading',
          //     duration: 1000
          // });

        } else {
          if (2 < that.data.pageNum){
            // that.setData({
            //   show: !this.data.show,
            //   tips:'数据加载中'
            // })
              // wx.showToast({
              //     title   : '数据加载中',
              //     icon    : 'loading',
              //     duration: 500
              // });
          }
        }
      }else{
        getApp().status_code(res)
      }
    })
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
    this.getproductsList('','','')
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
    this.getproductsList('',this.data.pageNum,this.data.pageSize)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})