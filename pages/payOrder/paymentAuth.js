// pages/payOrder/paymentAuth.js
var app=getApp()
var Interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payaccList: '',
    pammsgboxshow:false,
    counttime:90,
    msgcodeinp:''
  },
  backBtn:function(event){
    if(this.data.controlnavigateBack =='RechargeCardController'||this.data.controlnavigateBack =='OrderController'){
      wx.navigateBack({
        delta: 1
      })
    }else if(this.data.controlnavigateBack=='PayOrderController'){

    }else{
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },
  paySendInput:function(e){
    this.setData({
      msgcodeinp: e.detail.value,
      msgcodeinplength: e.detail.cursor
    })
  },
  radioChange: function (e) {
    let valueArr=[]
    let a=e.detail.value
    valueArr=a.split('#')
    if(valueArr[0]-this.data.point>=0){
      this.setData({
        payments:[{
          method:'POINT',
          cardNo:valueArr[1]
        }]
      })
    }else{
      wx.showToast({
        title: '当前账户余额不足，请更换其他账户...',
        icon: 'none',
        windowIsBang:'',
        duration: 3000
      });
    }
    
  },
  submitPam:function(event){
    let that =this
    if(that.data.payments){
      that.setData({
        pammsgboxshow:true
      })
      that.smgsend()
    }
          
      
    
  },
  smgsend:function(event){
    let that=this;
    let tradeNo = this.data.items[0].tradeNo;
    if(this.data.counttime!='重新发送'){
      if (this.data.pammsgboxshow==true) {
        app.tradeNocaptcha(tradeNo).then(res =>{
          wx.hideLoading()
          if(res.statusCode==200){
            that.setData({
              mobileuser:res.data.receiver
            })
            countDown(that,90);
          }else{
            getApp().status_code(res)
          }
        })
      } 
    }else{
      app.tradeNocaptcha(tradeNo).then(res => {
        wx.hideLoading()
        if(res.statusCode==200){
          that.setData({
            mobileuser:res.data.receiver
          })
          countDown(that,90);
        }else{
          getApp().status_code(res)
        }
      })
    }
    
  },
  pamsendSess:function(e){
    let that = this
    let captcha = this.data.msgcodeinp
    let captchalength = this.data.msgcodeinplength-6
    if(captcha&&captchalength==0){
      let tradeNo = this.data.items[0].tradeNo;
      let cardNo = this.data.payments[0].cardNo;
      let point = this.data.point;
      let payMethod = this.data.payMethod;
      that.setData({
        msgcodeinplength:0
      })
      if(captcha&&cardNo&&point&&tradeNo&&payMethod){
        app.orderPay(captcha,cardNo,point,tradeNo,payMethod).then(res => {
          wx.hideLoading()
          if(res.statusCode==200){
            let payStatus = res.data
            wx.reLaunch({
              url: '../payMsg/payMsg?description=charge&payStatus='+payStatus.status+'&tradeNo='+tradeNo,
              success: function(res) {
                // 通过eventChannel向被打开页面传送数据
                // res.eventChannel.emit('acceptDataFromOpenerPage', { data: {payStatus:payStatus,} })
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
      }else{
        wx.showToast({
          title: '未知异常，请联系客服',
          icon: 'none',
          duration: 3000
        });
      }
      
    }else{
      return
    }
    
    
  },
  pamclosesmgsend:function(e){
    let tradeNo = this.data.items[0].tradeNo
    wx.navigateTo({
      url: '../orderDetail/orderDetail?tradeNo='+tradeNo,
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
    this.setData({
      pammsgboxshow:false
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
        that.setData({
          items:[
            {
              tradeNo:data.data.tradeNo
            }
          ],
          price:data.data.price,
          point:data.data.inPrice,
          description:data.data.description,
          expired:data.data.expired,
          payMethod:data.data.payMethod,
          controlnavigateBack:data.data.controlnavigateBack
        })
        let time = data.data.expired
        time = time.replace(/-/g,':').replace(' ',':');
        time = time.split(':');
        let time1 = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
        let cunt_time= time1.getTime()-new Date().getTime()
        that.count_down(cunt_time)

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    let bound = true
    getApp().accountCards(bound).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          payaccList:res.data
        })
        
      }else{
        getApp().status_code(res)
      }
      
    })
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
function countDown(that, count) {
  if (count == 0) {
   that.setData({
    counttime: '重新发送'
   })
   return;
  }
  that.setData({
   counttime: count
  })
  setTimeout(function () {
   count--;
   countDown(that, count);
  }, 1000);
 0
 }