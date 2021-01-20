// pages/union/bindAcc.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindType:'',
    accNo:'',
    idCard:'',
    message:'',
    mobile:'',
    transactionNo:'',
    counttime:'获取验证码',
    mobileshow:''
  },
  bindAccInput:function(e){
    this.setData({
      accNo: e.detail.value
    })
  },
  bindidCarInput:function(e){
    if(e.detail.value.length>5){
      this.setData({
        idCard: e.detail.value
      })
    }else{
      this.setData({
        idCard: ''
      })
    }
  },
  smsInput:function(e){
    if(e.detail.value.length==6){
      this.setData({
        message: e.detail.value
      })
    }else{
      this.setData({
        message: ''
      })
    }
    
  },
  sendBindmsg:function(e){
    let that=this;
    let certificate = that.data.idCard;
    let identity = that.data.accNo;
    let type = that.data.bindType;
    let cardNo = that.data.cardno;
    if(certificate&&identity){
      if(that.data.counttime=='获取验证码'||that.data.counttime=='重新发送'){
        app.cadsBind('', '', '', cardNo, certificate, identity, type, true,true).then(res => {
          wx.hideLoading()
          if(res.statusCode==200){
            console.log('cadsBind===',res.data.cardNo)
            return app.commonCaptcha(res.data.cardNo,'','GENERAL').then(res => {
              wx.hideLoading()
              if(res.statusCode!=200){
                  getApp().status_code(res)
              }else{
                that.setData({
                  mobileshow:true,
                  mobile:res.data.receiver,
                  transactionNo:res.data.transactionNo
                })
                countDown(that,90);
              }
            })
          }else{
            getApp().status_code(res)
          }
        })
        
      }else{
        return
      }
    }else{
      wx.showToast({
        title: '请输入相关信息...',
        icon: 'none',
        duration: 3000
      });
    }
  },
  submitBindBt:function(event){
    let that=this;
    let captcha, captchaTransactionNo, cardno, certificate, identity, type;
     certificate = that.data.idCard;
     identity = that.data.accNo;
     cardno = that.data.cardno;
     type = that.data.bindType;
     captcha = that.data.message;
     captchaTransactionNo = that.data.transactionNo;
    if((type&&captcha&&identity)||(type=='NAME'&&captcha&&identity)){
        app.cadsBind(captcha, captchaTransactionNo, '', cardno, certificate, identity, type, false,true).then(res => {
          wx.hideLoading()
          if(res.statusCode!=200){
              getApp().status_code(res)
          }else{
            setTimeout(() => {
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 3000,
                success:function(){
                  wx.switchTab({
                    url: '../mine/mine'
                  })
                }
              });
            }, 100);
            
           
          }
        })
    }else{
      // wx.showToast({
      //   title: '请输入相关信息...',
      //   icon: 'none',
      //   duration: 3000
      // });
    }
    
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
        that.setData({
          bindType:data.data.carstype,
          accnoOrloginNam:data.data.accnoOrloginNam,
          cardno:data.data.cardno
        })
      
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