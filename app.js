//app.js
// import { Token } from 'utils/token-model.js';


// import {ShopAdjoin} from '/libs/adjoin.js'
import service from './common/service/index.js'
import * as api from './common/service/api.js'
import {
  wxPromise
} from './common/index.js'
import ImgCompress from './components/wx-image-compress/img-compress.js';
// var scence = 0;
App({

  async onShow(obj) {
    wx.onNetworkStatusChange(function (res) {
      console.log('======',res)
      const networkType = res.networkType
        if (networkType != 'wifi'&&networkType != '4g') return wx.showModal({
          title: '提示',
          content: '当前网络不不稳定',
          confirmText: '确定',
          cancelText: '取消',
          success: function (res) {}
        })
    })
    wx.getNetworkType({
      success (res) {
        console.log('======',res)
        const networkType = res.networkType
        if (networkType != 'wifi'&&networkType != '4g') return wx.showModal({
          title: '提示',
          content: '当前网络不不稳定',
          confirmText: '确定',
          cancelText: '取消',
          success: function (res) {}
        })
      }
    })
    console.log(10)
    this.checkUpdateVersion()
    // let code = wx.getStorageSync('code');
    // this.codeLogin(code)
    wx.getSystemInfo({
      success: (res) => {
        if (res.windowWidth / res.windowHeight < 0.6) {
          return wx.setStorageSync('windowIsBang', true)
        } else {
          return wx.setStorageSync('windowIsBang', false);
        }
      }
    })
    // this.initToken();时间：2020-12-14
  },

  async imgCompress(a, b, c) {
    console.log('src==')
    console.log('src==', a)
    let res = await new ImgCompress(this).compress(a, b, c);
    // return res;
  },


  async codeLogin(a) {
    let res = await api.codeLogin({}, {
      baseData: false,
      addUrl: a + '/profile',
      contentType: 'application/json'
    });
    if (res.statusCode == 200) {
      await this.js_code()
    }
    return res;
  },

  async js_code() {
    try {
      let res = await wxPromise('login');
      wx.setStorageSync('code', res.code)
      return res.code;
    } catch (err) {
      return false;
    }
  },
  async checkUpdateVersion() {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse('getUpdateManager')) {
      //创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function () {
            //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();
          })
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            wx.showModal({
              title: '已经有新版本喽~',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
            })
          })
        }
      })
    } else {
      //TODO 此时微信版本太低（一般而言版本都是支持的）
      wx.showModal({
        title: '溫馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  async initToken() {
    let tokenData = wx.getStorageSync('tokenData');
    let expiresIn = wx.getStorageSync('expiresIn');
    let nowDate = new Date().getTime()
    await this.js_code()
    // console.log('initToken==', expiresIn)
    // console.log('initToken==', nowDate)
    // console.log('initToken==', expiresIn - nowDate)
    let pages = getCurrentPages();
    let pageEnd = pages[pages.length - 1]
    console.log('需要判断的跳出页面======111111111===', pageEnd.route)
    if (!tokenData) {
      if (pageEnd.route != 'pages/index/index') {
        try {
          wx.clearStorageSync()
          await this.js_code()
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } catch (e) {
          wx.clearStorage()
          await this.js_code()
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
      return
    } else {
      console.log(11)
      if (expiresIn - nowDate < 0) { //如果token存在判断token过期时间
        tokenData = await this.updateToken(tokenData);
      } else {
        tokenData = ''
      }
      // await this.setToken(token);
    }
    return tokenData
  },

  async updateToken(tokenData) {
    console.log('update')
    let codeLoginBeTrue = wx.getStorageSync('codeLogin')
    console.log('update==', codeLoginBeTrue)
    let token
    if (codeLoginBeTrue) {
      token = await this.getToken('', '', 'password', 'code');
    } else {
      token = await this.getToken('', '', 'refresh_token');
    }
    // this.token = this.token || this.getToken();
    // let token = await this.token;
    // await this.setToken(token);
    // this.token = null;
    return token;
  },
  /**  定义的一些公共方法 */
  async getToken(capTcha, smobile, grantType, userCode) {
    let code = wx.getStorageSync('code');
    let captcha = capTcha;
    let client_id = 'app';
    let grant_type = grantType;
    let mobile = smobile;
    let refresh_token = wx.getStorageSync('tokenData').refresh_token;
    let res;
    if (userCode == 'code') {
      // 使用js_code从接口中获取token
      res = await api.login({
        captcha,
        client_id,
        grant_type,
        mobile,
        code
      }, {
        loading: true
      });
    } else {
      if (grantType != 'refresh_token') {
        res = await api.login({
          captcha,
          client_id,
          grant_type,
          mobile
        }, {
          loading: true
        });
      } else {
        res = await api.login({
          client_id,
          grant_type,
          refresh_token
        }, {
          loading: true
        });
      }
    }
    await this.js_code()
    console.log('redirectTo======', res)
    // if (res.statusCode != 200) {
    //   try {
    //     wx.clearStorageSync()
    //     await this.js_code()
    //     wx.navigateTo({
    //       url: '/pages/login/login'
    //     })
    //   } catch (e) {
    //     wx.clearStorage()
    //     await this.js_code()
    //     wx.navigateTo({
    //       url: '/pages/login/login'
    //     })
    //   }
    //   return
    // }
    console.log('getToken------>', res)
    wx.setStorageSync('tokenData', res.data)
    let expiresIn = new Date().getTime() + res.data.expires_in * 1000;
    console.log('expiresIn==', new Date(expiresIn).toLocaleDateString)
    wx.setStorageSync('expiresIn', expiresIn)
    return res;
  },
  async getusermsg(a, b) { //解密信息
    let code = wx.getStorageSync('code');
    let encryptedData = a;
    let iv = b;
    let res = await api.decrypt({
      code,
      encryptedData,
      iv
    });
    await this.js_code()
    this.globalData.userInfo = res
    wx.setStorageSync('userInfo', res.data)
    return res;
  },
  async userMsg() { //手机号
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.decrypt({}, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token
    });
    return res;
  },
  async userIn() {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.userMsg({}, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token
    });
    return res;
  },
  async userPrivilege(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.userPrivilege({}, {
      baseData: false,
      addUrl: a + '/privilege',
      contentType: 'application/json',
      token: 'bearer ' + token
    });
    return res;
  },
  async sendSmg(a, b) {
    let receiver = a;
    let type = b;
    let res = await api.sendsmg({
      receiver,
      type
    }, {
      loading: true
    })
    return res
  },
  async userCardtype(active) {
    let token = wx.getStorageSync('tokenData').access_token;
    // await this.setToken(token);
    let res = await api.userCardtype({
      'active': active
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res;
  },
  async accountCards(bound, rexharge, certificate) {
    let token = wx.getStorageSync('tokenData').access_token;
    // await this.setToken(token);
    let res
    switch (rexharge) {
      case 'rexharge':
        res = await api.accountCard({
          bound: true,
          rexharge: true
        }, {
          baseData: false,
          contentType: 'application/json',
          token: 'bearer ' + token,
          loading: true
        });
        break;
      case 'search':
        res = await api.accountCard({
          'certificate': certificate
        }, {
          baseData: false,
          contentType: 'application/json',
          token: 'bearer ' + token,
          loading: true
        });
        break;
      default:
        if (bound) {
          res = await api.accountCard({
            bound
          }, {
            baseData: false,
            contentType: 'application/json',
            token: 'bearer ' + token,
            loading: true
          });

        } else {
          res = await api.accountCard({
            bound: false,
            deleted: true
          }, {
            baseData: false,
            contentType: 'application/json',
            token: 'bearer ' + token,
            loading: true
          });

        }
        break;
    }
    return res;

  },
  async cadssecretsPut(secret, cardNo, other, type, cardHolder, nameCardNo, mobile, denomination, valid) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cadssecretsPut({
      'secret': secret,
      'cardNo': cardNo,
      'other': other,
      'type': type,
      'cardHolder': cardHolder,
      'nameCardNo': nameCardNo,
      'mobile': mobile,
      'denomination': denomination
    }, {
      baseData: false,
      addUrl: secret + '?valid=' + valid,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async pointorderstransfer(from, to, other, valid) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.pointorderstransfer({
      'from': from,
      'to': to,
      'other': other,
      'valid': valid
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token
    });
    return res;
  },
  async commonCaptcha(cardNo, receiver, type) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.commonCaptcha({
      'eventNo': cardNo,
      'receiver': receiver,
      'type': type
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async cadsBind(captcha, captchaTransactionNo, cardHolder, cardNo, certificate, identity, type, valid, bind) { //-----
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cadsBind({
      'captcha': captcha,
      'captchaTransactionNo': captchaTransactionNo,
      'cardHolder': cardHolder,
      'cardNo': cardNo,
      'certificate': certificate,
      'identity': identity,
      'type': type,
      'valid': valid,
      'bound': bind
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async deleteCads(b) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.deleteCads({}, {
      baseData: false,
      addUrl: b,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async mobileRecharge(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.mobileRecharge({
      type: a
    }, {
      baseData: false,
      contentType: 'application/json',
      loading: true
    });
    return res;
  },
  async virtualordersPost(description, code, quantity, mobile, oilCardNo, type, virtual) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.virtualordersPost({
      'description': description,
      'items': [{
        'code': code,
        "quantity": quantity
      }],
      'mobile': mobile,
      'oilCardNo': oilCardNo,
      'type': type,
      'virtual': virtual
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async accOrderList(a, b, c) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.accOrderList({
      'number': a,
      'page': b,
      'size': c
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async tradeNocaptcha(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.tradeNocaptcha({}, {
      baseData: false,
      addUrl: a + '/captcha',
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async orderPay(a, b, c, d, e) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res
    if (e == 'POINT') {
      res = await api.payPoint({
        'captcha': a,
        'cardNo': b,
        'openId': '',
        'point': c,
        'tradeNo': d
      }, {
        baseData: false,
        contentType: 'application/json',
        token: 'bearer ' + token,
        loading: true
      });
    } else if (e == 'CASH') {
      res = await api.pay({
        'captcha': a,
        'cardNo': b,
        'openId': '',
        'point': c,
        'tradeNo': d
      }, {
        baseData: false,
        contentType: 'application/json',
        token: 'bearer ' + token,
        loading: true
      });
    } else if (e == 'HYBRID') {
      res = await api.payHybrid({
        'captcha': a,
        'cardNo': b,
        'openId': '',
        'point': c,
        'tradeNo': d
      }, {
        baseData: false,
        contentType: 'application/json',
        token: 'bearer ' + token,
        loading: true
      });
    } else if (e == 'DYNAMIC_POINT') {
      res = await api.payDynamic({
        'captcha': a,
        'cardNo': b,
        'openId': '',
        'point': c,
        'tradeNo': d
      }, {
        baseData: false,
        contentType: 'application/json',
        token: 'bearer ' + token,
        loading: true
      });
    }

    return res;
  },
  async storeOrderList(b, c) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.storeOrderList({
      'page': b,
      'size': c
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async deleteOrders(b) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.deleteOrders({}, {
      baseData: false,
      addUrl: b,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async cancelOrders(b) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cancelOrders({}, {
      baseData: false,
      addUrl: b,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async indexproductsList(a, b, c) {
    let res = await api.indexproductsList({
      'recommend': a,
      'page': b,
      'size': c
    }, {
      baseData: false,
      contentType: 'application/json',
      loading: true
    });
    return res;
  },
  async storeOrderDetail(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.storeOrderDetail({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res;
  },
  async goodsdetail(a) {
    let res = await api.goodsdetail({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      loading: true
    });
    return res;
  },
  async setToken(token) {
    service.setToken(token);
  },
  async contactSupport() {
    wx.makePhoneCall({
      phoneNumber: '010-59231512' //仅为示例，并非真实的电话号码
    })
  },
  async status_code(res) {
    let statusCode
    let code = res.statusCode
    switch (true) {
      case (code >= 200 && code < 300):
        statusCode = '~'
        break;
      case (code >= 300 && code < 400):
        statusCode = '~ ~'
        break;
      case (code >= 400 && code < 500):
        statusCode = '~~~'
        break;
      case (code >= 500):
        statusCode = '~~~~'
        break;
      default:
        statusCode = '开小差了，请稍后重试'
        break;
    }
    try {
      let errors = res.data.errors
      let error = res.data.error
      let mesge = res.data.message ? res.data.message : '请联系客服'
      let errText
      errText = errors ? errors[Object.keys(errors)[0]] : error ? mesge : '请联系客服' + statusCode
      throw errText
    } catch (err) {
      setTimeout(() => {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 3000
        });
      }, 100);
    }
  },
  async cmbcAccounts(a, b, c, d, e, f, g, h, i, j, k) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcAccounts({
      'back': a,
      'bindCardNo': b,
      'certificateNo': c,
      'front': d,
      'mobile': e,
      'username': f,
      'districtCode': g,
      'street': h,
      'occupation': i,
      'occupationRemark': j,
      'company': k
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcMessage(a, b, c) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcMessage({
      'mobile': a,
      'accountNo': b,
      'type': c
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputAcc(a, b, c, d) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputAcc({
      'captcha': a,
      'confirmPassword': b,
      'password': c
    }, {
      baseData: false,
      addUrl: d,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputchangeAccM(a, b, c, d, e, f, g, h) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputchangeAccM({
      'captcha': a,
      'mobile': b,
      'originalCaptcha': c,
      'originalMobile': d,
      'password': e,
      'passwordRandom': {
        'randJnlNo': g,
        'random': h
      }
    }, {
      baseData: false,
      addUrl: f,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputchangePassword(a, b, c, d, e, f, g, h, i) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputchangePassword({
      'captcha': b,
      'newPayPassword': c,
      'newPayPasswordConfirm': d,
      'oldPayPassword': e,
      'oldPasswordRandom': {
        'randJnlNo': f,
        'random': g
      },
      'newPasswordRandom': {
        'randJnlNo': h,
        'random': i
      }
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcgetapplyresetApprovals(a, b) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcgetapplyresetApprovals({
      'type': b
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputapplyresetPassword(a, b, c, d, e) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputapplyresetPassword({
      'captcha': b,
      'front': c,
      'back': d,
      'hold': e
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputunlockPassword(a, b, c, d, e) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputunlockPassword({
      'captcha': b,
      'password': c,
      'passwordRandom': {
        'randJnlNo': d,
        'random': e
      }
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputunlockAccount(a, b, c, d, e, f, g, h, i) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputunlockAccount({
      'captcha': b,
      'password': c,
      'bindCardNo': d,
      'cardholder': e,
      'certificateNo': f,
      'mobile': g,
      'passwordRandom': {
        'randJnlNo': h,
        'random': i
      }
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputresetPassword(a, b, c, d, e, f, g) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputresetPassword({
      'captcha': b,
      'code': c,
      'password': d,
      'confirmPassword': e,
      'passwordRandom': {
        'randJnlNo': f,
        'random': g
      }
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcapplychangeAccMasterCard(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcapplychangeAccMasterCard({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputchangeAccMasterCard(a, b, c, d, e, f, g) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputchangeAccMasterCard({
      'captcha': a,
      'bindCardNo': b,
      'password': c,
      'passwordRandom': {
        'randJnlNo': e,
        'random': f
      },
      'serverTransactionNo': g
    }, {
      baseData: false,
      addUrl: d,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async getaccountsdetail() {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.getaccountsdetail({}, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    });
    return res
  },
  async applydeleteaccount(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.applydeleteaccount({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async deleteaccount(a, b, c, d, e) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.deleteaccount({
      'captcha': b,
      'password': c,
      'passwordRandom': {
        'randJnlNo': d,
        'random': e
      }
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async getaccountSatus(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.getaccountSatus({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async getmasterbanks() {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.getmasterbanks({}, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async getpwdrandomNo() {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.getpwdrandomNo({}, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcgetAccountbalance(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcgetAccountbalance({}, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: false
    })
    return res
  },
  async cmbcgetAccounttrades(a, b, c, d, e, f) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcgetAccounttrades({
      'account': a,
      'page': b,
      'size': c
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcPostaskforrecharge(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcPostaskforrecharge({
      'accountNo': a
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputrecharge(a, b, c) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputrecharge({
      'amount': b,
      'password': c
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcPostaskforwithdraw(a, b) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcPostaskforwithdraw({
      'accountNo': a,
      'amount': b
    }, {
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcputwithdraw(a, b, c) {
    let token = wx.getStorageSync('tokenData').access_token;
    let res = await api.cmbcputwithdraw({
      'amount': b,
      'password': c
    }, {
      baseData: false,
      addUrl: a,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  async cmbcPrivileges(a) {
    let token = wx.getStorageSync('tokenData').access_token;
    // let _list = {};    
    
    // for (var i = 0; i < a.length; i++) {    
    //     _list["mobiles[" + i + "]"] = a[i];    
    // } 
    // console.log('===_list==',_list)
    let res = await api.cmbcPrivileges(
      a
    , {
      typePam:'arr',
      baseData: false,
      contentType: 'application/json',
      token: 'bearer ' + token,
      loading: true
    })
    return res
  },
  
  onHide: function () {

    let pages = getCurrentPages();
    let pageEnd = pages[pages.length - 1]
    console.log('需要判断的跳出页面=====', pageEnd.route)
    // if(pageEnd.route == 'pages/payMsg/payMsg'){ 
    //   wx.navigateBack({
    //     delta:5
    //   })
    // }
  },
  globalData: {
    windowIsBang: false
  }
})