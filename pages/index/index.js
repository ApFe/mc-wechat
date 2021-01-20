//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: [{
      imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/banner@3x.png?v=0.01',
      goUrl: '',
      login: false
    }],
    seckill: [{
      imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/other/seckillBox@3x.png?v=0.01',
      goUrl: ''
    }],
    bannerTwo: [{
        imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_three@3x.png?v=0.01',
        goUrl: '../coffeeList/coffeeList',
        login: false
      },
      {
        imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_two@3x.png?v=0.02',
        goUrl: '../recharge/rechargeTal',
        login: false
      },
      {
        imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_one@3x.png?v=0.01',
        goUrl: '../refuelcard/refuelcard',
        login: false
      }
    ],
    tabal: {
      tabLeft: [{
          imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/tabTal@3x.png?v=0.01',
          goUrl: '../recharge/rechargeTal'
        },
        {
          imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/tab06@3x.png?v=0.01',
          goUrl: '../coffeeList/coffeeList'
        }
      ],
      tabRight: [{
          imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/tabRef@3x.png?v=0.01',
          goUrl: '../refuelcard/refuelcard'
        },
        {
          imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/tablife@3x.png?v=0.01',
          goUrl: '../coffeeList/videoLifeList?urlId=3'
        },
        {
          imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/tabvideo@3x.png?v=0.01',
          goUrl: '../coffeeList/videoLifeList?urlId=2'
        }
      ]
    },
    indexproductsArr: [{
        "id": 677,
        "code": "9138b1cf1ad8",
        "title": "爱奇艺VIP会员黄金月卡",
        "createdAt": "2018-08-24 09:02:25",
        "point": 1600,
        "price": 0,
        "product": {
          "id": 333,
          "code": "03bfddc4e4b346168enewE079fc639",
          "title": "爱奇艺VIP会员黄金月卡",
          "createdAt": "2018-08-24 09:02:25",
          "icon": "http://oss.ecashback.com.cn/integralmall/img/0C0D20915356452089D0FF6D4846F5A7.png",
          "subtitle": "爱奇艺VIP会员黄金月卡",
          "type": "NONE",
          "payMethod": "HYBRID",
          "brand": null,
          "category": null,
          "pictures": [{
            "url": "http://oss.ecashback.com.cn/integralmall/img/0C0D20915356452089D0FF6D4846F5A7.png"
          }],
        },
        "stock": 0,
        "sold": true,
        "denomination": 0,
        "channelCode": "170194"
      },
      {
        "id": 1016,
        "code": "abfee67092084453bc3c6087a9303524",
        "title": "腾讯视频VIP（季卡）",
        "createdAt": "2018-10-16 16:00:00",
        "point": 5300,
        "price": 0,
        "product": {
          "id": 500,
          "code": "abfee67092084453bc3c6087a9303524",
          "title": "腾讯视频VIP（季卡）",
          "createdAt": "2018-10-16 16:00:00",
          "icon": "http://oss.ecashback.com.cn/integralmall/img/9488041606CE43D487520944232154D3.png",
          "subtitle": "",
          "type": "NONE",
          "payMethod": "POINT",
          "brand": null,
          "category": null,
          "pictures": [{
            "url": "http://oss.ecashback.com.cn/integralmall/img/9488041606CE43D487520944232154D3.png"
          }]
        },
        "stock": 0,
        "sold": true,
        "denomination": 0,
        "channelCode": "C05020102"
      },
      {
        "id": 1122,
        "code": "0a7f3d89a3be",
        "title": "三只松鼠坚果贺岁礼进口坚果套装7品1255g",
        "createdAt": "2018-12-20 05:00:04",
        "point": 15800,
        "price": 0,
        "product": {
          "id": 579,
          "code": "28c14604af144c6c82324013461700a9",
          "title": "三只松鼠坚果贺岁礼进口坚果套装7品1255g",
          "createdAt": "2018-12-20 05:00:04",
          "icon": "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/ZM-SP18040010013201812201643300807main-1.jpg",
          "subtitle": "品质上乘，精挑细选，超大容量。",
          "type": "REAL",
          "payMethod": "HYBRID",
          "brand": null,
          "category": null,
          "pictures": [{
              "url": "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/ZM-SP18040010013201812201643300807main-1.jpg"
            },
            {
              "url": "http://ecashback.oss-cn-beijing.aliyuncs.com/loyaltyApp/lytmall/test/ZM-SP18040010013201812201643300814main-2.jpg"
            }
          ]
        },
        "stock": 0,
        "sold": true,
        "denomination": 0,
        "channelCode": "SP18040010013"
      }
    ],
    currentItemId: 2,
    cmbcqualification: false
  },
  tapBanner: function (event) {
    console.log(11111)
    let goUrl = event.currentTarget.dataset.url
    let login = event.currentTarget.dataset.login
    let tokenData = wx.getStorageSync('tokenData');
    let cmbcqualification = this.data.cmbcqualification
    if (tokenData.refresh_token) {
      app.getaccountsdetail().then(res => {
        console.log('index==', res)
        if (res.statusCode != 200 && cmbcqualification) {
          let transactionNo = wx.getStorageSync('transactionNo');
          let storageObj = wx.getStorageSync('storageObj');
          if (transactionNo) {
            storageObj && (goUrl = '/openCard/pages/openAcc/openAcccount')
            storageObj || (goUrl = '/openCard/pages/openAccResult/openAccResult')
          }
          wx.navigateTo({
            url: goUrl,
            success: function (res) {},
            fail: function (res) {

              console.log('fail' + JSON.stringify(res))
            },
            complete: function (res) {
              console.log('complete' + JSON.stringify(res))
            },
          })
        } else {

          
          return login ? wx.switchTab({
            url: '../mine/mine'
          }) : wx.navigateTo({
            url: goUrl,
            success: function (res) {},
            fail: function (res) {
    
              console.log('fail' + JSON.stringify(res))
            },
            complete: function (res) {
              console.log('complete' + JSON.stringify(res))
            },
          })


        }
      })

    } else {
      return login ? wx.navigateTo({
        url: '/pages/login/login'
      }) : wx.navigateTo({
        url: goUrl,
        success: function (res) {},
        fail: function (res) {

          console.log('fail' + JSON.stringify(res))
        },
        complete: function (res) {
          console.log('complete' + JSON.stringify(res))
        },
      })

    }


  },
  goRechargeTal: function (event) {
    wx.navigateTo({
      url: '../recharge/rechargeTal',
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
          data: 'test'
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
  goFuelCard: function (event) {
    wx.navigateTo({
      url: '../refuelcard/refuelcard',
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
          data: 'test'
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
  goOther: function (event) {
    let goUrl = event.currentTarget.dataset.url
    let tokenData = wx.getStorageSync('tokenData');
    let cmbcqualification = this.data.cmbcqualification
    if (tokenData.refresh_token) {
      app.getaccountsdetail().then(res => {
        console.log('index==', res)
        let transactionNo = wx.getStorageSync('transactionNo');
        let storageObj = wx.getStorageSync('storageObj');
        if (transactionNo) {
          storageObj && (goUrl = '/openCard/pages/openAcc/openAcccount')
          storageObj || (goUrl = '/openCard/pages/openAccResult/openAccResult')
        }
        if (res.statusCode != 200 && cmbcqualification) {
          wx.navigateTo({
            url: goUrl,
            success: function (res) {},
            fail: function (res) {

              console.log('fail' + JSON.stringify(res))
            },
            complete: function (res) {
              console.log('complete' + JSON.stringify(res))
            },
          })
        } else {
          wx.switchTab({
            url: '../mine/mine'
          })
          // wx.navigateTo({
          //   url: '/openCard/pages/openAcc/openAcccount',
          // })
        }
      })

    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }


  },
  goOtherModel: function (event) {
    let goUrl = event.currentTarget.dataset.url
    if (goUrl) {
      wx.navigateTo({
        url: goUrl,
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
            data: 'test'
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
      wx.showToast({
        title: '正在紧锣密鼓开发中...',
        icon: 'none',
        duration: 3000
      });
    }
  },
  goCoffee: function (event) {
    wx.navigateTo({
      url: '../coffeeList/coffeeList',
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
          data: 'test'
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
  goOtherPlist: function (event) {
    wx.navigateTo({
      url: '../goodsList/goodsList',
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
          data: 'test'
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
  goGoodsDetail: function (event) {
    let sold = event.currentTarget.dataset.sold
    if (!sold) {
      let code = event.currentTarget.dataset.code
      wx.navigateTo({
        url: '../goodsDetail/goodsDetail?code=' + code,
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
    } else {
      wx.showToast({
        title: '此商品已售罄',
        icon: 'none',
        duration: 3000
      });
    }

  },
  swiperChange: function (e) {
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },
  getproductsList: function (a, b, c) {
    let that = this
    app.indexproductsList(a, b, c).then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        if (res.data.length >= 1) {
          that.setData({
            indexproductsArr: res.data
          })
        }
      } else {
        getApp().status_code(res)
      }
    })
  },
  userPrivilege: function () {
    let banners = [{
      imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/banner@3x.png?v=0.01',
      goUrl: '/openCard/pages/virtualBank/virtualBank',
      login: true
    }, {
      imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/cmbcbanner@3x.png?v=0.01',
      goUrl: '/openCard/pages/opencmbc/guidepage',
      login: true
    }]
    let skell = [{
      imgUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/cmbc/seckillcmbc@3x.png?v=0.01',
      goUrl: '/openCard/pages/opencmbc/guidepage',
      login: true
    }]
    let that = this
    let tokenData = wx.getStorageSync('tokenData');
    if (tokenData.refresh_token) {
      let mobile = wx.getStorageSync('userInfo').mobile;
      app.userPrivilege(mobile).then(res => {
        wx.hideLoading()
        if (res.statusCode == 200) {
          console.log('userIn===', res.data.minShengElectronicCard)
          if (res.data.minShengElectronicCard) {
            that.setData({
              cmbcqualification: res.data.minShengElectronicCard,
              banners: banners,
              seckill: skell
            })
          }
        } else {
          getApp().status_code(res)
        }
      })
    }
  },
  onLoad: function () {
    let windowIsBang = wx.getStorageSync('windowIsBang')
    wx.showShareMenu({
      withShareTicket: true
    })
    this.setData({
      windowIsBang
    })
    this.getproductsList('MINI_HOME', 1, 10)
    

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
    this.userPrivilege()
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
    // wx.stopPullDownRefresh(); //这句也很重要
    let _This = this;
    // let oUInfo = _This.data.oUInfo;
    // (!oUInfo.unionId) && getApp().getUserData(function (result) {
    //   _This.fGetCUserInfo(result.unionId);
    //   _This.setData({
    //     oUInfo: result
    //   });
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getproductsList('MINI_HOME',1,10) 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})