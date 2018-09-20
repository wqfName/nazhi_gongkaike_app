var app = getApp();
var marst = require("../request/request.js");
var vncosBase = marst.vncosBase;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videosrc:"",
    tabtest:0,
    jiage:"",
    kechengjieshao:"",
    teacher:[],
    movelist:"",
    title:"",
    kechen:"",
    ke_uid:"",
    mulu:[],
    showKe:[]
    // goumairenshu:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var queryData = {
      method:"UserOperation.itemke",
      idr:options.idr
    }
    vncosBase.request('POST', 'json', null, queryData, function (res){
        self.setData({
          title:res.data.items.title,
          // movelist:res.data.items.movelist,
          jiage:res.data.items.jiage,
          // laoshijieshao:res.data.items.laoshijianjie,
          kechen: res.data.items.kechengjieshao,
          teacher:res.data.teacher,
          ke_uid:res.data.items.id,
        })
        console.log(res);
    });

    this.setData({
      
    })
  },
  selectgenduotab: function (event) {
    var selecetab = event.currentTarget.dataset.ider;
    var self = this;
    this.setData({
      tabtest: selecetab
    });
    if(selecetab==1){
      var queryData = {
        method:"UserOperation.kechengmulu",
        id:this.data.ke_uid,
      }
      vncosBase.request('POST', 'json', null, queryData, function (res) { 
          if(res.data.mulu == false){
            self.setData({
              mulu:false
            })
          }else{
            self.setData({
              mulu:res.data.mulu
            })
          }
      })
    }
  },
  onReachBottom:function(){

  },
  videoerror : function(e){
    console.log(e);
  },
  itemDomeTap:function(nbs){
    var ShowKeList = nbs.currentTarget.dataset.ider;
    
  }
})