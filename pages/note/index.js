//note index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js");

Page({
  data: {
    searchText:'',
    //便签对象数组
    imageArray: [],
    currentpage: 1,
    page: 10, //当前页总数
  },
  //生命周期回调—监听页面加载
  onLoad: function() {
    
  },
  //生命周期回调—监听页面初次渲染完成
  onReady: function() {
    console.log('页面渲染完成');
  },
  // 生命周期回调—监听页面显示
  onShow: function() {
    this.setData({ currentpage: 1, imageArray: [] }, () => {
      this.getData();
    })
  },
  // 生命周期回调—监听页面隐藏
  onHide: function() {

  },
  // 生命周期回调—监听页面卸载
  onUnload: function() {

  },
  // 监听用户下拉动作
  onPullDownRefresh: function() {
    this.setData({searchText:'', currentpage: 1, imageArray: []}, () => {
      wx.stopPullDownRefresh();
      this.getData();
    })
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    this.data.currentpage++;
    this.setData({ currentpage: this.data.currentpage}, () => {
      this.getData();
      wx.stopPullDownRefresh();
    })
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
    
  },
  // 事件处理
  // 搜索框失去焦点
  bindblur(e) {
    this.setData({
      searchText:e.detail.value,
      currentpage:1
    })
    this.setData({ imageArray: [] });
    this.getData();
  },
  // 搜索框取得焦点
  bindfocus() {
  },
  // 搜索框点击
  bindtapIcon() {
    
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
    if(app.globalData.openid==e.currentTarget.dataset.openid){
      wx.showModal({
        title: '提示',
        content: '是否删除该项',
        success:(res)=> {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: app.globalData.url + 'api/articledel', //仅为示例，并非真实的接口地址
              method: 'post',
              data: {
                id: e.currentTarget.dataset.id
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: (res) => {
                
                if(res.data[0].code==200){
                  this.data.imageArray.map((t, index) => {
                    if (t.id == e.currentTarget.dataset.id) {
                      this.data.imageArray.splice(index, 1)
                      this.setData({ imageArray: this.data.imageArray })
                    }
                  })
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000,
                    complete: function () {
                    }
                  })
                }
              },
              fail: () => {
                
              }
            })
  
            
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },
  //跳转详情页
  bindtapDetail(e){
    wx.navigateTo({
      url: '../notedetail/notedetail?id=' + e.currentTarget.dataset.id + '&styleid=' + e.currentTarget.dataset.styleid,
      success: function (res) {
      }
    })
  },
  //获取数据
  getData(){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'api/article', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        pagepre: (this.data.currentpage - 1) * this.data.page + 1,
        pagenext: (this.data.currentpage - 1) * this.data.page + this.data.page,
        page: this.data.page,
        keywords: this.data.searchText
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res) =>{
        wx.hideLoading()
        if(res.data[1].length==0){
        }else{
          res.data[1].map(item=>{
            item.updatedate = util.formatTime(new Date(item.updatedate) )
          })
          this.setData({ imageArray: [...this.data.imageArray, ...res.data[1]]})
        } 
      },
      fail:()=>{
        wx.hideLoading()
      }
    })
  }
})