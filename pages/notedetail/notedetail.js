//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");
// pages/notedetail/notedetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    authorid:'',
    author:'',
    updatedate: util.formatTime2(new Date()),
    //图片
    headimg:'',
    //样式ID
    styleid:1,
    //主键ID
    id:'',
    //富文本
    article_content:'',
    //保存按钮样式
    activeSave:false,
    saveTag:true,
    //皮肤颜色选择
    activeSkin:1,
    //字数
    fontNumber:0,
    //滚动高度
    sHeight:0,
    //背景颜色控制
    colorAarray: ['#f3edd7', '#e4d2d2', '#bdd4ca', '#d4e0e9', '#dbd4e9', '#e7dae5']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.colorAarray[options.styleid - 1],
      animation: {
        duration: 200,
        timingFunc: 'linear'
      }
    })
    this.setData({ styleid: options.styleid, id: options.id, activeSkin: options.styleid, });
    if (options.id){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + 'api/articlebyid', //仅为示例，并非真实的接口地址
        method: 'post',
        data: {
          id: this.data.id,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          wx.hideLoading();
          let da = res.data[1][0];
          if (res.data[0].code == '200') {
            this.setData({
              author: da.author,
              updatedate: da.updatedate,
              headimg: da.headimg,
              styleid: da.styleid,
              title: da.title,
              article_content: da.content,
              authorid:da.authorid
            });
            if(da.authorid!=app.globalData.openid){
              this.setData({saveTag:false})
            }
            this.computedFont();
          }
        },
        fail: () => {
          wx.hideLoading();
        }
      })
    }
    
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
    if(this.data.saveTag){
      this.setData({ activeSkin: e.currentTarget.dataset.index, styleid: e.currentTarget.dataset.index, activeSave:true});
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.colorAarray[e.currentTarget.dataset.index - 1],
      animation: {
        duration: 200,
        timingFunc: 'linear'
      }
    })
    }
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
      if (this.data.id){
        if(app.globalData.openid==this.data.authorid){
          wx.request({
            url: app.globalData.url + 'api/articleedt', //仅为示例，并非真实的接口地址
            method: 'post',
            data: {
              id: this.data.id,
              content: this.data.article_content,
              author: this.data.author,
              authorid:app.globalData.openid,
              styleid: this.data.activeSkin + '',
              headimg: this.data.headimg,
              updatedate: util.formatTime2(new Date()),
              title: this.data.article_content.slice(0, 20)
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: (res) => {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1000,
                complete: function () {
                  wx.navigateBack({
                    success: function (res) {
                    }
                  })
                }
              })
            },
            fail: () => {
              wx.showToast({
                title: '保存失败',
                icon: 'warn',
                duration: 1000,
                complete: function () {
                }
              })
            }
          })
        }
        
      }else{
        wx.request({
          url: app.globalData.url + 'api/articleins', //仅为示例，并非真实的接口地址
          method: 'post',
          data: {
            content: this.data.article_content,
            author: '',
            authorid:app.globalData.openid,
            styleid: this.data.activeSkin + '',
            headimg: this.data.headimg,
            updatedate: util.formatTime2(new Date()),
            title: this.data.article_content.slice(0,20)
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000,
              complete: function () {
                wx.navigateBack({
                  success: function (res) {
                  }
                })
              }
            })
          },
          fail: () => {
            wx.showToast({
              title: '保存失败',
              icon: 'warn',
              duration: 1000,
              complete: function () {
              }
            })
          }
        })
      }
    }
  },
  //上传图片
  uploadImg(e){
    if(this.data.saveTag){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res)=> {
          // tempFilePath可以作为img标签的src属性显示图片
          this.setData({ headimg: res.tempFilePaths[0]})
          wx.uploadFile({
            url: app.globalData.url + 'upload', //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'cover',
            header:{
              'content-type':'multipart-form-data'
            },
            success:res=>{
              this.setData({ headimg: JSON.parse(res.data).downUrl,activeSave: true});
              //do something
            }
          })
        }
      })
    }
    
  },
  //函数方法
  //计算字数
  computedFont(){
    let reg4 = /(<\/?font.*?>)|(<\/?span.*?>)|(<\/?p.*?>)|(<\/?h.*?>)|(<\/?a.*?>)|(<\/?img.*?>)/gi;
    this.setData({ fontNumber: this.data.article_content.trim().replace(reg4, '').length })
  },
  //
})