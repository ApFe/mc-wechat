var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acclistArr:{
      totalBalance:'0000',
      cards:[]
    },
    bindTab:true,
    delTab:false,
    cmbcCard:{
      availableBalance:'000.00'
    },
    cmbc:false,
    cmbcqualification:false,
    authorizeCmbcEcard:false
  },
  goCmbc:function(){
    wx.navigateTo({
      url: '/openCard/pages/virtualBank/virtualBank',
    })
  },
  userPrivilege:function(){
    let that = this
    let tokenData = wx.getStorageSync('tokenData');
    let mobile = wx.getStorageSync('userInfo').mobile;
    if(tokenData.refresh_token){
      app.userPrivilege(mobile).then(res => {
        wx.hideLoading()
        if(res.statusCode==200){
          console.log('userIn===',res.data.minShengElectronicCard)
          that.setData({
              cmbcqualification:res.data.minShengElectronicCard,
              authorizeCmbcEcard:res.data.authorizeCmbcEcard
          })
          wx.setStorageSync('cmbcqualification', res.data.minShengElectronicCard)
          wx.setStorageSync('authorizeCmbcEcard', res.data.authorizeCmbcEcard)
        }else{
          getApp().status_code(res)
        }
      })
    }
  },
  goSetting:function(event){
    let cmbc = this.data.cmbc
    wx.navigateTo({
      url: '../personal/settings',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { cmbc: cmbc})
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goavailableBalance:function(e){
    let accountNo = e.currentTarget.dataset.accountno
    let type = e.currentTarget.dataset.type
    let cmbcCard = this.data.cmbcCard
    switch (type) {
      case 'cmbcblance':
        if(accountNo){
          wx.setStorageSync('cmbcaccountNo',accountNo)
          wx.navigateTo({
            url: '/wallet/pages/walletIndex/walletIndex',
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              
            }
          });
          return
        }
        wx.showToast({
          title: '加载中·····',
          icon: 'none',
          duration: 3000
        });
        break;
    
      default:
        wx.showToast({
          title: '敬请期待·····',
          icon: 'none',
          duration: 3000
        });
        break;
    }
    
  },
  delCarshow:function(e){
    console.log('==delCarshow===',e)
  //   wx.navigateTo({
  //     url: '/wallet/pages/walletIndex/walletIndex',
  //   })
  let that = this
  let idx = e.currentTarget.dataset.index;
  let totalBalance = this.data.acclistArr.totalBalance
  let list = this.data.acclistArr.cards;
  
        list.forEach((item,index,arr) => {
          if(index==idx&&item.deleted==false){
            item.deleted=true
          }else if(index==idx&&item.deleted==true){
            item.deleted=false
          }
        });
        that.setData({
          acclistArr:{
            totalBalance:totalBalance,
            cards:list
          }
        })
    
    
  },
  goBandAccCar:function(e){
    let carstype =e.currentTarget.dataset.type
    let mobile =e.currentTarget.dataset.mobile
    let cardno =e.currentTarget.dataset.cardno
    let accnoOrloginNam
    if(carstype=='WEB'){
      accnoOrloginNam = e.currentTarget.dataset.loginname
    }else if(carstype=='NAME'||carstype=='MINSHENG_NAME'){
      accnoOrloginNam = e.currentTarget.dataset.namecardno
    }
    
    wx.navigateTo({
      url: '../union/bindAcc',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: {carstype:carstype,mobile:mobile,accnoOrloginNam:accnoOrloginNam,cardno:cardno} })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goOpenCmbc:function(event) {
    let goUrl = event.currentTarget.dataset.gourl
    wx.navigateTo({
      url: goUrl,
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
      }
    });
  },
  goTransfer:function(event){
    wx.navigateTo({
      url: '../transfer/transfer',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goIntegral:function(){
    wx.navigateTo({
      url: '../integral/recharge',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goAcclist:function(event){
    wx.navigateTo({
      url: '../accountsList/acclist',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goAddAcc:function(event){
    wx.navigateTo({
      url: '../addAcc/addAcc',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
        },
        someEvent: function(data) {
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  numberToFixed:function(value,type){
    if(type!='12'){
      if(type=='NAME'||'MINSHENG_NAME'){
        var str1 = value.substring(4,-2)
      }else if(type=='WEB'){
        var str1 = value.substring(2,-2)
      }else{
        var str1 = value.substring(3,-2)
      }
      var str2 = value.substring(value.length-4,value.length)
      var str = str1+'****'+str2
    }else{
      var str2 = value.substring(value.length-4,value.length)
      var str = '(尾号'+str2+')'
    }
    
    
    return str
  },
  godeleteAccCar:function(event){
    let that = this;
    this.setData({
    //   delete:true,
      deleteNam:event.currentTarget.dataset.type,
      deleteNum:event.currentTarget.dataset.loginname,
      nameCardNo:event.currentTarget.dataset.namecardno,
      deleteNo:event.currentTarget.dataset.cardno,
    })
    let nameCardNo=event.currentTarget.dataset.namecardno
    let deleteNol=event.currentTarget.dataset.loginname
    let deleteNam=that.numberToFixed(nameCardNo,event.currentTarget.dataset.type)
    let deleteNum=that.numberToFixed(deleteNol,event.currentTarget.dataset.type)
    wx.showModal({
      title: '您是否确认要删除积分账户',
      content: event.currentTarget.dataset.type=='WEB'?'网站主账户：'+deleteNum:'联名卡账户：'+deleteNam,
      success (res) {
        if (res.confirm) {
          that.delSess()
        } else if (res.cancel) {
        }
      }
    })
    
  },
  closeDelete:function(event){
    let that = this;
    that.setData({
      delete:false
    })
    that.onShow()
  },
  delSess:function(event){
    let that = this;
    let cardNo = this.data.deleteNo
    app.deleteCads(cardNo).then(res => {
      wx.hideLoading()
      if(res.statusCode==204){
        setTimeout(() => {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              that.setData({
                delete:false
              })
              that.onShow()
            }
          });
        }, 100);
      }else{
        getApp().status_code(res)
      }
    })
    
  },
  contactSupport:function(e){
    // wx.navigateTo({
    //   url:'../start/start'
    // })
    app.contactSupport()
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
    let tokenData = wx.getStorageSync('tokenData');
    if(!tokenData.refresh_token){
      wx.redirectTo({
        url: '../login/login?url=../mine/mine',
      })
    }else{
      this.userPrivilege()
      let that = this;
      let acccardArr = []
      getApp().accountCards().then(res => {
        wx.hideLoading()
        if(res.statusCode==200){

          Promise.all(res.data.cards.map(function(elem){
            return new Promise(function(resolve, reject){
              acccardArr.push(elem.type)
              if(elem.type=='MINSHENG_NAME'){
                wx.removeStorageSync('openResult')
                that.setData({
                  cmbc:true
                })
                console.log('accountCards===+',res.data)
                app.cmbcgetAccountbalance(elem.accountNo+'/balance').then(res => {
                  console.log('cmbcgetAccountbalance==>==',res)
                  wx.hideLoading()
                  if(res.statusCode==200){
                    that.setData({
                      cmbcCard:res.data
                    })
                  }else{
                    getApp().status_code(res)
                  }
                })
              }
              resolve(acccardArr.includes('MINSHENG_NAME'));
          
            })
          
          
          
          })).then(function(data){
            
            console.log('data==',data)
            if(data.includes(true)){
              console.log('存在')
  
            }else{
              console.log('不存在')
              that.setData({
                cmbc:false,
                cmbcCard:''
              })
            }

            //在这就可以等所有的返回结果可以得到
          
          })
          

          // res.data.cards.forEach((item,index,arr) => {
          //   acccardArr.push(item.type)
          //   if(item.type=='MINSHENG_NAME'){
          //     wx.removeStorageSync('openResult')
          //     that.setData({
          //       cmbc:true
          //     })
          //     console.log('accountCards===+',res.data)
          //     app.cmbcgetAccountbalance(item.accountNo+'/balance').then(res => {
          //       console.log('cmbcgetAccountbalance==>==',res)
          //       wx.hideLoading()
          //       if(res.statusCode==200){
          //         that.setData({
          //           cmbcCard:res.data
          //         })
          //       }else{
          //         getApp().status_code(res)
          //       }
          //     })
          //   }
          //   return acccardArr
          // })
          
          console.log('acccardArr===',acccardArr)
          
          let openResult = wx.getStorageSync('openResult');
          that.setData({
            acclistArr:res.data,
            openResult:openResult
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