var app = getApp();
var marst = require("../request/request.js");
var vncosBase = marst.vncosBase;

Page({

  data: {
    index:[],
    pageNo:1,
  },

  onLoad: function (options) {
    this.arryvideo(1);
  },
  arryvideo:function(page){
    var self = this;
    var queryData = {
      method:"UserOperation.showmovelist",
      pages:this.data.pageNo,
    }
    vncosBase.request('POST', 'json', null, queryData, function (res) {
      self.setData({
        index:res.data.movelist
      })
    })
  },
  genduo:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../genduo/genduo?id='+id,
    })
  },
  keitem:function(e){
    var idr = e.currentTarget.dataset.idr;
    wx.navigateTo({
      url: "../curriculum-item/curriculum-item?idr="+idr,
    })
  },
  huan:function(e){
    this.data.pageNo++;
    this.arryvideo(1);
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})