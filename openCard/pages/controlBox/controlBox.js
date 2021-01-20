// openCard/pages/controlBox/controlBox.js
import { HOST,HOSTSSO,HOSTpwd } from '../../../utils/config.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    mobile:'',
    counttime:'获取验证码',
    submit:false,
    gopwdconterlbtn:false,
    oldmobileshow:false,
    showActionsheet: false,
    code:''
    // groups: []
  },
  unlockAccountInput:function(e){
    console.log('unlockAccountholderInput===',e.currentTarget.dataset.type)
    let unlockInputType = e.currentTarget.dataset.type;
    let that = this;
    let unlokholder,unlokbankcard,unlokidentity,unlokmobile
    unlokholder = that.data.unlokholder
    unlokbankcard = that.data.unlokbankcard
    unlokidentity = that.data.unlokidentity
    unlokmobile = that.data.unlokmobile
    
    switch (unlockInputType) {
      case 'holder':
        that.setData({
          unlokholder:e.detail.value
        })
        if(unlokbankcard&&unlokidentity&&unlokmobile){
          that.setData({
            unlockpwdconterlbt:true
          })
        }
        break;
      case 'bankcard':
        if(e.detail.value.length>12){
          that.setData({
            unlokbankcard:e.detail.value
          })
        }else{
          that.setData({
            unlokbankcard:''
          })
        }
        if(unlokholder&&unlokidentity&&unlokmobile){
          that.setData({
            unlockpwdconterlbt:true
          })
        }
        break;
      case 'identity':
        if(e.detail.value.length==18){
          that.setData({
            unlokidentity:e.detail.value
          })
        }else{
          that.setData({
            unlokidentity:''
          })
        }
        if(unlokholder&&unlokbankcard&&unlokmobile){
          that.setData({
            unlockpwdconterlbt:true
          })
        }
        break;
      case 'mobile':
        if(e.detail.value.length==11){
          that.setData({
            unlokmobile:e.detail.value
          })
        }else{
          that.setData({
            unlokmobile:''
          })
        }
        if(unlokholder&&unlokbankcard&&unlokidentity){
          that.setData({
            unlockpwdconterlbt:true
          })
        }
        break;
    
      default:
        console.log('unlockAccountInput---default')
        break;
    }
  },
  bankcodeInput:function(e){
    if(e.detail.value.length==6){
      this.setData({
        gopwdconterlbtn:true,
        code: e.detail.value
      })
    }
  },
  bankcardInput:function(e){
    if(e.detail.value.length>12){
      this.setData({
        gopwdconterlbtn:true,
        newbankcard: e.detail.value
      })
    }
    
  },
  selectBank:function(event){
    this.setData({
      showActionsheet: true,
      chosTitle:'支持银行列表'
    })
    
  },
  close: function () {
    this.setData({
        showActionsheet: false
    })
  },
  sendBindmsg:function(e){
    let cmbcmobile = this.data.mobile
    let bankUrl = this.data.bankUrl
    let accountNo =this.data.accountNo
    let that = this
    // switch (bankUrl) {
    //   case 'open':
    //     accountNo= this.data.accountNo
    //     break;
    
    //   default:
    //     break;
    // }
    
    let cmbcMessagetype = cmbcMessagetypechenge(bankUrl);
    app.cmbcMessage(cmbcmobile,accountNo,cmbcMessagetype).then(res=>{
      console.log('cmbc新手机号Message===',res)
      wx.hideLoading()
      if(res.statusCode==201){
        countDown(that,90);
      }else{
        getApp().status_code(res)
      }
      
    })
  },
  sendBindoldmoble:function(e){
    let that = this
    let cmbcmobile = wx.getStorageSync('cmbcmobile')
    let accountNo = wx.getStorageSync('accountNo')
    app.cmbcMessage(cmbcmobile,accountNo,'CHANGE_MOBILE').then(res=>{
      console.log('cmbcMessage===',res)
      wx.hideLoading()
      if(res.statusCode==201){
        countDown(that,90);
      }else{
        getApp().status_code(res)
      }
    })
  },
  changeMsmsInput:function(e){
    if(e.detail.value.length==6){
      this.setData({
        changeMsms:e.detail.value
      })
    }
  },
  bindnewMobleInput:function(e){
    if(e.detail.value.length==11){
      this.setData({
        gopwdconterlbtn:true,
        bindnewMoble:e.detail.value
      })
    }
  },
  changeFunpwd:function(bankUrl){
    let that = this;
    let mobile,changeMsms,bindnewMoble,newBindMm,newbankcard,random,accountNo,oldPasswordRandom,code,unlockPassword,unlockAccount,resetPasswordRandom;
    return ({
      changeMoble:function(){
        // let mobile,changeMsms,bindnewMoble,newBindMm,random
        mobile = that.data.mobile
        changeMsms = that.data.changeMsms
        bindnewMoble = that.data.bindnewMoble
        if(mobile&&changeMsms&&bindnewMoble){
          app.getpwdrandomNo().then(res=>{
            console.log('getpwdrandomNo===',res)
            if(res.statusCode!=200){
              getApp().status_code(res)
              
            }else{
              newBindMm = {
                mobile : mobile,
                changeMsms : changeMsms,
                bindnewMoble : bindnewMoble,
                randJnlNo:res.data.randJnlNo,
                random:res.data.random
              }
              random = encodeURIComponent(res.data.random)
              wx.setStorageSync('newBindMm', newBindMm);
              that.setData({
                url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
                gopwdconterl:true
              })
            }
          })
        }
      },
      changeMasterCard:function(){
        // let mobile,accountNo,newbankcard,newBindMm,random
        accountNo = wx.getStorageSync('accountNo')
        newbankcard = that.data.newbankcard
        if(newbankcard){
          app.cmbcapplychangeAccMasterCard(accountNo+'/apply-bind-card').then(res=>{
            console.log('cmbcapplychangeAccMasterCard===',res)
            if(res.statusCode!=200){
              getApp().status_code(res)
              
            }else{
              newBindMm = {
                mobile : that.data.mobile,
                newbankcard : newbankcard,
                randJnlNo:res.data.randJnlNo,
                random:res.data.random,
                serverTransactionNo:res.data.serverTransactionNo
              }
              random = encodeURIComponent(res.data.random)
              wx.setStorageSync('newBindMm', newBindMm);
              that.setData({
                url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
                gopwdconterl:true
              })
            }
          })
        }
      },
      changePassword:function(){
        mobile = that.data.mobile
        app.getpwdrandomNo().then(res=>{
          console.log('changePassword====getpwdrandomNo===',res)
          if(res.statusCode!=200){
            getApp().status_code(res)
            
          }else{
            oldPasswordRandom = {
              mobile : mobile,
              randJnlNo:res.data.randJnlNo,
              random:res.data.random
            }
            random = encodeURIComponent(res.data.random)
            wx.setStorageSync('oldPasswordRandom', oldPasswordRandom);
            that.setData({
              url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
              gopwdconterl:true
            })
          }
        })
      },
      retrievePassword:function(){
        mobile = that.data.mobile
        code = that.data.code
        if(code){
          app.getpwdrandomNo().then(res=>{
            console.log('changePassword====getpwdrandomNo===',res)
            if(res.statusCode!=200){
              getApp().status_code(res)
              
            }else{
              resetPasswordRandom = {
                code:code,
                mobile : mobile,
                randJnlNo:res.data.randJnlNo,
                random:res.data.random
              }
              random = encodeURIComponent(res.data.random)
              wx.setStorageSync('resetPasswordRandom', resetPasswordRandom);
              that.setData({
                url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
                gopwdconterl:true
              })
            }
          })
        }
        
      },
      unlockPassword:function(){
        app.getpwdrandomNo().then(res=>{
          console.log('changePassword====getpwdrandomNo===',res)
          if(res.statusCode!=200){
            getApp().status_code(res)
            
          }else{
            unlockPassword = {
              mobile : mobile,
              randJnlNo:res.data.randJnlNo,
              random:res.data.random
            }
            random = encodeURIComponent(res.data.random)
            wx.setStorageSync('unlockPassword', unlockPassword);
            that.setData({
              url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
              gopwdconterl:true
            })
          }
        })
      },
      unlockAccount:function(){
        let unlokholder,unlokbankcard,unlokidentity,unlokmobile
        unlokholder = that.data.unlokholder
        unlokbankcard = that.data.unlokbankcard
        unlokidentity = that.data.unlokidentity
        unlokmobile = that.data.unlokmobile
        app.getpwdrandomNo().then(res=>{
          console.log('changePassword====getpwdrandomNo===',res)
          if(res.statusCode!=200){
            getApp().status_code(res)
            
          }else{
            unlockAccount = {
              mobile : unlokmobile,
              randJnlNo:res.data.randJnlNo,
              random:res.data.random,
              unlokholder:unlokholder,
              unlokbankcard:unlokbankcard,
              unlokidentity:unlokidentity
            }
            random = encodeURIComponent(res.data.random)
            wx.setStorageSync('unlockAccount', unlockAccount);
            that.setData({
              url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+bankUrl+'&passwordRandom='+random,
              gopwdconterl:true
            })
          }
        })
      }
    }[bankUrl] || function(){console.log('我是默认值');})();
  },
  gopwdconterlbt:function(e){
    if(e.currentTarget.dataset.type){
      let bankUrl = this.data.bankUrl
      this.changeFunpwd(bankUrl)
    }else{
      wx.showToast({
        title: '请输入相关信息...',
        icon: 'none',
        duration: 3000
      });
    }
    
  },
  gobeckPage:function(e){
    if(e.currentTarget.dataset.type=='AUDITED'){
      wx.removeStorageSync('restback');
      wx.removeStorageSync('restfront');
      wx.removeStorageSync('resthold');
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  contactSupport:function(event){
    app.contactSupport()
  },
  smsInput:function(e){
    if(e.detail.value.length==6){
      this.setData({
        message: e.detail.value,
        submit:true
      })
    }else{
      this.setData({
        message: ''
      })
    }
  },
  submitCmbcBt:function(e){
    let that = this
    let message=this.data.message
    let bankUrl=this.data.bankUrl
    if(message){
      this.setData({
        submit:false
      })
      condition(that,message,bankUrl)
      
    }
  },
  retrievePassword:function(e){//找回电子账户密码
    console.log('retrievePassword')
    let mobile,passByvalue,transactionNo
    transactionNo = wx.getStorageSync('passByvalue')
    mobile = this.data.mobile
    passByvalue={
      'bankUrl':'retrievePassword',
      'mobile':mobile,
      'transactionNo':transactionNo
    }
    // wx.setStorageSync('passByvalue',passByvalue)
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
  },
  passwordrandomnumbers:function(e){//
    let that = this;
    let newPasswordRandom,mobile,random;
    mobile = that.data.mobile
    app.getpwdrandomNo().then(res=>{
    console.log('changePassword====getpwdrandomNo===',res)
    if(res.statusCode!=200){
      getApp().status_code(res)
      
    }else{
      newPasswordRandom = {
        mobile : mobile,
        randJnlNo:res.data.randJnlNo,
        random:res.data.random
      }
      random = encodeURIComponent(res.data.random)
      wx.setStorageSync('newPasswordRandom', newPasswordRandom);
      that.setData({
        url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl=changePasswordNew&passwordRandom='+random,
        gopwdconterl:true
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
    let oneKey = options.oneKey;
    let twoKey = options.twoKey;
    let myPwd = options.myPwd;
    let changepwdOld = options.changepwdOld;
    let changepwdNew = options.changepwdNew;
    let changepwdNewagin = options.changepwdNewagin;
    let retrievepwdOnce = options.retrievepwdOnce;
    let retrievepwdTwice = options.retrievepwdTwice;
    let cmbcmobile,transactionNo,accountNo,bankUrl,newBindMm,passdata,serverRandom,textTile,rechargeOrwithdrawcashobj,mobileshow,closeaccobj
    console.log('oneKey-====',oneKey)
    if(!oneKey&&!myPwd&&!changepwdOld&&!changepwdNew&&!retrievepwdOnce&&!retrievepwdTwice){
      passdata = wx.getStorageSync('passByvalue')
      serverRandom = encodeURIComponent(passdata.passwordRandom)
        console.log('virtualBank==',passdata)
        wx.setStorageSync('cmbcmobile',passdata.mobile);
        wx.setStorageSync('bankUrl',passdata.bankUrl);
        switch (passdata.bankUrl) {
          case 'closeacc':
            closeaccobj = wx.getStorageSync('closeaccobj')
            wx.setStorageSync('accountNo',closeaccobj.number);
            that.setData({
              gopwdconterl:true
            })
            wx.setNavigationBarTitle({
              title: '密码'
            })
            break;
          case 'withdrawcash':
            that.setData({
              gopwdconterl:true
            })
            wx.setNavigationBarTitle({
              title: '密码'
            })
            break;
          case 'recharge':
            that.setData({
              gopwdconterl:true
            })
            wx.setNavigationBarTitle({
              title: '密码'
            })
            break;
          case 'open':
            wx.setStorageSync('transactionNo',passdata.transactionNo);
            that.setData({
              gopwdconterl:true
            })
            break;
          case 'changePassword':
            wx.setStorageSync('accountNo',passdata.transactionNo);
            that.changeFunpwd(passdata.bankUrl)
            break;
          case 'unlockPassword':
            wx.setStorageSync('accountNo',passdata.transactionNo);
            that.changeFunpwd(passdata.bankUrl)
            break;
          case 'unlockAccount':
            let unlockAccount,unlokholder,unlokbankcard,unlokidentity,unlokmobile,unlockpwdconterlbt;
            textTile = textFunction(passdata.bankUrl);
            wx.setNavigationBarTitle({
              title:textTile
            })
            unlockAccount = wx.getStorageSync('unlockAccount')
            if(unlockAccount){
              unlokholder=unlockAccount.unlokholder
              unlokbankcard=unlockAccount.unlokbankcard
              unlokidentity=unlockAccount.unlokidentity
              unlokmobile=unlockAccount.mobile
              unlockpwdconterlbt=true
            }
            wx.setStorageSync('accountNo',passdata.transactionNo);
            that.setData({
              gopwdconterl:false,
              mobile:passdata.mobile,
              bankUrl:passdata.bankUrl,
              unlokholder:unlokholder,
              unlokbankcard:unlokbankcard,
              unlokidentity:unlokidentity,
              unlokmobile:unlokmobile,
              unlockpwdconterlbt:unlockpwdconterlbt
            })
            break;
          case 'retrievePassword':
            textTile = textFunction(passdata.bankUrl);
            
            wx.setNavigationBarTitle({
              title:textTile
            })
            wx.setStorageSync('accountNo',passdata.transactionNo);
            that.setData({
              gopwdconterl:false,
              mobile:passdata.mobile,
              bankUrl:passdata.bankUrl,
              retrievestatus:passdata.retrievestatus,
              retrievedescription:passdata.retrievedescription
            })
            break;
          default:
            // app.getmasterbanks().then( res => {
            //   console.log('getmasterbanks=====',res)
            //   if(res.statusCode==200){
            //     console.log(res.data)
            //     let arrlist = []
            //     res.data.forEach((item,index,arr) => {
            //       arrlist.push({
            //         text:item.name,
            //         value:item.code
            //       })
            //     })
            //     that.setData({
            //       groups:arrlist
            //     })
            //   }
            // })
            console.log('virtualBank==密码输入')
            textTile = textFunction(passdata.bankUrl);
            
            wx.setNavigationBarTitle({
              title:textTile
            })
            wx.setStorageSync('accountNo',passdata.transactionNo);
            that.setData({
              gopwdconterl:false,
              mobile:passdata.mobile,
              bankUrl:passdata.bankUrl
            })
            break;
        }
        that.setData({
          url: HOSTpwd+'/statics/cmbc/keyboard.html?bankUrl='+passdata.bankUrl+'&passwordRandom='+serverRandom
        });
      
    }else{
      bankUrl = wx.getStorageSync('bankUrl') 
          textTile = textFunction(bankUrl);
          wx.setNavigationBarTitle({
            title:textTile
          })
      if(bankUrl=='changeMoble'||bankUrl=='changeMasterCard'||bankUrl=='retrievePassword'||bankUrl=='unlockPassword'||bankUrl=='unlockAccount'||bankUrl=='closeacc'){
        
        accountNo = wx.getStorageSync('accountNo')
        switch (bankUrl) {
          case 'closeacc':
            myPwd = decodeURIComponent(myPwd);
            cmbcmobile = wx.getStorageSync('closeaccobj').mobile
            break;
          case 'changeMoble':
            myPwd = decodeURIComponent(myPwd);
            newBindMm = wx.getStorageSync('newBindMm') 
            cmbcmobile = newBindMm.bindnewMoble
            break;
          case 'changeMasterCard':
            myPwd = decodeURIComponent(myPwd);
            cmbcmobile = wx.getStorageSync('cmbcmobile')
            break;
          case 'unlockPassword':
            myPwd = decodeURIComponent(myPwd);
            cmbcmobile = wx.getStorageSync('cmbcmobile')
            break;
          case 'unlockAccount':
            myPwd = decodeURIComponent(myPwd);
            cmbcmobile = wx.getStorageSync('unlockAccount').mobile
            break;
          case 'retrievePassword':
            retrievepwdOnce = decodeURIComponent(retrievepwdOnce);
            retrievepwdTwice = decodeURIComponent(retrievepwdTwice);
            cmbcmobile = wx.getStorageSync('resetPasswordRandom').mobile
            break;
          default:
            console.log('未知bankUrl----')
            break;
        }
        let cmbcMessagetype = cmbcMessagetypechenge(bankUrl);
        app.cmbcMessage(cmbcmobile,accountNo,cmbcMessagetype).then(res=>{
          console.log('cmbc新手机号Message===',res)
          wx.hideLoading()
          if(res.statusCode==201){
            countDown(that,90);
          }else{
            getApp().status_code(res)
          }
        })
        mobileshow = true
      }else{
        switch (bankUrl) {
          case 'recharge':
            myPwd = decodeURIComponent(myPwd);
            rechargeOrwithdrawcashobj = wx.getStorageSync('rechargeOrwithdrawcashobj')
            console.log('rechargeOrwithdrawcashobj===',rechargeOrwithdrawcashobj)
            console.log('recharge===',myPwd)
            that.setData({
              myPwd:myPwd
            })
            condition(that,'',bankUrl)
            break;
          case 'withdrawcash':
            myPwd = decodeURIComponent(myPwd);
            rechargeOrwithdrawcashobj = wx.getStorageSync('rechargeOrwithdrawcashobj')
            console.log('rechargeOrwithdrawcashobj===',rechargeOrwithdrawcashobj)
            console.log('recharge===',myPwd)
            that.setData({
              myPwd:myPwd
            })
            condition(that,'',bankUrl)
            break;
          case 'changePassword':
            if(changepwdOld&&!changepwdNew&&!changepwdNewagin){
              wx.setStorageSync('changepwdOld',changepwdOld)
              that.passwordrandomnumbers()
              console.log('jinlaile ====passwordrandomnumbers')
              break;
            }
            console.log('chulai ====passwordrandomnumbers')
            changepwdOld = wx.getStorageSync('changepwdOld')
            changepwdOld = decodeURIComponent(changepwdOld);
            changepwdNew = decodeURIComponent(changepwdNew);
            changepwdNewagin = decodeURIComponent(changepwdNewagin);
            accountNo = wx.getStorageSync('accountNo')
            cmbcmobile = wx.getStorageSync('cmbcmobile')
            app.cmbcMessage(cmbcmobile,accountNo,'CHANGE_TRADE_PASSWORD').then(res=>{
              console.log('cmbcMessage===',res)
              wx.hideLoading()
                if(res.statusCode==201){
                  countDown(that,90);
                }else{
                  getApp().status_code(res)
                }
            })
            this.setData({
              changepwdOld:changepwdOld,
              changepwdNew:changepwdNew,
              changepwdNewagin:changepwdNewagin
            })
            mobileshow = true
            break;
          
          default:
            oneKey = decodeURIComponent(oneKey);
            twoKey = decodeURIComponent(twoKey);
            transactionNo = wx.getStorageSync('transactionNo')
            cmbcmobile = wx.getStorageSync('cmbcmobile')
            let cmbcMessagetype = cmbcMessagetypechenge(bankUrl);
            app.cmbcMessage(cmbcmobile,transactionNo,cmbcMessagetype).then(res=>{
              console.log('cmbc新手机号Message===',res)
              wx.hideLoading()
              if(res.statusCode==201){
                countDown(that,90);
              }else{
                getApp().status_code(res)
              }
            })
            mobileshow = true
            break;
        }
      }
      
      // if(bankUrl=='recharge'){
        
      // }else if(bankUrl=='withdrawcash'){
       
      // }else if(bankUrl=='changePassword'){
        
      // }else{
        
      // }
      
      //myPwdmobile
      this.setData({
        url: '',
        mobileshow:mobileshow,
        mobile:cmbcmobile,
        newBindMm:newBindMm,
        transactionNo:transactionNo,
        oneKey:oneKey,
        twoKey:twoKey,
        accountNo:accountNo,
        myPwd:myPwd,
        retrievepwdOnce:retrievepwdOnce,
        retrievepwdTwice:retrievepwdTwice,
        bankUrl:bankUrl,
      })
      console.log('没有')
    }
    
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
function condition(that,message,bankUrl){
　return({
    open :function(){
      let oneKey=that.data.oneKey
      let twoKey=that.data.twoKey
      let transactionNo=that.data.transactionNo
      app.cmbcputAcc(message,twoKey,oneKey,transactionNo).then(res=>{
        console.log('cmbcputAcc====',res)
        wx.hideLoading()
          if(res.statusCode!=200){
              getApp().status_code(res).then(res => {
                wx.redirectTo({
                  url: '/openCard/pages/openAcc/openAcccount',
                  success: function(res) {}
                })
              })
              
          }else{
            setTimeout(() => {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 3000,
                success:function(){
                  wx.redirectTo({
                    url: '/openCard/pages/openAccResult/openAccResult?transactionNo='+transactionNo
                    
                  });
                }
              });
            }, 100);
              
              
          }
      })
    },
    changeMoble :function(){
      console.log('changeMoble');
      console.log('=====123=====')
      let myPwd=that.data.myPwd;
      let newBindMm = that.data.newBindMm;
      let accountNo = that.data.accountNo+'/mobile';
      app.cmbcputchangeAccM(message,newBindMm.bindnewMoble,newBindMm.changeMsms,newBindMm.mobile,myPwd,accountNo,newBindMm.randJnlNo,newBindMm.random).then(res => {
        console.log('cmbcputchangeAccM====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '更换手机号成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                //要延时执行的代码
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('newBindMm')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                  }
                });
              }, 3000) //延迟时间
            }
          })
          
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {}
              })
            }, 2000)
          })
        }
      })
    },
    changeMasterCard : function(){
      console.log('changeMasterCard');
      let myPwd=that.data.myPwd;
      let accountNo = that.data.accountNo+'/bind-card';
      let newbank = wx.getStorageSync('newBindMm');
      let newbankcard = wx.getStorageSync('newBindMm').newbankcard;
      app.cmbcputchangeAccMasterCard(message,newbankcard,myPwd,accountNo,newbank.randJnlNo,newbank.random,newbank.serverTransactionNo).then(res => {
        console.log('cmbcputchangeAccMasterCard====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '换绑主卡成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('newBindMm')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                  }
                });
              }, 3000) //延迟时间
            }
          })
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {}
              })
            }, 2000);
          })
        }
      })
    },
    changePassword:function(){
      console.log('changePassword');
      let changepwdOld=that.data.changepwdOld;
      let changepwdNew=that.data.changepwdNew;
      let changepwdNewagin=that.data.changepwdNewagin;
      let newPasswordRandom = wx.getStorageSync('newPasswordRandom');
      let oldPasswordRandom = wx.getStorageSync('oldPasswordRandom');
      let accountNo = that.data.accountNo+'/change';
      app.cmbcputchangePassword(accountNo,message,changepwdNew,changepwdNewagin,changepwdOld,oldPasswordRandom.randJnlNo,oldPasswordRandom.random,newPasswordRandom.randJnlNo,newPasswordRandom.random).then(res => {
        console.log('cmbcputchangePassword====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '修改电子账户密码成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('newBindMm')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                  }
                });
              }, 3000) //延迟时间
            }
          })
          
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {

                }
              })
            }, 2000);
          })
        }
      })
    },
    retrievePassword:function(){
      console.log('retrievePassword');
      let retrievepwdOnce=that.data.retrievepwdOnce;
      let retrievepwdTwice=that.data.retrievepwdTwice;
      let accountNo = that.data.accountNo+'/reset';
      let resetPasswordRandom = wx.getStorageSync('resetPasswordRandom');
      app.cmbcputresetPassword(accountNo,message,resetPasswordRandom.code,retrievepwdOnce,retrievepwdTwice,resetPasswordRandom.randJnlNo,resetPasswordRandom.random).then(res => {
        console.log('cmbcputchangeAccMasterCard====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '重置电子账户密码成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('newBindMm')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                    wx.removeStorageSync('resetPasswordRandom')
                  }
                });
              }, 3000) //延迟时间
            }
          })
          
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {}
              })
            }, 2000);
          })
        }
      })
    },
    unlockPassword:function(){
      console.log('unlockPassword');
      let myPwd=that.data.myPwd;
      let unlockPassword = wx.getStorageSync('unlockPassword');
      let accountNo = that.data.accountNo+'/unlock';
      app.cmbcputunlockPassword(accountNo,message,myPwd,unlockPassword.randJnlNo,unlockPassword.random).then(res => {
        console.log('cmbcputunlockPassword====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '电子账户密码解锁成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('unlockPassword')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                  }
                });
              }, 3000) //延迟时间
            }
          })
          
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {}
              })
            },2000)
          })
        }
      })
    },
    unlockAccount:function(){
      console.log('unlockAccount');
      let myPwd=that.data.myPwd;
      let unlockAccount = wx.getStorageSync('unlockAccount');
      let accountNo = that.data.accountNo+'/unlock';
      app.cmbcputunlockAccount(accountNo,message,myPwd,unlockAccount.unlokbankcard,unlockAccount.unlokholder,unlockAccount.unlokidentity,unlockAccount.mobile,unlockAccount.randJnlNo,unlockAccount.random).then(res => {
        console.log('cmbcputunlockAccount====',res)
        wx.hideLoading()
        if(res.statusCode==200){
          wx.showToast({
            title: '电子账户解锁成功',
            icon: 'success',
            duration: 3000,
            success:function(){
              console.log('haha');
              setTimeout(function () {
                wx.redirectTo({
                  url: '/openCard/pages/virtualBank/virtualBank',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    wx.removeStorageSync('unlockAccount')
                    wx.removeStorageSync('cmbcmobile')
                    wx.removeStorageSync('bankUrl')
                    wx.removeStorageSync('accountNo')
                    wx.removeStorageSync('transactionNo')
                  }
                });
              }, 3000) //延迟时间
            }
          })
          
        }else{
          getApp().status_code(res).then(res => {
            setTimeout(() => {
              wx.redirectTo({
                url: '/openCard/pages/virtualBank/virtualBank',
                success: function(res) {}
              })
            },2000)
          })
        }
      })
    },
    recharge :function(){
      let rechargeOrwithdrawcashobj = wx.getStorageSync('rechargeOrwithdrawcashobj');
      let myPwd=that.data.myPwd;
      let accountNo = rechargeOrwithdrawcashobj.accountNo+'/recharge'
      app.cmbcputrecharge(accountNo,rechargeOrwithdrawcashobj.amount,myPwd).then(res =>{
        console.log('cmbcputrecharge==',res)
        if(res.statusCode!=200){
          getApp().status_code(res)
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.setStorageSync('seccObj',res.data)
          wx.redirectTo({
            url: '/wallet/pages/walletrecharge/resultCmbc',
            success: function(res) {}
          })
        }
      })
    },
    withdrawcash :function(){
      let rechargeOrwithdrawcashobj = wx.getStorageSync('rechargeOrwithdrawcashobj');
      let myPwd=that.data.myPwd;
      let accountNo = rechargeOrwithdrawcashobj.accountNo+'/withdraw'
      app.cmbcputwithdraw(accountNo,rechargeOrwithdrawcashobj.amount,myPwd).then(res =>{
        console.log('cmbcputwithdraw==',res)
        if(res.statusCode!=200){
          getApp().status_code(res)
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.setStorageSync('seccObj',res.data)
          wx.redirectTo({
            url: '/wallet/pages/walletrecharge/resultCmbc',
            success: function(res) {}
          })
        }
      })
    },
    closeacc:function(){
      let closeaccobj = wx.getStorageSync('closeaccobj');
      let myPwd=that.data.myPwd;
      let accountNo = closeaccobj.accountNo+'/close'
      app.deleteaccount(accountNo,message,myPwd,closeaccobj.pwdCmbc.randJnlNo,closeaccobj.pwdCmbc.random).then(res =>{
        console.log('deleteaccount==',res)
        if(res.statusCode!=200){
          getApp().status_code(res)
        }else{
          // wx.showToast({
          //   title:'销户成功',
          //   icon: 'none',
          //   duration: 5000
          // })
          wx.setStorageSync('clossObj',res.data)
          wx.redirectTo({
            url: '/openCard/pages/cmbcClose/closeAccount',
            success: function(res) {
              
            }
          })
        }
      })
    }
  }[bankUrl] || function(){console.log('我是默认值');})();
}
function textFunction(bankUrl) {
  let obj = {
    'changeMoble':'变更手机号',
    'open':'设置密码',
    'changeMasterCard':'换绑主卡',
    'changePassword':'修改密码',
    'retrievePassword':'交易密码重置',
    'unlockPassword':'电子账户密码解锁',
    'unlockAccount':'电子账户解锁',
    'recharge':'交易密码',
    'withdrawcash':'交易密码',
    'closeacc':'销户',
  } 
  return obj[bankUrl];
}
function cmbcMessagetypechenge(bankUrl){
  let obj = {
    'changeMoble':'CHANGE_MOBILE_NEW',
    'open':'OPEN_ACCOUNT',
    'changeMasterCard':'CHANGE_BIND_CARD',
    'changePassword':'CHANGE_TRADE_PASSWORD',
    'retrievePassword':'REST_TRADE_PASSWORD',
    'unlockPassword':'UNLOCK_TRADE_PASSWORD',
    'unlockAccount':'UNLOCK_SIX_MONTH',
    'closeacc':'CLOSE_ACCOUNT'
  } 
  return obj[bankUrl];
}
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