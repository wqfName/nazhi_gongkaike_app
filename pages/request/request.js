var vncosBase = {
  request: function (queryMethod, dtype, file, queryData, callback, headers) {
    var self = this;
    var setHeaders = {};
    if (this.globalData.latitude > 0 && this.globalData.longitude > 0) {
      queryData.latitude = this.globalData.latitude;
      queryData.longitude = this.globalData.longitude;
    }
    if (!headers) {
      setHeaders = self.cookies;
    }
    else {
      setHeaders = Object.assign(headers, self.cookies);
    }
    setHeaders['User-Token'] = self.globalData.userInfo.token;
    if (!queryData.token && this.globalData.userInfo.token.length > 0) {
      queryData.token = this.globalData.userInfo.token;
      queryData.userid = this.globalData.userInfo.userid;
    }
    console.log(queryData);
    wx.request({
      url: this.setting.host + (file ? file : this.setting.queryFile),
      data: queryData,
      method: queryMethod,
      header: setHeaders,
      dataType: dtype ? dtype : 'json',
      fail: function (res) {
        self.messageBox('网络错误', '加载失败，请确认是否已连接到网络')
      },
      success: function (res) {
        console.log(res);
        if (res.header['Set-Cookie']) {
          var cookieArray = res.header['Set-Cookie'].split(";");
          var cookieString = '';
          for (var idx in cookieArray) {
            var cookieTest = cookieArray[idx].replace(" ", "");
            if (cookieTest.substring(0, 4) != "path") {
              cookieString += cookieTest + ';';
            }
          }
          self.cookies['Cookie'] = cookieString;
        }
        callback(res);
      }
    });
  },
  chooleImageFrom: function (source, maxCount, callback) {
    wx.chooseImage({
      count: maxCount,
      sourceType: source,
      success: function (res) {
        callback(res.tempFilePaths);
      },
    });
  },
  muploadFile: function (files, tag, beginIdx, callback) {
    var self = this;
    files = (files instanceof Array) ? files : Array(files);
    var fileCount = files.length;
    if (beginIdx < fileCount) {
      var filePath = files[beginIdx];
      var uploadUrl = this.setting.host + this.setting.queryFile;
      var formParams = { userid: this.globalData.userInfo.userid, token: this.globalData.userInfo.token, imageTag: tag, upload: 1 };
      wx.uploadFile({
        url: uploadUrl,
        filePath: filePath,
        name: 'files',
        formData: formParams,
        success: function (rs) {
          console.log(rs);
          var ret = JSON.parse(rs.data);
          ret.success = true;
          callback(ret);
          self.muploadFile(files, tag, beginIdx + 1, callback);
        },
        fail: function (rs) {
          callback({ success: false });
        }
      });
    }
  },
  trimleft: function (str) {
    return str.replace(/(^\s*)/g, "");
  },
  trimright: function (str) {
    return s.replace(/(\s*$)/g, "");
  },
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  checkNeedLogin: function (runparam) {
    var self = this;
    wx.checkSession({
      success: function () {
        var userinfo = self.globalData.userInfo;
        if (userinfo)
          self.globalData.userInfo = userinfo;
        if (self.globalData.userInfo.token.length > 0) {
          var queryData = {
            method: 'UserOperation.Userlogin',
            launchopt: runparam,
            systeminfo: self.globalData.systeminfo,
            token: self.globalData.userInfo.token,
            appid: self.setting.appid
          };
          vncosBase.request('POST', 'json', null, queryData, function (res) {
            if (res.data.errorno == 0) {
              try {
                if (res.data.todo == "login") {
                  self.userlogin(runparam);
                }
                else {
                  self.globalData.userInfo = res.data.userinfo;
                  wx.setStorageSync("userinfo", self.globalData.userInfo);
                }
              }
              catch (e) { }
            }
            else if (res.data.errorno != 0 && res.data.message) {
              self.messageBox('错误', res.data.message);
            }
          });
        }
        else
          self.userlogin(runparam);
      },
      fail: function () {
        self.userlogin(runparam);
      }
    });
  },

  userlogin(option) {
    var self = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var queryData = {
            method: 'UserOperation.Userlogin',
            launchopt: option,
            systeminfo: self.globalData.systeminfo,
            code: res.code,
            appid: self.setting.appid
          };
          vncosBase.request('POST', 'json', null, queryData, function (res) {
            if (res.data.errorno == 0) {
              try {
                self.globalData.userInfo = res.data.userinfo;
                wx.setStorage({
                  key: 'userinfo',
                  data: self.globalData.userInfo,
                });
              }
              catch (e) { }
            }
            else if (res.data.errorno != 0 && res.data.message) {
              self.messageBox('错误', res.data.message);
            }
          });
        }
      }
    });
  },
  app: function () {
    return getApp();
  },
  getbaseSdkVersion: function () {
    var version = this.globalData.systeminfo.SDKVersion.split(".");
    var mainversion = new Number(version[0] + "." + version[1]);
    var extversion = new Number(version[2]);
    return mainversion;
  },
  setting: {
    host: 'http://www.ke.com/interface',
    queryFile: '/weapp_interface.php',
    resServer: "http://www.ke.com"
  },
  globalData: {
    userInfo: { token: '', session: '', nickname: '', userid: 0, avatarurl: '', gender: "" },
    systeminfo: null,
  },
  cookies: {},
  animations: {
    popup: function (duration, delay, tranto) {
      var animation = wx.createAnimation({
        duration: duration,
        delay: delay,
        timingFunction: "ease"
      });
      animation.translateY(tranto).step();
      return animation;
    }
  }
};

module.exports = {
  vncosBase: vncosBase
};