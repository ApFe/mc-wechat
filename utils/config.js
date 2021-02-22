class HOST{
  constructor() {

  }
}
class HOSTSSO{
  constructor() {

  }
}
class HOSTpwd{
  constructor() {

  }
}

// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync();

// env类型
export const env = accountInfo.miniProgram.envVersion;

switch (env) {
  case 'develop':
    // try {
    //   wx.clearStorageSync()
    // } catch(e) {
    //   wx.clearStorage()
    // }
    break;
  case 'trial':
    // try {
    //   wx.clearStorageSync()
    // } catch(e) {
    //   wx.clearStorage()
    // }
    break;
  case 'release':
    // try {
    //   wx.clearStorageSync()
    // } catch(e) {
    //   wx.clearStorage()
    // }
    console.log('线上')
    break;
  default:
    console.error("获取运行环境失败!")
    break;
}
let pwdformal,apiformal,ssoformal,pwdtesting,apitesting,ssotesting,pwdthisLocality,apithisLocality,ssothisLocality
    pwdformal = "https://app.ecashback.com.cn"
    apiformal = "https://api.ecashback.com.cn"
    ssoformal = "https://sso.ecashback.com.cn"

    pwdtesting = "https://app.test.ecashback.com.cn"
    apitesting = "https://api.test.ecashback.com.cn"
    ssotesting = "https://sso.test.ecashback.com.cn"

    pwdthisLocality = "https://app.test.ecashback.com.cn"
    apithisLocality = "https://api.test.ecashback.com.cn"
    ssothisLocality = "https://sso.test.ecashback.com.cn"
const baseApihost = {
  // 开发版
  develop: apithisLocality,//apithisLocality
  // 体验版
  trial: apitesting,//apitesting
  // 正式版
  release: apiformal
};
const baseApihostsso = {
  // 开发版
  develop: ssothisLocality,//ssothisLocality
  // 体验版
  trial: ssotesting,//ssotesting
  // 正式版
  release: ssoformal
};
const baseApihostpwd = {
  // 开发版
  develop: pwdthisLocality,//pwdthisLocality
  // 体验版
  trial: pwdtesting,//pwdtesting
  // 正式版
  release: pwdformal
};


  // HOST = 'http://10.48.14.42:8080';
  // HOST = 'https://api.test.ecashback.com.cn';
  // HOST = 'https://api.ecashback.com.cn';
  HOST = baseApihost[env];
  
  // HOSTSSO = 'http://10.48.14.42:8088';
  // HOSTSSO = 'https://sso.test.ecashback.com.cn';
  // HOSTSSO = 'https://sso.ecashback.com.cn';
  HOSTSSO = baseApihostsso[env];

  // HOSTpwd = 'https://api.test.ecashback.com.cn';
  HOSTpwd = baseApihostpwd[env];

  console.log('==version====',accountInfo.miniProgram)
  export { HOST,HOSTSSO,HOSTpwd };
  