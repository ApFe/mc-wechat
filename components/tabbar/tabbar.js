Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change: function(e) {
      var index = e.currentTarget.dataset.index * 1
      var item = this.data.data.list[index]
      console.log(item)
      console.log('====',e)
      wx.setNavigationBarTitle({
        title: item.text,
      }) 
      var choose = item.choose
      // if (item.key=="mine"){
      //   wx.redirectTo({
      //     url: './../'+item.pagePath,   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
      //   })
      // } else if (item.key=="order"){
      //   wx.navigateTo({
      //     url: './../' + item.pagePath,
      //   })
      // }
      if (choose != 'disable') {
        this.setData({
          index: index
        })
      }

      this.triggerEvent('change', {
        key: item.key,
        index: index
      })
    }
  }
})