// pages/integral/recharge.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payaccList: '',
    pammsgboxshow: false,
    rechargecode: '',
    rechargecodelength: '',
    bonuspointsfaceValue: '1000000',
    bonuspointsperiodofvalidity: '2020-12-23',
    active: '0', //控制当前显示盒子 
    chosTitle: '',
    showActionsheet: false,
    groups: [],
    rollinnam: '',
    rollinaccType: '',
    rollinaccKey: '',
    rollinaccName: ''
  },
  contactSupport:function(event){
    getApp().contactSupport()
  },
  rollin: function (event) {
    let that = this
    app.userCardtype('RECHARGE').then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        console.log('userCardtype===', res)
        let keys = Object.keys(res.data)
        let groups = []
        keys.forEach((item, index) => {
          let cardName = res.data[item]
          let obj = {
            text: cardName,
            value: item
          }
          groups.push(obj)
          console.log('cardName==', cardName)
        })
        console.log('keys===', keys)
        console.log('groups===', groups)
        that.setData({
          showActionsheet: true,
          chosTitle: '请选择您将充值的账户类型',
          groups: groups
        })
      } else {
        getApp().status_code(res)
      }

    })


  },
  rollinAccInput: function (e) { //rollinaccKey
    this.setData({
      rollinaccKey: e.detail.value
    })
  },
  rollinNameInput: function (e) { //rollinaccName
    this.setData({
      rollinaccName: e.detail.value
    })
  },
  btnClick(e) {
    let that = this
    that.data.groups.forEach((item, index) => {
      if (e.detail.value == item.value) {
        that.setData({
          rollinnam: item.text,
          rollinaccType: item.value,
          rollinaccKey: '',
          rollinaccName: '',
          showActionsheet: false
        })
      }
    });
  },
  toggle: function (e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })

  },
  pamclosesmgsend: function (e) {
    this.setData({
      pammsgboxshow: false
    })
  },
  rechargecodeInput: function (e) {
    this.setData({
      rechargecode: e.detail.value,
      rechargecodelength: e.detail.cursor
    })
  },
  radioChange: function (e) {
    let valueArr = []
    let a = e.detail.value
    console.log(a)
    valueArr = a.split('#')
    this.setData({
      payments: [{
        type:valueArr[0],
        balance: valueArr[1],
        method: 'POINT',
        cardNo: valueArr[2],
        cardMsg: valueArr[3] + valueArr[4]
      }]
    })
  },
  submitPam: function (event) {
    if(this.data.rechargecodelength != 16){
      return wx.showToast({
        title: '请输入16位充值券码',
        icon: 'none',
        duration: 2000
      })
    }
    let that = this
    let rechargecode, active
    active = that.data.active
    
    rechargecode = this.data.rechargecode;
    switch (active) {
      case '0':
        
        if (that.data.payments && that.data.rechargecodelength == 16) {
          let cardNo = this.data.payments[0].cardNo;
          let cardNotype = this.data.payments[0].type;
          return that.cadssecretsPut('',rechargecode,cardNo,false,cardNotype,'','','','',true)
          
        }else{
          wx.showToast({
            title: '请选择充值账户',
            icon: 'none',
            duration: 2000
          })
          
        }
        break;
      case '1':
        let rollinnam, rollinaccType, rollinaccKey, rollinaccName
        rollinnam = that.data.rollinnam
        rollinaccType = that.data.rollinaccType
        rollinaccKey = that.data.rollinaccKey
        rollinaccName = that.data.rollinaccName
        if (rechargecode && rollinaccType && rollinaccKey ) {
          switch (rollinaccType) {
            case 'SIMPLE':
              that.cadssecretsPut('',rechargecode,'',true,rollinaccType,'','',rollinaccKey,'',true)
              break;
            case 'NAME':
              that.cadssecretsPut('',rechargecode,'',true,rollinaccType,rollinaccName,rollinaccKey,'','',true)
              break;
            case 'MINSHENG_NAME':
              that.cadssecretsPut('',rechargecode,'',true,rollinaccType,rollinaccName,rollinaccKey,'','',true)
              break;
          
            default:
              break;
          }
        }else{
          wx.showToast({
            title: '请填写充值账户信息',
            icon: 'none',
            duration: 2000
          })
        }

        break;
      default:
        break;
    }

  },
  pamsendSess: function (e) {
    console.log(1)
    let that = this
    let faceValue, rechargecode, rechargecodelength, active, mobile, gourlresult,cardMsg
    active = this.data.active;
    faceValue = this.data.bonuspointsfaceValue;
    rechargecode = this.data.rechargecode;
    rechargecodelength = this.data.rechargecodelength - 16;
    if (rechargecode && rechargecodelength == 0) {
      switch (active) {
        case '0':
          let cardNo = this.data.payments[0].cardNo;
          let cardNotype = this.data.payments[0].type;
          mobile = this.data.payments[0].cardMsg;
          gourlresult = '../transferes/results?description=recharge&rechargeStatus=' + true + '&rechargecode=' + rechargecode + '&faceValue=' + faceValue+ '&mobile=' + mobile + '&active=' + active 
          that.cadssecretsPut(gourlresult,rechargecode,cardNo,false,cardNotype,'','','','',false)
          break;

        case '1':
          let rollinnam, rollinaccType, rollinaccKey, rollinaccName
          rollinnam = that.data.rollinnam
          rollinaccType = that.data.rollinaccType
          rollinaccKey = that.data.rollinaccKey
          rollinaccName = that.data.rollinaccName
          cardMsg = rollinnam + '(尾号' + rollinaccKey.substring(rollinaccKey.length - 4, rollinaccKey.length) + ')'
          gourlresult = '../transferes/results?description=recharge&rechargeStatus=' + true  + '&rechargecode=' + rechargecode + '&faceValue=' + faceValue+ '&active=' + active+ '&rollinnam=' + rollinnam+ '&rollinaccKey=' + rollinaccKey+ '&rollinaccName=' + rollinaccName+ '&rollinaccType=' + rollinaccType
          switch (rollinaccType) {
            case 'SIMPLE':
              that.cadssecretsPut(gourlresult,rechargecode,'',true,rollinaccType,'','',rollinaccKey,'',false)
              break;
            case 'NAME':
              that.cadssecretsPut(gourlresult,rechargecode,'',true,rollinaccType,rollinaccName,rollinaccKey,'','',false)
              break;
            case 'MINSHENG_NAME':
              that.cadssecretsPut(gourlresult,rechargecode,'',true,rollinaccType,rollinaccName,rollinaccKey,'','',false)
              break;
          
            default:
              break;
          }
          break;
        default:
          break;
      }
      
    } else {
      return
    }
  },
  cadssecretsPut: function (gourlresult,secret,cardNo,other,type,cardHolder,nameCardNo,mobile,denomination,valid) {
    let that = this;
    app.cadssecretsPut(secret,cardNo,other,type,cardHolder,nameCardNo,mobile,denomination,valid).then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        
        console.log('cadssecretsPut===',res)

        if(valid==true){
          that.setData({
            bonuspointsfaceValue:res.data.denomination,
            bonuspointsperiodofvalidity:res.data.expiredAt,
            pammsgboxshow: true
          })
        }else{
          wx.redirectTo({
            url: gourlresult,
            success: function (res) {
              that.setData({
                rechargecodelength: 0,
                rechargecode: '',
                faceValue: ''
              })
            },
            fail: function (res) {
    
              console.log('fail' + JSON.stringify(res))
            },
            complete: function (res) {
              console.log('complete' + JSON.stringify(res))
            },
          })
        }
        
      } else {
        getApp().status_code(res)
      }
    })
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
    let windowIsBang = wx.getStorageSync('windowIsBang')
    this.setData({
      windowIsBang
    })
    let that = this;
    let bound = true
    getApp().accountCards(bound, 'rexharge').then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        that.setData({
          payaccList: res.data
        })

      } else {
        getApp().status_code(res)
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
  onUnload: function () {},

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