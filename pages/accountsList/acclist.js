// pages/accountsList/acclist.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheetAl:false,
    chosTitle:'请选择账户类型',
    accTyoeNam:'全部明细',
    acctype:[
      { text: '中信联名卡账户', value: 2000 },
      { text: '网站主账户', value: 1000 },
      { text: '简易积分账户', value: 5000 },
      { text: '民生联名卡账户', value: 6000 },
      { text: '全部明细', value: 500 }
    ],
    acclistArr:[],
    acctListArr:[
      
    ],
    groups:[],
    accListTorF:false,
    number:'',
    pageNum: 1,    //分页记录数
    pageSize:10,
    show: false
  },
  changeType:function(event){
    let detaAcc=this.data.acclistArr.cards
    let groupsArr=[{"value":"500","acctno":"","integral":0,"text":"全部明细","num":""}]
    detaAcc.forEach(element => {
      let groupsObj={}
      groupsObj.value=element.type;
      groupsObj.acctno=element.cardNo;
      groupsObj.integral=element.balance;
      if(element.type=='WEB'){
        let str1 = element.loginName.substring(2,-2)
        let str2 = element.loginName.substring(element.loginName.length-4,element.loginName.length)
        let str = '('+str1+'****'+str2+')'
        groupsObj.text='网站主账户'+str;
        groupsObj.num=element.loginName;
      }else if(element.type=='NAME'){
        let str1 = element.nameCardNo.substring(4,-2)
        let str2 = element.nameCardNo.substring(element.nameCardNo.length-4,element.nameCardNo.length)
        let str = '('+str1+'****'+str2+')'
        groupsObj.text='中信联名卡账户'+str;
        groupsObj.num=element.nameCardNo;
      }else if(element.type=='MINSHENG_NAME'){
        let str1 = element.nameCardNo.substring(4,-2)
        let str2 = element.nameCardNo.substring(element.nameCardNo.length-4,element.nameCardNo.length)
        let str = '('+str1+'****'+str2+')'
        groupsObj.text='民生联名卡账户'+str;
        groupsObj.num=element.nameCardNo;
      }else if(element.type=='SIMPLE'){
        let str1 = element.mobile.substring(3,-2)
        let str2 = element.mobile.substring(element.mobile.length-4,element.mobile.length)
        let str = '('+str1+'****'+str2+')'
        groupsObj.text='简易积分账户'+str;
        groupsObj.num=element.mobile;
      }
      groupsArr.push(groupsObj)
    })
    this.setData({
      showActionsheetAl:true,
      groups: groupsArr
    })
  },
  close: function () {
    this.setData({
      showActionsheetAl: false
    })
  },
  btnClick(e) {
    console.log('账户明细==',e)
    this.setData({
      pageNum: 1,    //分页记录数
      pageSize:10,
      show: false,
      acctListArr:[]
    })
    
    let date=this.data.acclistArr.cards
    
    let that=this
    let arrList=[]
    that.data.groups.forEach((item,index) => {
      if(e.detail.value==item.value&&index==e.detail.index){
        that.setData({
          accTyoeNam:item.text
        })
        date.forEach((items,inx) => {
          if(e.detail.value==items.type&&(inx+1)==e.detail.index){

            that.setData({
              number:items.cardNo
            })
            that.onShow()
          }else if(e.detail.value==500){
            that.setData({
              number:''
            })
            that.onShow()
          }

        })

      }
    })
    this.close()
  },
  goAccLDetail:function(e){
    wx.navigateTo({
      url: '../accountsList/acclistDetail',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          // console.log(data)
        },
        someEvent: function(data) {
          // console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset.itemlist })
      },
      fail: function(res) {
        
        console.log('fail'+JSON.stringify(res))
      },
      complete: function(res) {
        console.log('complete'+JSON.stringify(res))
      },
    })
  },
  goAccListArr:function(b,c){
    let that = this;
    let numberList=that.data.number
    app.accOrderList(numberList,b,c).then(res => {
      wx.hideLoading()
      if(res.statusCode==200&&res.data.length>0){
        wx.hideLoading()
        that.setData({
          accListTorF:true,
          acctListArr:that.data.acctListArr.concat(res.data),
          total:res.data.length,
          pageNum:that.data.pageNum + 1
        })
        if (that.data.total <= 0 ) {
          that.setData({
            show: true
          })
          // wx.showToast({
          //     title   : '无更多数据',
          //     icon    : 'loading',
          //     duration: 1000
          // });

        } else {
          if (2 < that.data.pageNum){
              // wx.showToast({
              //     title   : '数据加载中',
              //     icon    : 'loading',
              //     duration: 500
              // });
          }
        }
      }else if(res.statusCode==200&&res.data.length==0){
        that.setData({
          show: true
        })
      }else{
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
    let that = this;
    let bound = true
    getApp().accountCards(bound).then(res => {
      wx.hideLoading()
      if(res.statusCode==200){
        that.setData({
          acclistArr:res.data
        })
      }else{
        getApp().status_code(res)
      }
    })
    that.goAccListArr(that.data.pageNum,that.data.pageSize)

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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this
    that.goAccListArr(that.data.pageNum,that.data.pageSize)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})