const { accountCard } = require("../../../common/service/api");

// wallet/pages/walletrecharge/rechargeCmbc.js
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeOrwithdrawcash:'',
    cmbcAcc:{
      "id":14,
      "number":"201080006000059153",
      "cardNo":"6216923600227623",
      "mobile":"15564055651",
      "name":"四爷",
      "type":"TWO",
      "availableBalance":null,
      "frozenAmount":null,
      "bankName":null,
      "bankNo":null,
      "bindCardNo":"4129638065115027",
      "bindBankName":"平安银行",
      "bindSingleLimit":0.0,
      "bindDayLimit":0.0,
      "bindTotalLimit":0.0,
      "status":"NONE",
      "openedAt":"2020-08-06",
      "userId":76
    }
  },
  rechargeCmbcInput:function(e){
    let amount = e.detail.value;
    let that = this
    switch (true) {
      case (amount>0):
        that.setData({
          amount:amount,
          rechargeCmbcTrue:true
        })
        break;
    
      default:
        that.setData({
          rechargeCmbcTrue:false
        })
        break;
    }
    
  },
  rechargeCmbc:function(e){
    let rechargeOrwithdrawcash = e.currentTarget.dataset.type;
    let accountNo = this.data.accountNo;
    let number = this.data.cmbcAcc.number;
    let amount = this.data.amount*100;
    let rechargeOrwithdrawcashobj,passByvalue;
    switch (true) {
      case (amount>0):
        switch (rechargeOrwithdrawcash) {
          case 'recharge':
            app.cmbcPostaskforrecharge(accountNo).then(res => {
              wx.hideLoading()
              console.log('cmbcPostaskforrecharge=====',res)
              if(res.statusCode!=200){
                getApp().status_code(res)
              }else{
                // that.setData({
                //   cmbcAcc:res.data
                // })
                passByvalue = {
                  'bankUrl':rechargeOrwithdrawcash,
                  'passwordRandom':res.data.extensionData.pwdCmbc.random
                }
                rechargeOrwithdrawcashobj={
                  'amount':amount,
                  'accountNo':res.data.serverTransactionNo,
                  'number':number,
                  'pwdCmbc':res.data.extensionData.pwdCmbc
                }
                wx.setStorageSync('rechargeOrwithdrawcashobj',rechargeOrwithdrawcashobj)
                wx.setStorageSync('passByvalue',passByvalue)
                wx.redirectTo({
                  url: '/openCard/pages/controlBox/controlBox',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                  }
                });
                console.log('cmbcPostaskforrecharge=====',res.data)
              }
            })
            break;
          case 'withdrawcash':
            app.cmbcPostaskforwithdraw(accountNo,amount).then(res => {
              wx.hideLoading()
              console.log('cmbcPostaskforrecharge=====',res)
              if(res.statusCode!=200){
                getApp().status_code(res)
              }else{
                passByvalue = {
                  'bankUrl':rechargeOrwithdrawcash,
                  'passwordRandom':res.data.extensionData.pwdCmbc.random
                }
                rechargeOrwithdrawcashobj={
                  'amount':amount,
                  'accountNo':res.data.serverTransactionNo,
                  'number':number,
                  'pwdCmbc':res.data.extensionData.pwdCmbc
                }
                wx.setStorageSync('rechargeOrwithdrawcashobj',rechargeOrwithdrawcashobj)
                wx.setStorageSync('passByvalue',passByvalue)
                wx.redirectTo({
                  url: '/openCard/pages/controlBox/controlBox',
                  success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                  }
                });
                console.log('cmbcPostaskforwithdraw=====',res.data)
              }
            })
            break;
          default:
    
            break;
        }
        break;
    
      default:
        wx.showToast({
          title: '请输入金额·····',
          icon: 'none',
          duration: 3000
        });
        break;
    }
    
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    let that = this;
    let textttle,rechargeOrwithdrawcashCmbc,accountNo;
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log('data.accData===',data.accData)
      rechargeOrwithdrawcashCmbc = data.accData.rechargeOrwithdrawcashCmbc
      accountNo = data.accData.number
      that.setData({
        rechargeOrwithdrawcash : rechargeOrwithdrawcashCmbc,
        accountNo:accountNo
      })
      switch (rechargeOrwithdrawcashCmbc) {
        case 'recharge':
          textttle='充值'
          break;
      
        default:
          textttle='提现'
          break;
      }
      wx.setNavigationBarTitle({
        title: textttle
      })
      
      console.log(data.rechargeOrwithdrawcashCmbc)
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
    let that = this
    app.getaccountsdetail().then(res => {
      console.log('getaccountsdetail',res)
      wx.hideLoading()
      if(res.statusCode!=200){
        getApp().status_code(res)
      }else{
        that.setData({
          cmbcAcc:res.data
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