//index.js
var seckillData = require('../../data/seckillData.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    address: "请选择地区",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    pageindex: 0,
    seckillList: seckillData.seckillList[0]
  },
  onReady: function () {
    // console.log('ready')
    // wx.clearStorage();
  },
  onShow: function () {
    // console.log('show')
  },

  addGood(e){
    console.log(e)
  },

  //选择地址
  chooseAdd(){
    var that = this;
    wx.chooseLocation({
      success: function(res){
        console.log(res)
        that.setData({
          address: res.name
        })
      }
    })
  },
  //扫码
  getScan(){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },

  //下拉刷新
  onPullDownRefresh: function(){
    console.log('pulldown')
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000)
  },
  //上拉加载
  onReachBottom: function(){
    // console.log('reachbottom');
    var that = this;
    wx.showLoading({
      title: '正在加载',
    });
    // console.log(that.data.pageindex,seckillData.seckillList.length)
    var index = that.data.pageindex+1;
    if(seckillData.seckillList.length>index){
      var data = that.data.seckillList.concat(seckillData.seckillList[index]);
      setTimeout(function(){
        that.setData({
          pageindex: index,
          seckillList: data
        });
        wx.hideLoading();
      },1000);
    }else{
      setTimeout(function(){
        wx.hideLoading()
      },1000);
    }
  },
  onShareAppMessage(res) {
    return {
      title: '水果商城',
      path: '/page/user?id=123'
    }
  },
  onPageScroll: function(){
    // console.log('scroll')
  },
  setMotto(){
    this.setData({
      motto: 123
    })
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(this.route)
    wx.navigateTo({
      url: '../logs/logs'
    })
    // wx.switchTab({
    //   url: '../my/my'
    // })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
