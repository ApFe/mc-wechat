import { Config } from 'config.js';

class Token {
  constructor() {
    console.log(this)
    this.verifyUrl = Config.restUrl + '/oauth/token';
    this.tokenUrl = Config.restUrl + '/oauth/token';
  }

  verify() {
    var token = wx.getStorageSync('token');
    console.log(token)
    if(!token) {
      this.getTokenFromServer(token);
    }else{
      this._verifyFromServer(token);
    }
  }

  // 携带令牌去服务器校验令牌
  _verifyFromServer(token) { 
    console.log(11212)
    var that = this;
    const account = wx.getStorageSync("account")
    // console.log(token)
    // console.log(wx.getStorageSync("token"))
    // console.log(account)
    const tokenn = wx.getStorageSync("token")
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: tokenn,
        account:account
      },
      success: function (res) {
        console.log(res)
        return false
        var valid = res.data.isValid;
      
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }


  // 从服务器获取token
  getTokenFromServer(callback) {
    var that = this;
    wx.login({
      success: function(res) {
        let code = res.code
        console.log('getTokenFromServer',code)
        wx.getUserInfo({
          lang: "zh_CN",
          success: res => {
            let userInfo = res.userInfo
            wx.request({
              url: that.tokenUrl,
              method: 'POST',
              data: {
                client_id:'leyitong-api',
                client_secret:'leyitong',
                code: code,
                grant_type:'we_chat_mini'
              },
              header: {
                "content-type": "application/x-www-form-urlencoded",
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                wx.setStorageSync('token', res.data.data.token);
                wx.setStorageSync('account', res.data.data.account);
                wx.setStorageSync('userid', res.data.data.user_id);
              }
            })
          }
        })
        
      }
    })
  }

  
}

export { Token };
