// pages/index/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {
      type: String,
      value: 'default value',
    }
  },
  lifetimes: {
    attached() {
        // 在组件实例进入页面节点树时执行
        console.log('home===',this.data.defaultValue)
    },
    ready() {
        // 在组件在视图层布局完成后执行
        console.log(this.data.defaultValue)
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/banner@3x.png',
        goUrl: '/pages/goodsDetail/goodsDetail'
      },
      {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner/banner@3x.png',
        goUrl: '/pages/goodsDetail/goodsDetail'
      }

    ],
    bannerTwo: [
      {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_three@3x.png',
        goUrl: '/pages/goodsDetail/goodsDetail'
      },
      {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_two@3x.png',
        goUrl: '/pages/goodsDetail/goodsDetail'
      },
      {
        linkUrl: 'https://ecashback.oss-cn-beijing.aliyuncs.com/xcx/images/banner_t/t_one@3x.png',
        goUrl: '/pages/goodsDetail/goodsDetail'
      }
    ],
    currentItemId: 2
  },
  goRechargeTal:function(event){
    console.log("goRechargeTal")
    wx.navigateTo({
      url: '../recharge/rechargeTal',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goGoodsList:function(event){
    console.log("goGoodsList")
    wx.navigateTo({
      url: '../goodsList/goodsList',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goGoodsDetail: function (event) {
    console.log("goGoodsDetail")
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
      fail: function (res) {

        console.log('fail' + JSON.stringify(res))
      },
      complete: function (res) {
        console.log('complete' + JSON.stringify(res))
      },
    })
  },
  swiperChange: function (e) {
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

})