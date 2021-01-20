// wallet/pages/walletDettail/walletDettail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accTyoeNam:'全部明细',
    pageNum: 1,    //分页记录数
    pageSize:10,
    account:'',
    show: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  cmbcgetAccounttrades:function(a,b,c){
    let that = this;
    app.cmbcgetAccounttrades(a,b,c).then(res => {
      console.log('cmbcgetAccounttrades====data===',a+',page:'+b+',size:'+c)
      console.log('cmbcgetAccounttrades===',res)
      wx.hideLoading()
      if(res.statusCode==200&&res.data.length>0){
        that.setData({
          cmbcListTorF:true,
          cmbcAccounttradesList:res.data,
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
              // wx.showToast({
              //     title   : '数据加载中',
              //     icon    : 'loading',
              //     duration: 500
              // });
          }
        }
      }else if(res.statusCode==200&&res.data.length==0){
        that.setData({
          show: true
        })
      }else{
        getApp().status_code(res)
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
    let account = wx.getStorageSync('walletListaccount')
    let page = this.data.pageNum
    let size = this.data.pageSize
    console.log('account===',account)
    this.cmbcgetAccounttrades(account,page,size)
    this.setData({
      account : account
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
    let that = this
    that.cmbcgetAccounttrades(that.data.account,that.data.pageNum,that.data.pageSize)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})