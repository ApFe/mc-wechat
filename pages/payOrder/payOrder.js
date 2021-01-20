// pages/payOrder/payOrder.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gopayMsgt:false
  },
  gopayMsg:function(event){
    let that = this
    let point = that.data.paygoodsDetail.point
    let tureArr=[]
    that.data.tureArrbalance.forEach((items,index) => {
      if(items-point>=0){
        tureArr.push(1)
      }
    })
    if(tureArr.length>=1){
      if(this.data.gopayMsgt){
        wx.showToast({
          title: '请勿重复提交',
          icon: 'none',
          duration: 3000
        });
      }else{
        let code = that.data.paygoodsDetail.code 
        let mobile = wx.getStorageSync('userInfo').mobile
        let denomination = that.data.paygoodsDetail.denomination
        let type = that.data.paygoodsDetail.type
        let description = that.data.paygoodsDetail.title
        let controlnavigateBack = 'RechargeCardController'
        app.virtualordersPost(description,code,1,mobile,'',type,true).then(res => {
          that.setData({
            gopayMsgt:true
          })
          wx.hideLoading()
          if(res.statusCode==200){
            let tradeNo = res.data.tradeNo
            let expired = res.data.expiredAt
            let payMethod = res.data.payMethod
            wx.navigateTo({
              url: '../payOrder/paymentAuth',
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
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: {tradeNo:tradeNo,payMethod:payMethod,expired:expired,price:denomination,inPrice:point,controlnavigateBack:controlnavigateBack} })
              },
              fail: function(res) {
                
                console.log('fail'+JSON.stringify(res))
              },
              complete: function(res) {
                console.log('complete'+JSON.stringify(res))
              },
            })
          }else{
            getApp().status_code(res)
          }
        })
      }
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '积分不足...',
          icon: 'none',
          duration: 3000
        });
      }, 100);
    }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage',data=>{
      this.setData({
        paygoodsDetail:data.data
      })
    })
    let tokenData = wx.getStorageSync('tokenData');
    if(tokenData.refresh_token){
      let bound = true
      app.accountCards(bound).then(res => {
        wx.hideLoading()
        if(res.statusCode==200){
          let tureArr=[]
          let accArrList=res.data.cards
          accArrList.forEach(element => {
            tureArr.push(element.balance)
          })
          that.setData({
            tureArrbalance:tureArr
          })
        }else{
          getApp().status_code(res)
        }
        
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login'
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