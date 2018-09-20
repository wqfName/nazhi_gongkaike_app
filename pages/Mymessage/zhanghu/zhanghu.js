
Page({

  data: {
    money:['6','66','666','998','6666'],
    moneybtn:"",
    moneyitem:"",
    balance:null,
    ipti:""
  },

  onLoad: function (options) {
    var userinfo = wx.getStorageSync("userinfo")
    this.setData({
      moneyitem:this.data.money[0],
      balance:userinfo.balance.toFixed(2),
    })
  },
  chongzhiBtnfull:function(e){
    if(e.currentTarget.dataset.index<6){
      this.setData({
        moneybtn: e.currentTarget.dataset.index,
        moneyitem: e.currentTarget.dataset.money
      })
    }else if(e.currentTarget.dataset.index >=5){
      this.setData({
        moneybtn:5
      })
      console.log(e);
    }
  },
  fuqian:function(){
    if(this.data.moneyitem!=""){
      wx.showModal({
        title: '温馨提醒',
        content: '你确定要充值' + this.data.moneyitem + "元吗？",
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '您的输入有误，请重新出入',
      })
    }
  },
  bluript:function(event){
    this.setData({
      moneyitem:event.detail.value
    })
  }
})