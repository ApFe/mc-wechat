// pages/orderDetail/orderDetail.js
var app=getApp()
var Interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  copyText:function(event){
    wx.setClipboardData({
      data:event.currentTarget.dataset.text,
      success:function(res){
        wx.getClipboardData({
          success:function(res){
            wx.showToast({
              title:'复制成功',
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    })
  },
  backBtn:function(event){
    wx.reLaunch({
      url: '../order/order'
    })
  },
  gohome:function(event){
    wx.reLaunch({
      url: '../index/index'
    })
  },
   // 倒计时
  count_down: function (countDown_time){
    let that = this;
    let timers = countDown_time/1000
    let day = parseInt(timers / (60 * 60 * 24));
    let hhh = Math.floor(timers % (60 * 60 * 24) / 3600);
    let mmm = Math.floor(timers % (60 * 60 * 24) % 3600 / 60);
    let sss = Math.floor(timers % (60 * 60 * 24) % 3600 % 60);
    this.setData({
      sss: (sss < 10) ? '0' + sss : sss,
      mmm: (mmm < 10) ? '0' + mmm : mmm,
      hhh: (hhh < 10) ? '0' + hhh : hhh
    })
    clearInterval(Interval)
    Interval = setInterval(function () {
      if (sss > 0) {
        sss--
      } else {
//         console.log('时间到')
        clearInterval(Interval)
      }
      if (sss == 0) {
        if (mmm > 0) {
          mmm--
          sss = 59;
        }
        if (mmm == 0 && hhh > 0) {
          hhh--
          sss = 59;
          mmm = 59;
        }
      }
      that.setData({
        sss: (sss < 10) ? '0' + sss : sss,
        mmm: (mmm < 10) ? '0' + mmm : mmm,
        hhh: (hhh < 10) ? '0' + hhh : hhh
      })
    }, 1000)
  },
  goPaymentAuth:function(){
    let tradeNo = this.data.orderDetail.tradeNo
    let payMethod = this.data.orderDetail.payMethod
    let expired = this.data.orderDetail.expiredAt
    let price = this.data.orderDetail.price
    let inPrice = this.data.orderDetail.point
    let controlnavigateBack = 'OrderController'
    let that = this
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
  OrderColorIcon:function(a){
    let ColorIconobjone={
      'CANCELLED':'已取消',
      'FAILED':'失败退款',
      'EXPIRED':'已过期'
    }
    let ColorIconobjtwo={
      'DISPATCHED':'已发货',
      'FINISHED':'已完成',
      'PAID':'付款成功'
    }
    let ColorIconobjthree={
      'NONE':'未知',
      'CONFIRMING':'待确认',
      'PAYING':'待付款',
      'PROCESSING':'处理中',
      'DISPATCHING':'待发货'
    }
    // console.log(ColorIconobjone['CONFIRMING'])
    if(ColorIconobjone[a]!=undefined){
      this.setData({
        colorIcon:'status_f',
        iconImg:'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/icon/err_icon.png'
      })
    }else if(ColorIconobjtwo[a]!=undefined){
      this.setData({
        colorIcon:'status_s',
        iconImg:'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/icon/sess_icon.png'
      })
    }else if(ColorIconobjthree[a]!=undefined){
      this.setData({
        colorIcon:'status_w',
        iconImg:'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/icon/writ_icon.png'
      })
    }else{
      this.setData({
        colorIcon:''
      })
    }
    
  },
  getStoreOrderDetail:function(a){
    let that = this;
    app.storeOrderDetail(a).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          orderDetail:res.data
        })
        that.OrderColorIcon(res.data.status)
        let time = res.data.expiredAt
        time = time.replace(/-/g,':').replace(' ',':');
        time = time.split(':');
        let time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
        let cunt_time= time1.getTime()-new Date().getTime()
        that.count_down(cunt_time)
      }else{
        getApp().status_code(res)
      }
    })
  },
  cancelOrders:function(event){
    let tradeNo = this.data.orderDetail.tradeNo
    let that=this
    wx.showModal({
      title: '您是否确认要取消当前订单',
      // content: deleteNam=='NAME'?'联名卡账户：'+deleteNam:'网站主账户：'+deleteNum,
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
    let tradeNo = this.data.orderDetail.tradeNo
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
                    wx.reLaunch({
                      url: '../order/order'
                    })
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
    let that = this
    that.setData({
      tradeNo:options.tradeNo
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
    let  windowIsBang = wx.getStorageSync('windowIsBang')
    let that = this
    this.setData({
      windowIsBang
    })
    that.getStoreOrderDetail(that.data.tradeNo)
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