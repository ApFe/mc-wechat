// openCard/pages/openAcc/openAcccount.js
var tcity = require("../../../utils/citys.js") 
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tOrF:'未上传',
    storageObj:{
      bankcard:'',
      identity:'',
      mobile:'',
      cardHolder:''
    },
    message:'',
    bankcard:'',
    cardHolder:'',
    identity:'',
    mobile:'',
    mobileshow:false,
    showActionsheet: false,
    groups: [{
      value:0,
      text:'父母资助'
    },{
      value:1,
      text:'他人捐赠'
    },{
      value:2,
      text:'个人投资'
    },{
      value:3,
      text:'个体经营'
    }],
    submit:true,
     // 城市三级联动
     provinces: [],
     province: "",
     citys: [],
     city: "",
     countys: [],
     county: '',
     value: [0, 0, 0],
     values: [0, 0, 0],
     condition: false,
     occupationcondition:false,
     occupationc:'',
     ocpvalue: [0, 0, 0],
     ocpvalues: [0, 0, 0],
    districtCode:'',//区/县代码
    districtName:'',
    street:'',//街道详细地址
    occupation:'',//职业代码
    occupationName:'',
    occupationRemark:'',//职业备注
    company:'无',//工作单位
    cmbcchecked:false
  },
  cmbcradioChange:function(e){
    console.log('this.data.cmbcchecked==',!this.data.cmbcchecked)
    let cmbcchecked=!this.data.cmbcchecked
    this.setData({
      cmbcchecked:cmbcchecked
    })
  },
  cmbcprotocol:function(e){
    wx.navigateTo({
      url: '/openCard/pages/opencmbcp/openportocol',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  cmbcprotocol_cmbc:function(e){
    console.log('cmbcprotocol_cmbc===',e)
    let opt = e.target.dataset.pto
    wx.navigateTo({
      url: '/openCard/pages/opencmbcp/'+opt,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  address:function(e){
    this.setData({
      street: e.detail.value
    })
  },
  workunit:function(e){
    this.setData({
      company: e.detail.value
    })
  },
  selectoccup:function(event){
      this.setData({
        showActionsheet: true,
        chosTitle:'请选择'
      })
      
    },
    close: function () {
      this.setData({
          showActionsheet: false
      })
    },
    btnClick(e) {
      let that = this
      that.data.groups.forEach((item,index) => {
        if(e.detail.value==item.value){
           that.setData({
            occupationRemark:item.text,
             ocpkId:item.value
           })
         }
       });
      this.close()
    },
  // selectBank:function(event){
  //   this.setData({
  //     showActionsheet: true,
  //     chosTitle:'支持银行列表'
  //   })
    
  // },
  // close: function () {
  //   this.setData({
  //       showActionsheet: false
  //   })
  // },
  // btnClick(e) {
  //   let that = this
  //   that.data.groups.forEach((item,index) => {
  //     if(e.detail.value==item.value){
  //        that.setData({
  //          bankName:item.text,
  //          bankId:item.value
  //        })
  //      }
  //    });
  //   this.close()
  // },
  contactSupport:function(event){
    app.contactSupport()
  },
  bankcardInput:function(e){
    this.setData({
        bankcard: e.detail.value
    })
  },
  identityInput:function(e){
    this.setData({
        identity: e.detail.value
    })
  },
  holderInput:function(e){
    this.setData({
        cardHolder: e.detail.value
    })
  },
  mobileInput:function(e){
    this.setData({
        mobile: e.detail.value
    })
  },

  smsend:function(event){

  },
  gouploadIdcard:function(event){
    wx.navigateTo({
      url: '/openCard/pages/openAccFrom/openAccFrom',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  goEncryptor:function(){
    let that = this;
    let passByvalue = {};
    let back,bindCardNo,certificateNo,front,mobile,username,cmbcchecked,submit,storageObj,bankName,districtCode,districtName,street,occupation,occupationName,occupationRemark,company;
    back=this.data.back
    bindCardNo=this.data.bankcard
    certificateNo=this.data.identity
    front=this.data.front
    mobile=this.data.mobile
    username=this.data.cardHolder

    districtCode=this.data.districtCode
    districtName=this.data.districtName
    street=this.data.street
    occupation=this.data.occupation
    occupationName=this.data.occupationName
    occupationRemark=this.data.occupationRemark
    company=this.data.company
    let Regx = /^[A-Za-z0-9]*$/;
    if(street.length<6||Regx.test(street)){
      return wx.showToast({
        title: street.length<6?'请输入街道详细地址':Regx.test(street)?'街道地址不可为数字、字母或数字与字母组合':'地址信息填写有误',
        icon: 'none',
        duration: 3000
      });
    }
    if(80-occupation>0&&(company.length<4||Regx.test(company))){
      return wx.showToast({
        title: company.length<4?'请输入详细工作单位':Regx.test(company)?'工作单位不可为数字、字母或数字与字母组合':'工作单位填写非法',
        icon: 'none',
        duration: 3000
      });
    }

    submit=this.data.submit
    cmbcchecked = this.data.cmbcchecked
    if(submit&&cmbcchecked){

      if(back&&bindCardNo&&certificateNo&&front&&mobile&&username&&districtCode&&street&&occupation&&company){
        that.setData({
          submit:false
        })
        app.cmbcAccounts(back,bindCardNo,certificateNo,front,mobile,username,districtCode,street,occupation,occupationRemark,company).then(res => {
          console.log('cmbcAccounts===',res)
          wx.hideLoading()
          if(res.statusCode!=200){
              getApp().status_code(res)
              that.setData({
                submit:true
              })
          }else{
            
            bankName=that.data.bankName
            storageObj={
              back:back,
              bindCardNo:bindCardNo,
              certificateNo:certificateNo,
              front:front,
              mobile:mobile,
              username:username,
              bankName:bankName,
              districtCode:districtCode,
              street:street,
              occupation:occupation,
              occupationRemark:occupationRemark,
              company:company,
              occupationName:occupationName,
              districtName:districtName
            }
            passByvalue={
              'bankUrl':'open',
              'mobile':mobile,
              'transactionNo':res.data.serverTransactionNo,
              'passwordRandom':res.data.extensionData.random
            }
            setTimeout(() => {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 3000,
                success:function(){
                  wx.setStorageSync('passByvalue',passByvalue)
                  wx.setStorageSync('storageObj',storageObj)
                  wx.redirectTo({
                    url: '/openCard/pages/controlBox/controlBox',
                    success: function(res) {
                      // 通过eventChannel向被打开页面传送数据
                      
                    }
                  });
                }
              });
            }, 100);
              
             
          }
        })
      }else{
        wx.showToast({
          title: '请输入相关信息...',
          icon: 'none',
          duration: 3000
        });
           
      }
    }else{
      wx.showToast({
        title: '请阅读并同意中国民生银行个人人民币银行结算账户管理协议...',
        icon: 'none',
        duration: 3000
      });
    }
    
    
    
  },
  bindChangeocc:function(e){
    console.log(e);
    var val = e.detail.value
    var t = this.data.ocpvalues;
    var occupationData = this.data.occupationData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const occupationcs = [];
      for (let i = 0; i < occupationData[val[0]].children.length; i++) {
        occupationcs.push(occupationData[val[0]].children[i])
      }
      
      


      this.setData({
        occupation: this.data.occupations[val[0]],
        occupationc: occupationData[val[0]].children[0],
        occupationcs: occupationcs,
        ocpvalues: val,
        ocpvalue: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      this.setData({
        occupationc: this.data.occupationcs[val[1]],
        ocpvalues: val,
        ocpvalue: [val[0], val[1], 0]
      })
      return;
    }
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];
      let county='';

      for (let i = 0; i < cityData[val[0]].children.length; i++) {
        citys.push(cityData[val[0]].children[i])
      }
      console.log(cityData[val[0]].children[val[1]].children)
      if(cityData[val[0]].children[val[1]].children){
        
        for (let i = 0; i < cityData[val[0]].children[0].children.length; i++) {
          countys.push(cityData[val[0]].children[0].children[i])
        }
        
      }
      console.log('countys',countys.length>0)
      if(countys.length>0){
        county = cityData[val[0]].children[0].children[0]
      }
      


      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].children[0],
        citys: citys,
        county: county,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })


      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];
      let countyas = ''
        if(cityData[val[0]].children[val[1]].children){
          countyas = cityData[val[0]].children[val[1]].children[0]
          for (let i = 0; i < cityData[val[0]].children[val[1]].children.length; i++) {
            countys.push(cityData[val[0]].children[val[1]].children[i])
          }
        }
        
  
      

      this.setData({
        city: this.data.citys[val[1]],
        county:countyas,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }




  },
  // getUserInfo3:function(){
  //   this.setData({
  //     condition: !this.data.condition
  //   })
  // },
  openocp:function(){
    let that =this
    var occupationData = that.data.occupationData;
    const occupations = [];
    const occupationcs = [];
    let oneObj = ''
    for (let i = 0; i < occupationData.length; i++) {
      occupations.push(occupationData[i]);
    }
    console.log('工种完成');
    if(occupationData[0].children){
      oneObj = occupationData[0].children[0]
      for (let i = 0; i < occupationData[0].children.length; i++) {
        occupationcs.push(occupationData[0].children[i])
      }
    }
    console.log('occupationc',occupationcs);
    if(!this.data.occupation){
      that.setData({
        'occupations': occupations,
        'occupationcs': occupationcs,
        'occupation':occupationData[0],
        'occupationc': oneObj
      })
    }
    this.setData({
      occupationcondition: !this.data.occupationcondition
    })
  },
  open: function () {
    let that =this
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    let oneObj = ''
    let twoObj = ''
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i]);
    }
    console.log('省份完成');
    if(cityData[0].children){
      oneObj = cityData[0].children[0]
      for (let i = 0; i < cityData[0].children.length; i++) {
        citys.push(cityData[0].children[i])
      }
    }
    console.log('citys',citys);
    if(cityData[0].children[0].children){
      twoObj = cityData[0].children[0].children[0]
      for (let i = 0; i < cityData[0].children[0].children.length; i++) {
        countys.push(cityData[0].children[0].children[i])
      }
    }
    if(!this.data.districtCode){
      that.setData({
        'provinces': provinces,
        'citys': citys,
        'countys': countys,
        'province': cityData[0],
        'city': oneObj,
        'county': twoObj
      })
    }
    
    this.setData({
      condition: !this.data.condition
    })
  },
  openfalse:function(){
    if(!this.data.districtCode){
      this.setData({
        condition: !this.data.condition,
        'provinces': '',
        'citys': '',
        'countys': '',
        'province': '',
        'city': '',
        'county': ''
      })
    }else{
      this.setData({
        condition: !this.data.condition
      })
    }
  },
  beTrueopen:function(){
    let districtCode,districtName;
    if(this.data.county){
      districtCode = this.data.county.code
      districtName = this.data.province.name+this.data.city.name+this.data.county.name
    }else if(this.data.city){
      districtCode = this.data.city.code
      districtName = this.data.province.name+this.data.city.name
    }else{
      districtCode = this.data.province.code
      districtName = this.data.province.name
    }
    this.setData({
      condition: !this.data.condition,
      districtCode:districtCode,
      districtName:districtName,
    })
  },
  ocpfalse:function(){
    if(!this.data.occupation){
      this.setData({
        occupationcondition: !this.data.occupationcondition,
        'occupations': '',
        'occupationcs': '',
        'occupation':'',
        'occupationc': ''
      })
    }else{
      this.setData({
        occupationcondition: !this.data.occupationcondition
      })
    }
  },
  beTrueocp:function(){
    let occupation,occupationName;
    if(this.data.occupationc){
      occupation = this.data.occupationc.code
      occupationName = this.data.occupation.name+this.data.occupationc.name
      if(occupation!=80&&occupation!=81&&occupation!=82){
        this.setData({
          company:'无'
        })
        
      }
    }
    this.setData({
      occupationcondition: !this.data.occupationcondition,
      occupation:occupation,
      occupationName:occupationName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options_open',options)
    console.log("onLoad");
    var that = this;


    tcity.init(that);


    
    console.log('初始化完成');
    
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
    let front = wx.getStorageSync('front')
    let back = wx.getStorageSync('back')
    let storageObj = wx.getStorageSync('storageObj')
    let that = this
    if(front&&back){
      this.setData({
        tOrF:'已上传',
        front:front,
        back:back
      })
    }
    if(storageObj){
      this.setData({
        bankcard:storageObj.bindCardNo,
        identity:storageObj.certificateNo,
        mobile:storageObj.mobile,
        cardHolder:storageObj.username,
        bankName:storageObj.bankName,
        districtCode:storageObj.districtCode,
        street:storageObj.street,
        occupation:storageObj.occupation,
        occupationRemark:storageObj.occupationRemark,
        company:storageObj.company,
        occupationName:storageObj.occupationName,
        districtName:storageObj.districtName
      })
    }
    // app.getmasterbanks().then( res => {
    //   console.log('getmasterbanks=====',res)
    //   if(res.statusCode==200){
    //     console.log(res.data)
    //     let arrlist = []
    //     res.data.forEach((item,index,arr) => {
    //       arrlist.push({
    //         text:item.name,
    //         value:item.code
    //       })
    //     })
    //     that.setData({
    //       groups:arrlist
    //     })
    //   }
    // })
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
