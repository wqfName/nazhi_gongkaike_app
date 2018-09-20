var app = getApp();
var marst = require("../../request/request.js");
var vncosBase = marst.vncosBase;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  fankui:function(e){
    var queryData = { wenti: e.detail.value.wenti, method: "UserOperation.wenti"};
    vncosBase.request('POST', 'json', null, queryData, function (res) {
      if (res.data.errorno==0){
        wx.showModal({
          showCancel:false,
          content: '反馈成功！',
          success:function(res){
            wx.navigateBack({})
          }
        })
      }
    })
  },

})