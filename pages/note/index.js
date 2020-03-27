//note index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");

Page({
  data: {
    //搜索样式tag
    bindblurTag: false,
    //便签对象数组
    imageArray: [],
    nickName:''
  },
  //生命周期回调—监听页面加载
  onLoad: function() {
    console.log(app.globalData.userInfo);
    this.setData({ nickName: app.globalData.userInfo.nickName})
  },
  //生命周期回调—监听页面初次渲染完成
  onReady: function() {
    console.log('页面渲染完成');
  },
  // 生命周期回调—监听页面显示
  onShow: function() {
    this.setData({
      imageArray: [{
        url: "https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg",
        time: "2020-03-26 15:05:05",
        title: '成熟。是一种习惯啊信息..',
        id: 1,
        type: '图片便签',
        style: 1
      }, {
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '生活一般是回忆一半..',
          id: 2,
          type: '图片便签',
          style: 2
        }, {
          url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 3,
          type: '图片便签',
          style: 4
        }, {
          url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 4,
          type: '图片便签',
          style: 1
        }, {
          url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 5,
          type: '图片便签',
          style: 2
        }, {
          url: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 6,
          type: '图片便签',
          style: 3
        }, {
          url: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 7,
          type: '图片便签',
          style: 1
        }, {
          url: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 8,
          type: '图片便签',
          style: 6
        }, {
          url: "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 9,
          type: '图片便签',
          style: 5
        }, {
          url: "",
          time: "2020-03-26 15:05:05",
          title: '成熟。是一种..',
          id: 10,
          type: '文字便签',
          style: 1
        }]})
  },
  // 生命周期回调—监听页面隐藏
  onHide: function() {

  },
  // 生命周期回调—监听页面卸载
  onUnload: function() {

  },
  // 监听用户下拉动作
  onPullDownRefresh: function() {
    this.setData({}, () => {
      wx.stopPullDownRefresh();
    })
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {

  },
  // 用户点击右上角转发
  onShareAppMessage: function() {

  },
  // 页面滚动触发事件的处理函数
  onPageScroll: function() {

  },
  // 页面尺寸改变时触发
  onResize: function() {

  },
  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件处理
  // 搜索框失去焦点
  bindblur() {
    this.setData({
      bindblurTag: false
    })
  },
  // 搜索框取得焦点
  bindfocus() {
    this.setData({
      bindblurTag: true
    })
  },
  // 搜索框点击
  bindtapIcon() {
    this.setData({
      bindblurTag: true
    })
  },
  //跳转新增页
  bindtapAdd() {
    wx.navigateTo({
      url: '../notedetail/notedetail?id=&styleid=1',
      success: function (res) {
      }
    })
  },
  //长按删除
  bindlongpress(e){
    wx.showModal({
      title: '提示',
      content: '是否删除该项',
      success:(res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          this.data.imageArray.map((t,index)=>{
            if (t.id == e.currentTarget.dataset.id){
              this.data.imageArray.splice(index, 1)
              this.setData({ imageArray: this.data.imageArray})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //跳转详情页
  bindtapDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '../notedetail/notedetail?id=' + e.currentTarget.dataset.id + '&styleid=' + e.currentTarget.dataset.styleid,
      success: function (res) {
      }
    })
  }
})