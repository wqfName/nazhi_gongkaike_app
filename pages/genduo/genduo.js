var marst = require("../request/request.js");
var vncosBase = marst.vncosBase;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabtest:0,
    index:[],
    pageSize:8,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.longinset();
    this.setData({
      tabtest: options.id,
    })
  },
  longinset:function(){
    var self = this;
    var queryData = {
      method: "UserOperation.showmovelist",
      pages: this.data.pageNo,
    }
    vncosBase.request('POST', 'json', null, queryData, function (res) {
      self.setData({
        index: res.data.movelist
      })
    })
  },
  selectgenduotab:function(event){
    var selecetab = event.currentTarget.dataset.ider;
    this.setData({
      tabtest: selecetab
    })
  },
  keitem: function (e) {
    var qipuid = e.currentTarget.dataset.qipuid;
    wx.navigateTo({
      url: '../curriculum-item/curriculum-item?qipuid=' + qipuid,
    })
  },
  onReachBottom:function(){
    if(this.data.pageSize<=100){
      this.data.pageSize *= 2;
      this.longinset();
    }else{
      wx.showToast({
        title: '没有更多数据了',
        icon:"none"
      })
    }
    
  }
})