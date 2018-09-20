var app = getApp();
var marst = require("../../request/request.js");
var vncosBase = marst.vncosBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    face:"",
    moalhidde_phonenumber: false,
    moalhidde_nickname:false,
    nickname:"",
    phonenumber:"",
    selectSex:["男","女"],
    sex:"",
    selectProvince:[],
    Province:"云南省",
    selectCity: ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "文山壮族苗族自治州", "红河哈尼族彝族自治州", "西双版纳傣族自治州", "楚雄彝族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州","迪庆藏族自治州"],
    city:"",
    srcfile:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var queryData = {
      method:"UserOperation.getphonenumber",
      encryptedData: options.encryptedData,
      iv:options.iv
    }
    vncosBase.request('POST', 'json', null, queryData, function (res) {
      self.setData({
        phonenumber: res.data.phonenumber,
      })
    })
  },
  showmoal_nickname:function(){
    if (this.data.moalhidde_nickname==true){
      this.setData({ moalhidde_nickname:false})
    }else{
      this.setData({ moalhidde_nickname: true })
    }
  },
  showmoal_phonenumber: function () {
    if (this.data.moalhidde_phonenumber == true) {
      this.setData({ moalhidde_phonenumber: false })
    } else {
      this.setData({ moalhidde_phonenumber: true })
    }
  },
  setnickname:function(e){
    this.setData({
      nickname: e.detail.value
    })
    this.showmoal_nickname();
  },

  setphonenumber:function(e){
    this.setData({
      phonenumber: e.detail.value
    })
    this.showmoal_phonenumber();
  },
  setSex:function(e){
    this.setData({
      sex: this.data.selectSex[e.detail.value]
    })
  },
  setCity:function(e){
    this.setData({
      city: this.data.selectCity[e.detail.value]
    })
  },
  
  updateface:function(){
    var self = this;
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: function (res) {
        if (res.tapIndex == 0) {
          vncosBase.chooleImageFrom(['camera'], 1, function (files) {
            wx.showLoading({
              title: '上传中',
            });
            vncosBase.muploadFile(files, 'F', 0, function (ret) {
              wx.hideLoading();
              console.log(ret);
              self.data.srcfile = ret.url.remoteurl;
              self.setData({
                face: self.data.srcfile,
              });

            });
          });
        }
        else if (res.tapIndex == 1) {
          vncosBase.chooleImageFrom(['album'], 9, function (files) {
            wx.showLoading({
              title: '上传中',
            });
            vncosBase.muploadFile(files, 'F', 0, function (ret) {
              console.log(ret);
              wx.hideLoading();
              self.data.srcfile=ret.url.remoteurl;
              self.setData({
                face: self.data.srcfile,
              });
            });
          });
        }
      }
    });
  },
  setuserinfo:function(){
    var self = this;
    var queryData = {
      method:"UserOperation.setuserinfo",
      face: this.data.face == '' ? 'defaultface' : this.data.face,
      nickname: this.data.nickname,
      sex:this.data.sex,
      phonenumber: this.data.phonenumber,
      province: this.data.Province,
      city:this.data.city,
      phonenumber: this.data.phonenumber,
    }
    vncosBase.request('POST', 'json', null,queryData, function (res) {
     if(res.data.errorno==0){
        wx.navigateBack({})
     }else{
       wx.showModal({
         title: '提醒',
         content: '保存失败，请检查您的网络',
       })
     }
    })
  },
  getuserinfo:function(){
    var self = this;
    wx.getUserInfo({
      lang:"zh_CN",
      success:function(res){
        var userinfo = res.userInfo;
        console.log(userinfo);
        self.setData({
          face:userinfo.avatarUrl,
          nickname:userinfo.nickName,
          Province:userinfo.province,
          city:userinfo.city,
          sex:userinfo.gender==0?"女":(userinfo.gender==1?"男":"未知")
        })
        self.setuserinfo();
      }
    })
  }
})