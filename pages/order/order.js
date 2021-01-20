// pages/order/order.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTorF:false,
    orderListArr:[],
    pageNum: 1,    //分页记录数
    pageSize:5,  //分页大小
    show: false
  },
  getOrderListArr:function(b,c){
    let that = this;
    app.storeOrderList(b,c).then(res => {
      wx.hideLoading()
      if(res.statusCode==200&&res.data.length>0){
        that.setData({
          orderTorF:true,
          orderListArr:that.data.orderListArr.concat(res.data),
          total:res.data.length,
          pageNum:that.data.pageNum + 1
        })
        if (that.data.total <= 0 ) {
 
          // wx.showToast({
          //     title   : '无更多数据',
          //     icon    : 'loading',
          //     duration: 1000
          // });
          that.setData({
            show: true
          })

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
  goHangout:function(event){
    wx.switchTab({
      url: '../index/index'
    })
  },
  gohome:function(event){
    wx.reLaunch({
      url: '../index/index'
    })
  },
  goOrderDetail:function(event){
    wx.reLaunch({
      url: '../orderDetail/orderDetail?tradeNo='+event.currentTarget.dataset.tradeno,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goPaymentAuth:function(event){
    let tradeNo = event.currentTarget.dataset.tradeno
    let payMethod = event.currentTarget.dataset.paymethod
    let expired = event.currentTarget.dataset.expired
    let price = event.currentTarget.dataset.price
    let inPrice = event.currentTarget.dataset.inprice
    let controlnavigateBack = 'OrderController'
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
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: {tradeNo:tradeNo,payMethod:payMethod,expired:expired,price:price,inPrice:inPrice,controlnavigateBack:controlnavigateBack} })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  cancelOrders:function(event){
    let tradeNo = event.currentTarget.dataset.tradeno
    let that=this
    wx.showModal({
      title: '您是否确认要取消当前订单',
      success (res) {
        if (res.confirm) {
          app.cancelOrders(tradeNo+'/cancel').then(res => {
            wx.hideLoading()
            if(res.statusCode==200){
              setTimeout(() => {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 3000,
                  success:function(){
                    that.setData({
                      orderListArr:[],
                      pageNum: 1,    //分页记录数
                      pageSize:5  //分页大小
                    })
                    that.onShow()
                  }
                });
              }, 100);
              
              
            }else{
              getApp().status_code(res)
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  deleteOrders:function(event){
    let tradeNo = event.currentTarget.dataset.tradeno
    let that=this
    wx.showModal({
      title: '您是否确认要删除当前订单',
      // content: deleteNam=='NAME'?'联名卡账户：'+deleteNam:'网站主账户：'+deleteNum,
      success (res) {
        if (res.confirm) {
          app.deleteOrders(tradeNo+'/delete').then(res => {
            wx.hideLoading()
            if(res.statusCode==204){
              setTimeout(() => {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 3000,
                  success:function(){
                    that.setData({
                      orderListArr:[],
                      pageNum: 1,    //分页记录数
                      pageSize:5  //分页大小
                    })
                    that.onShow()
                  }
                });
              }, 100);
            }else{
              getApp().status_code(res)
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
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
    let that = this;
    let tokenData = wx.getStorageSync('tokenData');
    if(!tokenData.refresh_token){
      wx.redirectTo({
        url: '../login/login?url=../order/order',
      })
    }else{
      this.getOrderListArr(that.data.pageNum,that.data.pageSize)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      orderTorF:false,
      orderListArr:[],
      pageNum: 1,    //分页记录数
      pageSize:5,  //分页大小
      show: false
    })
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
    this.getOrderListArr(this.data.pageNum,this.data.pageSize)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})