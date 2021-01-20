// pages/coffeeList/videoLifeList.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listproductsArr:[
      {
        "id":677,
        "code":"9138b1cf1ad8",
        "title":"爱奇艺VIP会员黄金月卡",
        "createdAt":"2018-08-24 09:02:25",
        "point":1600,
        "price":0,
        "product":{
            "id":333,
            "code":"03bfddc4e4b346168enewE079fc639",
            "title":"爱奇艺VIP会员黄金月卡",
            "createdAt":"2018-08-24 09:02:25",
            "icon":"http://oss.ecashback.com.cn/integralmall/img/0C0D20915356452089D0FF6D4846F5A7.png",
            "subtitle":"爱奇艺VIP会员黄金月卡",
            "type":"NONE",
            "payMethod":"HYBRID",
            "brand":null,
            "category":null,
            "pictures":[
                {
                    "url":"http://oss.ecashback.com.cn/integralmall/img/0C0D20915356452089D0FF6D4846F5A7.png"
                }
            ],
        },
        "stock":0,
        "sold":true,
        "denomination":0,
        "channelCode":"170194"
      },
      {
        "id":1016,
        "code":"abfee67092084453bc3c6087a9303524",
        "title":"腾讯视频VIP（季卡）",
        "createdAt":"2018-10-16 16:00:00",
        "point":5300,
        "price":0,
        "product":{
            "id":500,
            "code":"abfee67092084453bc3c6087a9303524",
            "title":"腾讯视频VIP（季卡）",
            "createdAt":"2018-10-16 16:00:00",
            "icon":"http://oss.ecashback.com.cn/integralmall/img/9488041606CE43D487520944232154D3.png",
            "subtitle":"",
            "type":"NONE",
            "payMethod":"POINT",
            "brand":null,
            "category":null,
            "pictures":[
                {
                    "url":"http://oss.ecashback.com.cn/integralmall/img/9488041606CE43D487520944232154D3.png"
                }
            ]
        },
        "stock":0,
        "sold":true,
        "denomination":0,
        "channelCode":"C05020102"
      }
    ]
  },
  goGoodsDetail: function (event) {
    let sold = event.currentTarget.dataset.sold
    if(!sold){
      let code = event.currentTarget.dataset.code
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?code='+code,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
        },
        fail: function (res) {
  
          console.log('fail' + JSON.stringify(res))
        },
        complete: function (res) {
          console.log('complete' + JSON.stringify(res))
        },
      })
    }else{
      wx.showToast({
        title: '此商品已售罄',
        icon: 'none',
        duration: 3000
      });
    }
    
  },
  getproductsList:function(a,b,c){
    let that = this
    let urlNam
    if(a==2){
      urlNam='VIDEO'
      wx.setNavigationBarTitle({
        title: '视频会员' 
      })
    }else{
      urlNam='LIFE'
      wx.setNavigationBarTitle({
        title: '生活娱乐' 
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#eaf9ff'
      })
    }

    app.indexproductsList(urlNam,b,c).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        if(res.data.length>=1){
          that.setData({
            listproductsArr:res.data
          })
        }
      }else{
        getApp().status_code(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      urlId:options.urlId
    })
    this.getproductsList(options.urlId,1,20) 
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