// pages/login/login.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginMobile:false,
    userInfo:'',
    counttime:'获取验证码',
    smgnum:'',
    goIndex:'',
    loginOauthTrue:false,
    loginCodeTrue:false,
    loginbtn:true
  },
  iphonInput:function(e){
    let that = this
    that.setData({
      userInfo:{
        mobile:e.detail.value
      }
    })
  },
  msgInput:function(e){
    let that = this
    if(e.detail.value.length==6){
      that.setData({
        smgnum:e.detail.value,
        loginOauthTrue:true
      })
    }else{
      that.setData({
        smgnum:'',
        loginOauthTrue:false
      })
    }
    
  },
  getPhoneNumber(e) {
    console.log('bindGetUserInfo=====',e)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    let that=this
    let encryptedData = e.detail.encryptedData
    let iv = e.detail.iv
    if(e.detail.encryptedData&&e.detail.iv){
      app.getusermsg(encryptedData,iv).then(res => { 
        console.log('userMsg==',res);
        wx.hideLoading()
        if(res.statusCode==200){
          that.loginCode()
        }else{
          getApp().status_code(res)
        }
      });
    }else{
      setTimeout(() => {
        wx.showToast({
          title: '请确认当前微信已绑定手机号~~',
          icon: 'none',
          duration: 3000
        });
      }, 100);
    }
  },
  loginCode(event){
    let that = this;
    
    if(!that.data.loginbtn){
       return
    }
    that.setData({
      loginbtn:false
    })
    let pages = getCurrentPages(); //当前页面
    console.log('loginCode===pages==',pages)
    let prevPage = pages[pages.length - 2];
    console.log('loginCode===prevPage==',prevPage)
    let rotePage
    if(prevPage){
      rotePage = prevPage.route.replace('pages','..')
    }
    return app.getToken('','','password','code').then(res => {
      wx.hideLoading()
      if(res.statusCode!=200){
        getApp().status_code(res)
        that.setData({
          loginOauthTrue:true,
          loginbtn:true
        })
      }else{
        that.setData({
          goIndex:true,
          loginbtn:true
        })
        // wx.setStorageSync('userInfo', that.data.codeUserInfo)
        wx.setStorageSync('codeLogin',true)
        if(rotePage=='../recharge/rechargeTal'){
          wx.navigateBack({
            delta: 1
          })
        }else if(that.data.backPage){
          wx.switchTab({
            url: that.data.backPage
          })
        }else{
          wx.navigateBack({
            delta: 1,
            success: function (e) { 
              var page = getCurrentPages().pop(); 
              if (page == undefined || page == null) return; 
              page.onLoad(); 
            } 
          })
        }
          
        
      }
    })
  },
  smgsend:function(event){
    let that=this;
    if(that.data.counttime=='获取验证码'||that.data.counttime=='重新发送'){
      app.sendSmg(that.data.userInfo.mobile,'LOGIN').then(res => {
        wx.hideLoading()
        if(res.statusCode==200){
          countDown(that,90);
        }else{
          getApp().status_code(res)
        }
      })
    }else{
      return
    }
  },
  loginOauth:function(event){
    let that = this
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; 
    // console.log('loginOauth===',prevPage)
    let rotePage
    if(prevPage){
      rotePage = prevPage.route.replace('pages','..')
    }
    if(that.data.loginOauthTrue==true){
      that.setData({
        loginOauthTrue:false
      })
      app.getToken(that.data.smgnum,that.data.userInfo.mobile,'password').then(res => {
        wx.hideLoading()
        if(res.statusCode!=200){
          getApp().status_code(res)
          that.setData({
            loginOauthTrue:true
          })
        }else{
          that.setData({
            goIndex:true
          })
          wx.setStorageSync('userInfo', that.data.userInfo)
          if(rotePage=='../recharge/rechargeTal'){
            wx.navigateBack({
              delta: 1
            })
          }else if(that.data.backPage){
            wx.switchTab({
              url: that.data.backPage
            })
          }else{
            wx.navigateBack({
              delta: 1,
              success: function (e) { 
                var page = getCurrentPages().pop(); 
                if (page == undefined || page == null) return; 
                page.onLoad(); 
              } 
            })
          }
            
        }
      })
    }
    
    
  },
  lytprotocol:function(){
    wx.navigateTo({
      url: '../start/lytprotocol',
    })
  },
  iphonLogin:function(event){
    // let pages = getCurrentPages(); //当前页面
    // let prevPage = pages[pages.length - 2]; 
    // let rotePage = prevPage.route.replace('pages','..')
    // console.log('curPages===',rotePage)
    // wx.switchTab({
    //   url: rotePage
    // })
    this.setData({
      loginMobile:true
    })
  },
  backBtn:function(event){
    // console.log('login---ceshi--fanhui--监听--02--',getCurrentPages())
    if(!this.data.goIndex){
      wx.reLaunch({
        url: '../index/index'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---------------",options)
    app.js_code()
    let that = this;
    let code = wx.getStorageSync('code');
    // console.log("==this is code=====",code)
    app.codeLogin(code).then(res => {
      console.log('code登录=====',res)
      if(res.statusCode==200){
        that.setData({
          loginCodeTrue:true,
          codeUserInfo:res.data,
          backPage:options.url
        })
        wx.setStorageSync('userInfo',res.data)
      }else{
        // getApp().status_code(res)
        that.setData({
          loginOauthTrue:true,
          backPage:options.url
        })
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
    let  windowIsBang = wx.getStorageSync('windowIsBang')
    this.setData({
      windowIsBang
    })
    
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
    console.log('login---ceshi--fanhui--监听--01--')
    let that = this;
    if(that.data.backPage&&!that.data.goIndex){
      console.log('login---ceshi--fanhui--监听--0125555--')
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this;
    // if(that.data.backPage&&!that.data.goIndex){
    //   wx.switchTab({
    //     url: that.data.backPage
    //   })
    // }
    // console.log('login---ceshi--fanhui--监听--02--')
    // let pages = getCurrentPages(); //当前页面
    // console.log('loginCode===pages==',pages)
    // let prevPage = pages[pages.length - 2];
    // console.log('loginCode===prevPage==',prevPage)
    // let rotePage
    // if(prevPage){
    //   rotePage = prevPage.route
    //   if((rotePage=='pages/order/order'||rotePage=='pages/mine/mine')&&!this.data.goIndex){
    //     console.log('rotePage======',rotePage)
    //     wx.switchTab({
    //       url: '../index/index',
    //       success:function(res) {
    //         console.log('success')
    //       },
    //       fail:function(res){
    //         console.log('fail')
    //       },
    //       complete:function(res){
    //           console.log('complete')
    //       }
    //     })
    //   }else{
    //     return
    //   }
    // }else{
    //   return
    // }

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