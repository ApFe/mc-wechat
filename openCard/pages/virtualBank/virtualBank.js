// openCard/pages/virtualBank/virtualBank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeBtn:false,
    vitualdata:{
      "id": 6,
      "number": "201070020000000001",
      "cardNo": "6216923600888888",
      "mobile": "15858888888",
      "name": "乐益通",
      "type": "TWO",
      "availableBalance": null,
      "frozenAmount": null,
      "bankName": null,
      "bankNo": null,
      "bindCardNo": "4129637934134938",
      "bindBankName": "民生银行",
      "bindSingleLimit": 0,
      "bindDayLimit": 0,
      "bindTotalLimit": 0,
      "status": "NONE",
      "openedAt": "2020-07-20",
      "userId": 1
    },
    closebeTrue:false
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  contactSupport:function(event){
    app.contactSupport()
  },
  changeCard:function(e){
    let changeBtn = this.data.changeBtn
    if(changeBtn){
      this.setData({
        changeBtn:false
      })
      wx.setNavigationBarTitle({
        title:'银行电子账户'
      })
    }else{
      this.setData({
        changeBtn:true
      })
      wx.setNavigationBarTitle({
        title:'主卡'
      })
    }
    
  },
  changeBindMoble:function(e){
    console.log('change')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    passByvalue={
      'bankUrl':'changeMoble',
      'mobile':resultDate.mobile,
      'transactionNo':resultDate.number
    }
    wx.setStorageSync('passByvalue',passByvalue)
    wx.redirectTo({
      url: '/openCard/pages/controlBox/controlBox',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  changePassword:function(e){//修改电子账户密码
    console.log('changePassword')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    passByvalue={
      'bankUrl':'changePassword',
      'mobile':resultDate.mobile,
      'transactionNo':resultDate.number
    }
    wx.setStorageSync('passByvalue',passByvalue)
    wx.redirectTo({
      url: '/openCard/pages/controlBox/controlBox',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  retrievePassword:function(e){//找回电子账户密码
    console.log('retrievePassword')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    app.cmbcgetapplyresetApprovals(resultDate.number,'RESET_TRADE_PASSWORD').then(res => {
      wx.hideLoading()
      console.log('cmbcgetapplyresetApprovals===',res)
      console.log('cmbcgetapplyresetApprovals===',res.statusCode)
      if(res.statusCode==200){
        passByvalue={
          'bankUrl':'retrievePassword',
          'mobile':resultDate.mobile,
          'transactionNo':resultDate.number,
          'retrievestatus':res.data.status,
          'retrievedescription':res.data.description
        }
        wx.setStorageSync('passByvalue',passByvalue)
        wx.redirectTo({
          url: '/openCard/pages/controlBox/controlBox',
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
          }
        });
      }else if(res.statusCode==404){
        passByvalue={
          'bankUrl':'retrievePassword',
          'mobile':resultDate.mobile,
          'transactionNo':resultDate.number,
          'retrievestatus':'AUDITING',
          'retrievedescription':'您的交易密码重置申请已经提交，审核大约需要1-2个工作日，请您耐心等待。审核通过后，交易密码重置申请通过验证码将发送到您的手机，请注意查收。'
        }
        wx.navigateTo({
          url: '/openCard/pages/retrievePassword/cmbcPassword',
          events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {},
            someEvent: function(data) {}
          },
          success: function(res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { passByvalue: passByvalue })
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }else{
        getApp().status_code(res)
      }
    })
    
    // wx.setStorageSync('passByvalue',passByvalue)
    
  },
  unlockPassword:function(e){//电子账户密码解锁
    console.log('unlockPassword')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    passByvalue={
      'bankUrl':'unlockPassword',
      'mobile':resultDate.mobile,
      'transactionNo':resultDate.number
    }
    wx.setStorageSync('passByvalue',passByvalue)
    wx.redirectTo({
      url: '/openCard/pages/controlBox/controlBox',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  unlockAccount:function(e){//电子账户解锁
    console.log('unlockAccount')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    passByvalue={
      'bankUrl':'unlockAccount',
      'mobile':resultDate.mobile,
      'transactionNo':resultDate.number
    }
    wx.setStorageSync('passByvalue',passByvalue)
    wx.redirectTo({
      url: '/openCard/pages/controlBox/controlBox',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  closeAccbeTrue:function(e){
    let close_type = e.currentTarget.dataset.type;
    let that = this
    let closetf = this.data.closebeTrue
    let accNo = this.data.vitualdata.number+'/apply-close'
    let passByvalue,closeaccobj,number,mobile,applyClose
    number = this.data.vitualdata.number
    mobile = this.data.vitualdata.mobile
    that.setData({
      closebeTrue:!closetf
    })
    switch (close_type) {
      case 'beTrue':
        wx.showModal({
          title: '您是否确认要注销当前账户',
          // content: deleteNam=='NAME'?'联名卡账户：'+deleteNam:'网站主账户：'+deleteNum,
          success (res) {
            if (res.confirm) {
              app.applydeleteaccount(accNo).then(res => {
                wx.hideLoading()
                console.log('applydeleteaccount===',res)
                if(res.statusCode==200){
                  applyClose = res.data
                  switch (applyClose.status) {
                    case '99':
                      passByvalue = {
                        'bankUrl':'closeacc',
                        'passwordRandom':res.data.extensionData.pwdCmbc.random
                      }
                      closeaccobj={
                        'accountNo':res.data.serverTransactionNo,
                        'number':number,
                        'mobile':mobile,
                        'pwdCmbc':res.data.extensionData.pwdCmbc
                      }
                      wx.setStorageSync('closeaccobj',closeaccobj)
                      wx.setStorageSync('passByvalue',passByvalue)
                      wx.redirectTo({
                        url: '/openCard/pages/controlBox/controlBox',
                        success: function(res) {
                          // 通过eventChannel向被打开页面传送数据
                        }
                      });
                      break;
                  
                    default:
                      wx.setStorageSync('clossObj',res.data)
                      wx.redirectTo({
                        url: '/openCard/pages/cmbcClose/closeAccount',
                        success: function(res) {
                          
                        }
                      })
                      break;
                  }
                  
                }else{
                  getApp().status_code(res)
                }
              })
              // app.deleteaccount(accNo).then(res => {
              //   wx.hideLoading()
              //   if(res.statusCode==200){
              //     setTimeout(() => {
              //       wx.showToast({
              //         title: '销户成功',
              //         icon: 'success',
              //         duration: 3000,
              //         success:function(){
              //           wx.switchTab({
              //             url: '/pages/index/index'
              //           })
              //         }
              //       });
              //     }, 100);
              //   }else{
              //     getApp().status_code(res)
              //   }
              // })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
        break;
    
      default:
        break;
    }
  },
  closeAcc:function(e){
    this.setData({
      closebeTrue:true
    })
    
    
  },
  changemasterCard:function(e){
    console.log('changemasterCard')
    let resultDate,passByvalue
    resultDate = this.data.vitualdata
    passByvalue={
      'bankUrl':'changeMasterCard',
      'mobile':resultDate.mobile,
      'transactionNo':resultDate.number
    }
    wx.setStorageSync('passByvalue',passByvalue)
    wx.redirectTo({
      url: '/openCard/pages/controlBox/controlBox',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
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
    let that = this
    app.getaccountsdetail().then(res => {
      console.log('getaccountsdetail',res)
      wx.hideLoading()
      if(res.statusCode!=200){
        getApp().status_code(res)
      }else{
        that.setData({
          vitualdata:res.data
        })
      }
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