// pages/recharge/rechargeTal.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeInput:'',
    showreRollBox:false,
    changeArr:[{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 10,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 1000,
      price: 10,
      sold: true,
      title: "10元兑换券",
      type: "MOBILE_CARD",
    },{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 20,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 2000,
      price: 20,
      sold: true,
      title: "20元兑换券",
      type: "MOBILE_CARD",
    },{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 30,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 3000,
      price: 30,
      sold: true,
      title: "20元兑换券",
      type: "MOBILE_CARD",
    },{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 50,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 5000,
      price: 50,
      sold: true,
      title: "50元兑换券",
      type: "MOBILE_CARD",
    },{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 100,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 10000,
      price: 100,
      sold: true,
      title: "100元兑换券",
      type: "MOBILE_CARD",
    },{
      category: null,
      code: "5b6fe4526b9c",
      denomination: 200,
      icon: "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/NJFH-3netcomTel10201901251039390560main.jpg",
      point: 20000,
      price: 200,
      sold: true,
      title: "200元兑换券",
      type: "MOBILE_CARD",
    }],
    chose_Id:-1,
    showArr:{}
  },
  closrechclose:function(e){
    this.setData({
      showreRollBox:false
    })
  },
  rechbeTrue:function(e){
    let that = this
    let mobile = that.data.rechargeInput
    let code = that.data.showArr.code
    let point = that.data.showArr.point 
    let denomination = that.data.showArr.denomination
    let description = that.data.showArr.name+'话费兑换'
    let controlnavigateBack = 'RechargeCardController'
    app.virtualordersPost(description,code,1,mobile,'','MOBILE_CARD',true).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        let tradeNo = res.data.tradeNo
        let expired = res.data.expiredAt
        let payMethod = res.data.payMethod
        that.setData({
          showreRollBox:false
        })
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
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  rechargeInput:function(e){
      this.setData({
        rechargeInput:e.detail.value
      })
  },
  delrechargeInput:function(e){
    this.setData({
      rechargeInput:''
    })
  },
  chooseClick: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;//获取当前点击的元素下标
    let sold = e.currentTarget.dataset.sold;//当前是否可以充值
    let rechargeInput=that.data.rechargeInput
    let talIntegral = e.currentTarget.dataset.point
    if(rechargeInput&&rechargeInput.length==11&&!sold){

      let tokenData = wx.getStorageSync('tokenData');
      if(!tokenData.refresh_token){
        wx.navigateTo({
          url: '../login/login',
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
            // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
          },
          fail: function(res) {
            
            console.log('fail'+JSON.stringify(res))
          },
          complete: function(res) {
            console.log('complete'+JSON.stringify(res))
          },
        })
      }else{
        let tureArr=[]
        that.data.tureArrbalance.forEach((items,index) => {
          if(items-talIntegral>=0){
            tureArr.push(1)
          }
        })
        if(tureArr.length>=1){
          that.setData({
            showreRollBox:true,
            chose_Id: index,
            showArr:{
              "denomination":e.currentTarget.dataset.denomination,
              "code":e.currentTarget.dataset.code,
              "name":e.currentTarget.dataset.denomination+'元',
              "point":e.currentTarget.dataset.point,
              "rechargeInput":rechargeInput
            }
          })
        }else{
          setTimeout(() => {
            wx.showToast({
              title: '积分不足...',
              icon: 'none',
              duration: 3000
            });
          }, 100);
        }
      }
    }else{
      if(!sold){
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          duration: 3000
        });
      }else{
        wx.showToast({
          title: '此商品已售罄',
          icon: 'none',
          duration: 3000
        });
      }
      
    }
    
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
    let mobile=wx.getStorageSync('userInfo').mobile
    if(mobile){
      this.setData({
        rechargeInput:mobile
      })
    }
    let that = this;
    app.mobileRecharge('MOBILE_CARD').then(res => {
      wx.hideLoading()
      if(res.data.length>=1){
        that.setData({
          changeArr:res.data
        })
      }
      
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
    }
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