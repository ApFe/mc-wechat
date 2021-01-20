// pages/transfer/transfer.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    payaccList: '',
    active: '0', //控制当前显示盒子 
    rolloutnam: '',
    rolloutName: '',
    rolloutIntegral: '',
    rolloutfrom: {
      value: '',
      acctno: '',
      integral: '',
      text: '',
      num: ''
    },
    rollinnam: '',
    rollcarNo: '',
    rollinaccType: '',
    rollinaccKey: '',
    rollinaccName: '',
    showRollBox: false,
    msgboxshow: false,
    chosTitle: '',
    showActionsheet: false,
    groups: [],
    counttime: 90,
    acclistArr: '',
    upfrom: '',
    into: '',
    message: '',
    rollinsendMsg: '',
    mobbile: '',
    captchalength: ''
  },
  toggle: function (e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })

  },
  rollin: function (event) {
    let that = this
    app.userCardtype('TRANSFER').then(res => {
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
          chosTitle: '请选择您将转入的账户类型',
          groups: groups
        })
      } else {
        getApp().status_code(res)
      }

    })


  },
  rollout: function (event) {
    let detaAcc = this.data.acclistArr.cards
    let groupsArr = []
    let str1, str2, str
    detaAcc.forEach(element => {
      let groupsObj = {}
      groupsObj.value = element.type;
      groupsObj.acctno = element.cardNo;
      groupsObj.integral = element.balance;
      switch (element.type) {
        case 'WEB':
          str1 = element.loginName.substring(2, -2)
          str2 = element.loginName.substring(element.loginName.length - 4, element.loginName.length)
          str = '(' + str1 + '****' + str2 + ')'
          groupsObj.text = '网站主账户' + str;
          groupsObj.num = element.loginName;
          break;
        case 'NAME':
          // str1 = element.nameCardNo.substring(4,-2)
          str2 = element.nameCardNo.substring(element.nameCardNo.length - 4, element.nameCardNo.length)
          str = '(尾号' + str2 + ')'
          groupsObj.text = '中信联名卡账户' + str;
          groupsObj.num = element.nameCardNo;
          break;
        case 'SIMPLE':
          str1 = element.mobile.substring(3, -2)
          str2 = element.mobile.substring(element.mobile.length - 4, element.mobile.length)
          str = '(' + str1 + '****' + str2 + ')'
          groupsObj.text = '简易积分账户' + str;
          groupsObj.num = element.mobile;
          break;
        case 'MINSHENG_NAME':
          // str1 = element.nameCardNo.substring(4,-2)
          str2 = element.nameCardNo.substring(element.nameCardNo.length - 4, element.nameCardNo.length)
          str = '(尾号' + str2 + ')'
          groupsObj.text = '民生联名卡账户' + str;
          groupsObj.num = element.nameCardNo;
          break;
        default:
          console.log('未知')
          break;
      }
      groupsArr.push(groupsObj)
    })
    this.setData({
      showActionsheet: true,
      chosTitle: '请选择您将转出的账户',
      groups: groupsArr
    })

  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  remooveObj(arr, attr, movevalue) {
    let that = this
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].attr == movevalue) {
        that.setData({
          payaccList: {
            cards: members[j]
          }
        })

        arr.splice(j, 1);
        break;
      }
    }
  },
  btnClick(e) {
    let that = this;
    if (that.data.chosTitle == '请选择您将转出的账户') {
      that.data.groups.forEach((item, index) => {
        if (item.num && e.detail.value == item.value && index == e.detail.index) {
          that.setData({
            rolloutnam: item.text,
            rolloutName: item.text,
            rollcarNo: item.num,
            rolloutfrom: item,
            rolloutIntegral: ''
          })
        }
      });
      return getApp().accountCards(true, 'rexharge').then(res => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          let objarr = res.data.cards
          let delarr = objarr.splice(objarr.indexOf(objarr.find(function (element) {
            return element.type === e.detail.value
          })), 1)
          that.setData({
            payaccList: {
              cards: objarr
            }

          })
          that.close()
        } else {
          getApp().status_code(res)
        }

      })
    } else {
      that.data.groups.forEach((item, index) => {
        if (e.detail.value == item.value) {
          that.setData({
            rollinnam: item.text,
            rollinaccType: item.value,
            rollinaccKey: '',
            rollinaccName: ''
          })
        }
      });
    }
    that.close()
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
  bindKeyInput: function (e) {
    let integil = this.data.rolloutfrom.integral

    if (integil - e.detail.value >= 0) {
      if (e.detail.value - 100 >= 0 && e.detail.value.length >= 3) {
        this.setData({
          rolloutIntegral: e.detail.value
        })
      } else {
        this.setData({
          rolloutIntegral: ''
        })
        wx.showToast({
          title: '转账积分额不低于100积分',
          icon: 'none',
          duration: 3000
        });
      }
    } else {
      this.setData({
        rolloutIntegral: ''
      })
      wx.showToast({
        title: '当前账户积分余额不足',
        icon: 'none',
        duration: 3000
      });
    }



  },
  rollinSendInput: function (e) {
    if (e.detail.cursor == 6) {
      this.setData({
        rupfrom: {
          amount: this.data.upfrom.amount,
          captcha: e.detail.value,
          cardNo: this.data.upfrom.cardNo
        },
        captcha: e.detail.value,
        captchalength: e.detail.cursor

      })
    }

  },
  radioChange: function (e) {
    let valueArr = []
    let a = e.detail.value
    console.log(a)
    valueArr = a.split('#')
    this.setData({
      payments: [{
        type: valueArr[0],
        balance: valueArr[1],
        method: 'POINT',
        cardNo: valueArr[2],
        cardMsg: valueArr[3] + valueArr[4],
        rollinaccKey: valueArr[6],
        rollinaccName: valueArr[5],
        rollinnam: valueArr[3],
        rollinaccType: valueArr[0]
      }]
    })
  },
  rollNext: function (event) {
    let that = this
    let active
    active = that.data.active

    let foramount = this.data.rolloutIntegral
    let acctno = this.data.rolloutfrom.acctno
    switch (active) {
      case '0':
        if (that.data.payments && foramount) {
          let accttype = this.data.rolloutfrom.value
          let radiotype = that.data.payments[0].type
          let radiocardNo = this.data.payments[0].cardNo;
          if (accttype == radiotype) return wx.showToast({
            title: '同账户不可转账',
            icon: 'none',
            duration: 2000
          })

          let fromto = {
            "amount": foramount,
            "captcha": "",
            "captchaTransactionNo": "",
            "cardNo": acctno
          }
          let tofrom = {
            "cardNo": radiocardNo,
            "cardholder": "",
            "identity": "",
            "type": radiotype
          }

          return that.pointorderstransferRes(fromto, tofrom, false, true)

        } else {
          let textval = "请录入或选择相关转账信息"
          that.data.payments || (textval = '请选择转增账户');
          foramount || (textval = '请确认转出账户信息');
          wx.showToast({
            title: textval,
            icon: 'none',
            duration: 2000
          })

        }
        break;
      case '1':

        let rolloutName = this.data.rolloutName
        let rollinnam = this.data.rollinnam
        let forcardNo = this.data.rollcarNo
        let totype = this.data.rollinaccType
        let intonumber = this.data.rollinaccKey
        let intoname = this.data.rollinaccName
        console.log(forcardNo, intonumber, rolloutName, rollinnam)


        if (foramount && forcardNo && intonumber) {
          if (forcardNo != intonumber || (rolloutName != rollinnam && forcardNo == intonumber)) {
            let fromto = {
              "amount": foramount,
              "captcha": "",
              "captchaTransactionNo": "",
              "cardNo": acctno
            }
            let tofrom = {
              "cardNo": "",
              "cardholder": intoname,
              "identity": intonumber,
              "type": totype
            }
            console.log('pointorderstransfer====', fromto)
            console.log('pointorderstransfer=tofrom===', tofrom)

            return that.pointorderstransferRes(fromto, tofrom, true, true)
          } else {
            wx.showToast({
              title: '同账户不可转账',
              icon: 'none',
              duration: 3000
            });
          }


        } else {
          wx.showToast({
            title: '转账信息不完整',
            icon: 'none',
            duration: 3000
          });
        }


        break;

      default:
        break;
    }




  },
  pointorderstransferRes(fromto, tofrom, other, valid) {
    let that = this
    app.pointorderstransfer(fromto, tofrom, other, valid).then(res => {
      wx.hideLoading()
      console.log('pointorderstransferres===', res)
      if (res.statusCode == 200) {
        that.setData({
          tradeNo: res.data.tradeNo,
          upfrom: {
            amount: fromto.amount,
            cardNo: fromto.cardNo,
            captcha: ''
          },
          into: {
            identity: tofrom.identity,
            type: tofrom.type
          },
          validate: true,
          message: '',
          showRollBox: true
        })
      } else {
        getApp().status_code(res)
      }

    })
  },
  closrollNext: function (event) {
    this.setData({
      showRollBox: false
    })
  },
  smgsend: function (event) {

    let that = this;
    let tradeNo = that.data.tradeNo
    if (this.data.counttime != '重新发送') {
      if (this.data.showRollBox == true) {
        app.commonCaptcha(tradeNo, '', 'TRANSFER').then(res => {
          wx.hideLoading()
          if (res.statusCode == 200) {
            that.setData({
              showRollBox: false,
              msgboxshow: true,
              mobile: res.data.receiver,
              transactionNo: res.data.transactionNo
            })
            countDown(that, 90);
          } else {
            getApp().status_code(res)
          }
        })

      } else {
        this.setData({
          msgboxshow: true
        })
      }
    } else {
      app.commonCaptcha(tradeNo, '', 'TRANSFER').then(res => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          that.setData({
            mobile: res.data.receiver,
            transactionNo: res.data.transactionNo
          })
          countDown(that, 90);
        } else {
          getApp().status_code(res)
        }
      })
    }

  },
  closesmgsend: function (event) {
    this.setData({
      msgboxshow: false
    })
    let status = 'err'
    let rolloutnam = '转账操作中止'
    wx.navigateTo({
      url: '../transferes/results',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          // console.log(data)
        },
        someEvent: function (data) {
          // console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: {
            rolloutnam: rolloutnam,
            status: status
          }
        })
      },
      fail: function (res) {

        console.log('fail' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete' + JSON.stringify(res))
      },
    })
  },
  sendSess: function (event) {

    let acctno = this.data.rolloutfrom.acctno
    let transactionNo = this.data.transactionNo
    let captcha = this.data.captcha
    let foramount = this.data.rolloutIntegral
    let captchalength = this.data.captchalength - 6
    let that = this
    let active, fromto, tofrom
    active = that.data.active
    if (captchalength == 0) {
      that.setData({
        captchalength: 0
      })
      switch (active) {
        case '0':

          let radiotype = that.data.payments[0].type
          let radiocardNo = this.data.payments[0].cardNo;
          fromto = {
            "amount": foramount,
            "captcha": captcha,
            "captchaTransactionNo": transactionNo,
            "cardNo": acctno
          }
          tofrom = {
            "cardNo": radiocardNo,
            "cardholder": "",
            "identity": "",
            "type": radiotype
          }
          that.sendSessRes(fromto, tofrom, false)
          break;
        case '1':

          let totype = this.data.rollinaccType
          let intonumber = this.data.rollinaccKey
          let intoname = this.data.rollinaccName
          fromto = {
            "amount": foramount,
            "captcha": captcha,
            "captchaTransactionNo": transactionNo,
            "cardNo": acctno
          }
          tofrom = {
            "cardNo": "",
            "cardholder": intoname,
            "identity": intonumber,
            "type": totype
          }
          that.sendSessRes(fromto, tofrom, true)
          break;
        default:
          break;
      }

    } else {
      return
    }



  },
  sendSessRes(fromto, tofrom, other) {
    let that = this
    app.pointorderstransfer(fromto, tofrom, other, false).then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        let status = res.data.status
        if (status == 'SUCCESS') {
          that.setData({
            msgboxshow: false
          })
          wx.navigateTo({
            url: '../transferes/results',
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function (data) {
                // console.log(data)
              },
              someEvent: function (data) {
                // console.log(data)
              }
            },
            success: function (res) {
              let rolloutnam = that.data.rolloutnam
              let rolloutIntegral = fromto.amount
              let rollinaccType = tofrom.type
              let rollinaccKey = tofrom.identity
              let active = that.data.active
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', {
                data: {
                  rolloutnam: rolloutnam,
                  rolloutIntegral: rolloutIntegral,
                  rollinaccType: rollinaccType,
                  rollinaccKey: active != 0 ? rollinaccKey : that.data.payments[0].rollinaccKey,
                  status: status
                }
              })
            },
            fail: function (res) {

              console.log('fail' + JSON.stringify(res))
            },
            complete: function (res) {
              console.log('complete' + JSON.stringify(res))
            },
          })
        } else {
          let status = 'err'
          let rolloutnam = '网络问题' + res.statusCode
          wx.navigateTo({
            url: '../transferes/results',
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function (data) {
                // console.log(data)
              },
              someEvent: function (data) {
                // console.log(data)
              }
            },
            success: function (res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', {
                data: {
                  rolloutnam: rolloutnam,
                  status: status
                }
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
    getApp().accountCards(bound).then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        that.setData({
          acclistArr: res.data
        })
        return getApp().accountCards(bound, 'rexharge').then(res => {
          wx.hideLoading()
          if (res.statusCode == 200) {
            that.setData({
              payaccList: res.data
            })

          } else {
            getApp().status_code(res)
          }

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
  onUnload: function () {
    let len = getCurrentPages()
    if (len.length > 2) {
      wx.navigateBack({
        delta: 4
      })
    }

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