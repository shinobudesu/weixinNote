//app.js
App({
  //小程序初始化
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //小程序启动且前台
  onShow:function(){

  },
  //小程序切后台
  onHide: function () {

  },
  userInfoReadyCallback(res){
    this.globalData.userInfo = res.userInfo;
  },
  //全局变量
  globalData: {
    //用户信息对象&用于标识书签卡片
    userInfo: null
  }
})