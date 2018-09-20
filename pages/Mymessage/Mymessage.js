var app = getApp();
var marst = require("../request/request.js");
var vncosBase = marst.vncosBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    face:"",
    nickname:"",
    moalhidde:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    islogin:false,
    balance:""
  },

  querydata:{
    Classandfunction:"base,login"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var constuserinfo = wx.getStorageSync("userinfo");
    this.setData({
      islogin: constuserinfo.islogin == null ? false : constuserinfo.islogin,
    })
    if(this.data.islogin){
      this.setData({
        face: constuserinfo.face,
        nickname: constuserinfo.nickname,
        balance:constuserinfo.balance,
      })
    }
  },
  // showmoal:function(){
  //   if(this.data.moalhidde==true){
  //     this.setData({ moalhidde:false})
  //   }else{
  //     this.setData({ moalhidde: true })
  //   }
  // },
  Myzhanghu:function(){
    wx.navigateTo({
      url: 'zhanghu/zhanghu',
    })
  },
  shoucang:function(){
    wx.navigateTo({
      url: 'shoucang',
    })
  },
  dingdan:function(){
    wx.navigateTo({
      url: 'dingdan/dingdan',
    })
  },
  wenti:function(){
    wx.navigateTo({
      url: 'wenti/wenti',
    })
  },
  loginApp:function(){
    var self = this;
    // base.request(null, this.querydata, function(res){
    // });
    base.msgbox("温馨提示","你还没有登录哟",true,null,() => {
        self.setData({
          moalhidde:true
        })
    },null);
  },
  wxlogin:function(){
    base.selcetlogin();
  },
  getPhoneNumber:function(res){
    console.log(res);
    var encryptedData = res.detail.encryptedData;
    var iv =res.detail.iv;
    wx.navigateTo({
      url: 'zhuce/zhuce?encryptedData='+encryptedData+"&iv="+iv,

    })
  },
})