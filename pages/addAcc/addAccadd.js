// pages/addAcc/addAccadd.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    cardHolder:'',
    identity:'',
    status:'',
    type:'',
    mobile:'',
    transactionNo:'',
    cardNo:'',
    counttime:'获取验证码',
    mobileshow:false
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  identityInput:function(e){
    this.setData({
      identity: e.detail.value
    })
  },
  holderInput:function(e){
    this.setData({
      cardHolder: e.detail.value
    })
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
  smsend:function(event){
    let that=this;
    let cardHolder = that.data.cardHolder
    let identity = that.data.identity
    let type = that.data.type
    let certificate = that.data.seachInput
    let cardNo = that.data.cardNo
    if((type&&identity)||(type=='NAME'&&identity&&cardHolder)){
      if(that.data.counttime=='获取验证码'||that.data.counttime=='重新发送'){
        // app.cadsCaptcha(cardHolder,certificate,identity,type).then(res => {
        //   wx.hideLoading()
        //   if(res.statusCode!=200){
        //       getApp().status_code(res)
        //   }else{
        //     that.setData({
        //       mobileshow:true,
        //       mobile:res.data.receiver
        //     })
        //     countDown(that,90);
        //   }
        // })
        app.cadsBind('', '', cardHolder, '', certificate, identity, type, true,false).then(res => {
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
  submitBt:function(event){
    let that=this;
    let captcha = that.data.message
    let captchaTransactionNo = that.data.transactionNo
    let cardHolder = that.data.cardHolder
    let cardNo = that.data.cardNo
    let certificate = that.data.seachInput
    let identity = that.data.identity
    let type = that.data.type
    if((type&&captcha&&identity)||(type=='NAME'&&captcha&&identity&&cardHolder)){
        app.cadsBind(captcha, captchaTransactionNo, cardHolder, '', certificate, identity, type, false,false).then(res => {
          wx.hideLoading()
          if(res.statusCode==200){
            setTimeout(() => {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 3000,
                success:function(){
                  wx.switchTab({
                    url: '../mine/mine'
                  })
                }
              });
            }, 100);
          }else{
            getApp().status_code(res)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
        that.setData({
          seachInput:data.data.seachInput,
          status:data.data.status,
          type:data.data.type,
          cardNo:data.data.cardNo
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