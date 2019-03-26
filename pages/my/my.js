Page({
  data: {
    userInfo: wx.getStorageSync('userInfo')

  },
  // if(!wx.getStorageSync('buyList')){
  //     wx.setStorageSync('buyList', [])
  //   }
  onReady(){
    // wx.clearStorageSync();
  },

  onGotUserInfo(e){
    // console.log(JSON.parse(e.detail.rawData));
    // console.log(JSON.parse(e.detail.rawData).nickName);
    this.setData({
      userInfo: JSON.parse(e.detail.rawData)
    })
    wx.setStorageSync('userInfo', JSON.parse(e.detail.rawData))
  }
})
