const util = require("../../utils/util.js");
// pages/notedetail/notedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片
    imgUrl:'../../static/image.png',
    //保存按钮样式
    activeSave:false,
    //皮肤颜色选择
    activeSkin:1,
    //样式ID
    styleid:1,
    //主键ID
    id:'',
    //字数
    fontNumber:0,
    //富文本
    article_content:'1113',
    //滚动高度
    sHeight:0,
    //背景颜色控制
    colorAarray: ['#f3edd7', '#e4d2d2', '#bdd4ca', '#d4e0e9', '#dbd4e9', '#e7dae5']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util.formatTime(new Date()));
    console.log(options);
    this.setData({ styleid: options.styleid, id: options.id, activeSkin: options.styleid,});
    this.computedFont();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.colorAarray[options.styleid -1],
      animation: {
        duration: 200,
        timingFunc: 'linear'
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let h = wx.getSystemInfoSync().windowHeight - 150;
    this.setData({ sHeight: h})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //事件触发
  //选择skin
  bindtapActive(e){
    this.setData({ activeSkin: e.currentTarget.dataset.index});
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.colorAarray[e.currentTarget.dataset.index - 1],
      animation: {
        duration: 200,
        timingFunc: 'linear'
      }
    })
  },
  bindTextAreaBlur(e){
    this.setData({ activeSave: true, article_content:e.detail.value });
    this.computedFont();
  },
  bindTextAreaFocus(e) {
    this.setData({ activeSave:false});
  },
  bindtapActiveSave(e){
    if (this.data.activeSave){
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000,
        complete:function(){
          wx.navigateBack({
            success: function (res) {
            }
          })
        }
      })
    }
  },
  //上传图片
  uploadImg(e){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({ imgUrl: res.tempFilePaths})
      }
    })
  },
  //函数方法
  //计算字数
  computedFont(){
    let reg4 = /(<\/?font.*?>)|(<\/?span.*?>)|(<\/?p.*?>)|(<\/?h.*?>)|(<\/?a.*?>)|(<\/?img.*?>)/gi;
    this.setData({ fontNumber: this.data.article_content.trim().replace(reg4, '').length })
  },
  //
})