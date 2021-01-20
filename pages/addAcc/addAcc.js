// pages/addAcc/addAcc.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seachInput:'',
    seachCardsList:'',
    seachCardsListNone:false
  },
  rollinNameInput:function(e){//rollinaccKey
    if(e.detail.value.length>5){
      this.setData({
        seachInput:e.detail.value
      })
    }else{
      this.setData({
        seachInput:''
      })
    }
    
  },
  seachCards:function(event){
    let certificateNo = this.data.seachInput
    let that = this;
    if(certificateNo){
      app.accountCards('','search',certificateNo).then(res => {
        console.log('certificate--->',res)
        console.log('certificate--->',res.data.cards.length)
        wx.hideLoading()
        if(res.statusCode==200){
          if(res.data.cards.length>0){
            that.setData({
              seachCardsListNone:false,
              seachCardsList:res.data.cards
            })
          }else{
            that.setData({
              seachCardsListNone:true,
              seachCardsList:''
            })
          }
          
        }else{
          getApp().status_code(res)
        }
      })
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '请输入证件号码...',
          icon: 'none',
          duration: 3000
        });
      }, 100);
      
    }
    
    
  },
  addAcccar:function(event){
    let bound=event.currentTarget.dataset.bound
    console.log('bound==',event)
    if(!bound){
      let seachInput=this.data.seachInput
      let type=event.currentTarget.dataset.type
      let mobile=event.currentTarget.dataset.mobile

      let cardno = event.currentTarget.dataset.cardno
      wx.navigateTo({
        url: '../addAcc/addAccadd',
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
          let idCardValid = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
          let isHKCard = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
          let isTWCard = /^[a-zA-Z0-9]{10}|^\d{18}$/;
          let isPassPortCard = /^([a-zA-z]|[0-9]){5,17}$/;
          let isOfficerCard = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
          let status
          if(idCardValid.test(seachInput)===true||isHKCard.test(seachInput)===true||isTWCard.test(seachInput)===true){
            status='身份证'
          }else if(isPassPortCard.test(seachInput)===true){
            status='护照'
          }else if(isOfficerCard.test(seachInput)===true){
            status='军官证'
          }else{
            status='未知'
          }
          
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: {seachInput:seachInput,status:status,type:type,mobile:mobile,cardNo:cardno} })
        }
      })
      this.setData({
        addAccfind:false
      })
    }else{
      wx.showToast({
        title: '此账户已绑定，不可添加',
        icon: 'none',
        duration: 3000
      });
    }
    
  },
  contactSupport:function(event){
    getApp().contactSupport()
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