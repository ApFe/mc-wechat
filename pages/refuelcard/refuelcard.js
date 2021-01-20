// pages/refuelcard/refuelcard.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns:["中石油卡","中石化卡"],
    active:'0',//控制当前显示盒子 
    refArr:'',
    mobile:'',
    oilCardNo:'',
    showreRollBox:false,
    PetroChinaArr:[{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 100,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 1100,
      price: 100,
      sold: true,
      title: "中石化加油卡直兑100元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 200,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 2100,
      price: 200,
      sold: true,
      title: "中石化加油卡直兑200元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 300,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 3100,
      price: 300,
      sold: true,
      title: "中石化加油卡直兑300元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 400,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 4100,
      price: 400,
      sold: true,
      title: "中石化加油卡直兑400元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 500,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 5100,
      price: 500,
      sold: true,
      title: "中石油加油卡直兑500元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石化"
      },
      code: "c35ddfde0a7c",
      denomination: 600,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 6100,
      price: 600,
      sold: true,
      title: "中石化加油卡直兑600元",
      type: "OIL_CARD",
    }],
    SinopecArr:[{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 100,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 1100,
      price: 100,
      sold: true,
      title: "中石油加油卡直兑100元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 200,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 2100,
      price: 200,
      sold: true,
      title: "中石油加油卡直兑200元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 300,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 3100,
      price: 300,
      sold: true,
      title: "中石油加油卡直兑300元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 400,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 4100,
      price: 400,
      sold: true,
      title: "中石油加油卡直兑400元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 500,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 5100,
      price: 500,
      sold: true,
      title: "中石油加油卡直兑500元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 600,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 6100,
      price: 600,
      sold: true,
      title: "中石油加油卡直兑600元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 700,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 7100,
      price: 700,
      sold: true,
      title: "中石油加油卡直兑700元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 800,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 8100,
      price: 800,
      sold: true,
      title: "中石油加油卡直兑800元",
      type: "OIL_CARD",
    },{
      category:{
        name: "中石油"
      },
      code: "c35ddfde0a7c",
      denomination: 1000,
      icon: "http://oss.ecashback.com.cn/integralmall/img/jiayouka.jpg",
      point: 11000,
      price: 1000,
      sold: true,
      title: "中石油加油卡直兑1000元",
      type: "OIL_CARD",
    }]
  },
  toggle:function(e){
    this.setData({
 
      //设置active的值为用户点击按钮的索引值
 
      active:e.currentTarget.dataset.index,
      mobile:'',
      oilCardNo:'',
 
    })
 
  },
  rechbeTrue:function(e){
    let that = this
    let mobile = that.data.mobile
    let oilCardNo = that.data.oilCardNo
    let code = that.data.showArr.code
    let point = that.data.showArr.point 
    let denomination = that.data.showArr.denomination
    let controlnavigateBack = 'RechargeCardController'
    let description 
    if(that.data.active==='0'){
      description= that.data.showArr.name+'中石油卡'
    }else{
      description= that.data.showArr.name+'中石化卡'
    }
    
    app.virtualordersPost(description,code,1,mobile,oilCardNo,'OIL_CARD',true).then(res => {
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
  rfcardpInput:function(e){
    let PetroChina = /^9/;
    let Sinopec = /^1/;
    if(this.data.active==='0'&&PetroChina.test(e.detail.value)&&e.detail.value.length===16){
      this.setData({
        oilCardNo:e.detail.value
      })
    }
    
  },
  rfcardsInput:function(e){
    let PetroChina = /^9/;
    let Sinopec = /^1/;
    if(this.data.active==='1'&&Sinopec.test(e.detail.value)&&e.detail.value.length===19){
      this.setData({
        oilCardNo:e.detail.value
      })
    }
    
  },
  rfphonepInput:function(e){
    if(e.detail.value.length==11){
      this.setData({
        mobile:e.detail.value
      })
    }
    
  },
  rfphonesInput:function(e){
    if(e.detail.value.length==11){
      this.setData({
        mobile:e.detail.value
      })
    }
  },
  closrechclose:function(e){
    this.setData({
      showreRollBox:false
    })
  },
  chooseClick: function (e) {
    let that = this;
    let PetroChina = /^9/;
    let Sinopec = /^1/;
    let index = e.currentTarget.dataset.index;//获取当前点击的元素下标
    let sold = e.currentTarget.dataset.sold;//获取当前点击的元素下标
    let mobile=that.data.mobile
    let active=that.data.active
    let oilCardNo=that.data.oilCardNo
    let talIntegral = e.currentTarget.dataset.point
    if(mobile&&mobile.length==11&&!sold){
      if(active==='0'&&PetroChina.test(oilCardNo)&&oilCardNo.length===16){
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
                "rechargeInput":oilCardNo,
                "mobile":mobile,
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
      }else if(active==='1'&&Sinopec.test(oilCardNo)&&oilCardNo.length===19){
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
                "rechargeInput":oilCardNo,
                "mobile":mobile,
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
        
        wx.showToast({
          title:that.data.active==='0'?'请检查16位中石油卡号是否正确':'请检查19位中石化卡号是否正确',
          icon: 'none',
          duration: 3000
        });
      }
    }else{
      if(sold){
        wx.showToast({
          title: '商品已售罄',
          icon: 'none',
          duration: 3000
        });
        return;
      }
      wx.showToast({
        title: '请检查手机号码...',
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
    let that = this;
    let PetroChinaArr = []
    let SinopecArr = []
    app.mobileRecharge('OIL_CARD').then(res => {
      wx.hideLoading()
      if(res.data.length>=1){
        res.data.forEach(element => {
          if(element.category.name=='中石油'){
            PetroChinaArr.push(element)
          }else if(element.category.name=='中石化'){
            SinopecArr.push(element)
          }
        })
        that.setData({
          refArr:res.data,
          PetroChinaArr:PetroChinaArr,
          SinopecArr:SinopecArr
        })
      }else{
        getApp().status_code(res)
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