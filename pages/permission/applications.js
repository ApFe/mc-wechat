// pages/permission/applications.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobileArr:[],
    donemobileArr:[],
    donemobile:false,
    iPhonemobile:''
  },
  inputmobile:function(e){
    
    let arrList = this.data.mobileArr
    let mobile = e.detail.value
    if(mobile.length==11){
      if(arrList.includes(mobile)){
        wx.showToast({
          title: '输入号码重复，请重新输入',
          icon: 'none',
          duration: 3000
        });
        return {
          value:''
        }
      }
      if(this.data.donemobile==true){
        this.setData({
          donemobile:false,
        })
      } 
      arrList.push(mobile)
      this.setData({
        mobileArr:arrList
      })
      wx.setStorageSync('mobileArr',arrList)
      return {
        value:''
      }
    }
  },
  delMobile:function(e){
    console.log(e.currentTarget.dataset.value)
    let delmobile= e.currentTarget.dataset.value
    let mobileArr = this.data.mobileArr 
    let newmobileArr = []
    mobileArr.forEach(element => {
      
      if(element!=delmobile) newmobileArr.push(element)
    });
    console.log(newmobileArr)
    wx.setStorageSync('mobileArr',newmobileArr)
    this.setData({
      mobileArr:newmobileArr
    })
  },
  cmbcPrivileges:function(){
    let mobileArr = this.data.mobileArr 
    let that = this
    if(!mobileArr) return
    getApp().cmbcPrivileges(mobileArr).then(res => {
      wx.hideLoading()
      if (res.statusCode == 200) {
        setTimeout(() => {
          wx.showToast({
            title: '开通成功',
            icon: 'none',
            duration: 3000
          });
        }, 100);
        wx.setStorageSync('mobileArr',[])
        that.setData({
          mobileArr:[],
          donemobileArr:mobileArr,
          donemobile:true
        })
        console.log(res)
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
    let mobileArr = wx.getStorageSync('mobileArr')
    if(mobileArr) this.setData({
      mobileArr:mobileArr
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