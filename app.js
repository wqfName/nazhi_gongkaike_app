//app.js
const app = getApp();
var masrt = require("pages/request/request.js");
var base = masrt.vncosBase;
App({
  data:{
    face:"../../image/defaultface.svg",
    nickname:"点击登录"
  },
  onLaunch: function (options) {
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        base.globalData.userInfo = res.data;
      },
    })
    
    base.checkNeedLogin(options);
    }
})