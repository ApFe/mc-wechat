// openCard/pages/retrievePassword/cmbcPassword.js
const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    width: 474,//压缩图片的宽
    height: 300,//压缩图片的高
    //（默认图片）图片自己可改
    tupianurl1: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/cmbc/id_card.png?v=0.01', //显示的图片路径  在页面写 有问题 页面的默认将 /image/reg/reg4.png
    tupianurl2: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/cmbc/front_id_card.png?v=0.01',//    转为 htmls：//xxxxx 网络路径 当页面写的是相对路径 时它会默认转 
    tupianurl3: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/cmbc/hold.png?v=0.01',//    转为 htmls：//xxxxx 网络路径 当页面写的是相对路径 时它会默认转 
    //    如果判断改  src 路径为htmls：//xxxxx    会有其中一方加载不出
    captcha:'',
    shortmsg:false,
    counttime:'获取验证码',
  },
  smsInput:function(e){
    if(e.detail.value.length==6){
      this.setData({
        captcha: e.detail.value,
        submit:true
      })
    }else{
      this.setData({
        captcha: ''
      })
    }
  },
  submitCmbcBt:function(e){
    let that = this
    let accountNo,captcha,back,front,hold,passByvalue
    captcha = that.data.captcha
    front = that.data.front
    back = that.data.back
    hold = that.data.hold
    passByvalue = this.data.passByvalue
    accountNo = passByvalue.transactionNo+'/apply-reset'
    if(captcha){
      app.cmbcputapplyresetPassword(accountNo,captcha,back,front,hold).then(res =>{
        wx.hideLoading()
        if(res.statusCode==200){
          console.log('=====cmbcputapplyresetPassword=====',res)
          that.setData({
            submit:false
          })
          
          wx.setStorageSync('passByvalue',passByvalue)
          wx.redirectTo({
            url: '/openCard/pages/controlBox/controlBox',
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
            }
          });
        }else{
          getApp().status_code(res)
        }
      })
      
     
      
    }
  },
  sendBindmsg:function(e){
    let passByvalue = this.data.passByvalue
    let that = this
    app.cmbcMessage(passByvalue.mobile,passByvalue.transactionNo,'APPLY_RESET_TRADE_PASSWORD').then(res=>{
      console.log('cmbcMessage===',res)
      wx.hideLoading()
      if(res.statusCode==201){
        that.setData({
          shortmsg:true
        })
        countDown(that,90);
      }else{
        getApp().status_code(res)
      }
      
    })
  },
  goEncryptor:function(){
    let that = this
    let front,back,hold,message,passByvalue
    front = this.data.front
    back = this.data.back
    hold = this.data.hold
    message = this.data.message
    passByvalue = this.data.passByvalue
    if(message){//处理跳转
      wx.setStorageSync('restback', back);
      wx.setStorageSync('restfront', front);
      wx.setStorageSync('resthold', hold);

      app.cmbcMessage(passByvalue.mobile,passByvalue.transactionNo,'APPLY_RESET_TRADE_PASSWORD').then(res=>{
        console.log('cmbcMessage===',res)
        wx.hideLoading()
        if(res.statusCode==201){
          that.setData({
            mobileshow:true,
            shortmsg:true
          })
          countDown(that,90);
        }else{
          getApp().status_code(res)
        }
      })
     
    }else{
      wx.showToast({
        title: '请上传相关信息...',
        icon: 'none',
        duration: 3000
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let back,front,hold
    back=wx.getStorageSync('restback');
    front=wx.getStorageSync('restfront');
    hold=wx.getStorageSync('resthold');
    if(back&&front&&hold){
      this.setData({
        tupianurl1: 'data:image/png;base64,' + front,
        tupianurl2: 'data:image/png;base64,' + back,
        tupianurl3: 'data:image/png;base64,' + hold,
        back:back,
        front:front,
        hold:hold,
        message:true
      })
    }


    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log('acceptDataFromOpenerPage===',data)
      that.setData({
        passByvalue:data.passByvalue
      })
    })
 
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  }, 
  choose(e){
    let that = this;
    let eIndex =e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有 'original', 
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      async success(photo){
        let a = await that.compressImg(photo.tempFilePaths[0],eIndex)
        console.log(a)
      }
    })
  },
  async compressImg(photoSrc,eIndex){
    let that = this 
    let uploadFile = '';
    let canvas = wx.createCanvasContext('scannerCanvas')//id
    return new Promise((resolve,reject) => {
      wx.getImageInfo({
        src: photoSrc,
        success(res){
          let originWidth, originHeight,ratio,maxWidth,maxHeight;

                maxWidth = that.data.width;
                maxHeight = that.data.height;
                originHeight = res.height;
                originWidth = res.width;
                ratio = originWidth / originHeight;
                console.log('originWidth=1=',originWidth);
                
            // 目标尺寸
          let targetWidth = originWidth,
          targetHeight = originHeight;
          //等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
          ({ targetWidth, targetHeight } = deassign(originWidth, maxWidth, originHeight, maxHeight, targetWidth, targetHeight, ratio));
          canvas.clearRect(0, 0, targetWidth, targetHeight);
          canvas.drawImage(photoSrc, 0, 0, targetWidth, targetHeight);
          canvas.draw(false, () => {
            setTimeout(function() {
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: targetWidth,
                height: targetHeight,
                destWidth: targetWidth,
                destHeight: targetHeight,
                fileType: 'jpg',
                quality:0.5,
                canvasId: 'scannerCanvas',
                async success (uploadres){
                  uploadFile = uploadres.tempFilePath;
                  await that.uploadImgF(uploadFile,eIndex)
                  
                  console.log('canvasToTempFilePath==01==',uploadFile)
                  
                  
                },
                fail: (err) => {
                  console.error(err)
                }
              }, this)
            }, 500);
          });
        }
      })
    })
  },
  async uploadImgF(uploadFile,eIndex){
    let that =this;
    return wx.getFileSystemManager().readFile({
      filePath: uploadFile,
      encoding: "base64",
      success: function(data) { 

        if (eIndex == 0) {
          that.setData({
            tupianurl1: uploadFile,
            front:data.data
          })
        }

        if (eIndex == 0) {
          that.setData({
            tupianurl1: uploadFile,
            front:data.data
          })
        } else if (eIndex == 1) {
          that.setData({
            tupianurl2: uploadFile,
            back:data.data
          })
        } else if (eIndex == 2) {
          that.setData({
            tupianurl3: uploadFile,
            hold:data.data
          })
        }
        if(that.data.tupianurl2&&that.data.tupianurl1&&that.data.tupianurl3){
          that.setData({
            message:true
          })
        }
        console.log('base64==',data.data) 
      }
    })
  }
})

function deassign(originWidth, maxWidth, originHeight, maxHeight, targetWidth, targetHeight, ratio) {
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > maxWidth / maxHeight) {
      // 要求宽度*(原生图片比例)=新图片尺寸
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth / ratio);
    }
    else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * ratio);
    }
  }
  return { targetWidth, targetHeight };
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