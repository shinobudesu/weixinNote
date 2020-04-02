//app.js
App({
  //小程序初始化
  onLaunch: function () {
    let that = this;
    wx.login({
    success(response) {
      console.log('login success', response);
      wx.request({
        url: that.globalData.url +'login',
        data: {
          code: response.code
        },
        success(result) {
          console.log('登录成功后返回的信息', result)
          that.globalData.openid =  result.data.openid;
        },
        fail(err) {
          console.log('失败返回的信息', err);
        }
      })
    },
    fail(err) {
      console.log('login error', err);
    }
  })
  },

  //小程序启动且前台
  onShow:function(){

  },
  //小程序切后台
  onHide: function () {

  },
  //全局变量
  globalData: {
    //请求地址
    openid:'',
    url:''
  }
})