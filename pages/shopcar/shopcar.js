Page({
  data: {
    goodsdata: wx.getStorageSync('shopcarData'),
    allMoney: 0,
    allchecked: true
  },
  onShow(){
    var data = wx.getStorageSync('shopcarData');
    var allMoney = 0;
    var allchecked = true;
    for(var i=0; i<data.length; i++){
      if(!data[i].checked){
        allchecked = false;
      }else{
        allMoney += (data[i].price*data[i].num);
      }
    }
    this.setData({
      goodsdata: data,
      allMoney: Math.floor(allMoney*100)/100,
      allchecked: allchecked
    })
  },

  changecheck(e){
    var checkdata = e.detail.value;
    var goodsdata = this.data.goodsdata;
    var allMoney = 0;
    var allchecked;
    // console.log(checkdata)
    if(checkdata.length === goodsdata.length){
      allchecked = true;
    }else{
      allchecked = false;
    }
    for(var j=0; j<goodsdata.length; j++){
      goodsdata[j].checked = false;
    }
    for(var i=0; i<checkdata.length; i++){
      for(var j=0; j<goodsdata.length; j++){
        if(checkdata[i] == goodsdata[j].id){
          // console.log(checkdata[i],goodsdata[j].id,goodsdata[j].price)
          allMoney += (goodsdata[j].price*goodsdata[j].num);
          goodsdata[j].checked = true;
        }
      }
    }
    this.setData({
      goodsdata: goodsdata,
      allMoney: Math.floor(allMoney*100)/100,
      allchecked: allchecked
    })
    wx.setStorageSync('shopcarData', goodsdata);
  },

  changeallcheck(e){
    var allcheck = e.detail.value.length;
    var goodsdata = this.data.goodsdata;
    var allMoney = 0;
    var allchecked;
    // console.log(allcheck)
    if(allcheck){
      for(var j=0; j<goodsdata.length; j++){
        goodsdata[j].checked = true;
        allMoney += (goodsdata[j].price*goodsdata[j].num);
      }
    }else{
      for(var j=0; j<goodsdata.length; j++){
        goodsdata[j].checked = false;
      }
    }
    this.setData({
      goodsdata: goodsdata,
      allMoney: Math.floor(allMoney*100)/100,
      allchecked: allcheck
    })
    wx.setStorageSync('shopcarData', goodsdata);
  },

  add(e){
    var index = e.currentTarget.id;
    var goodsdata = this.data.goodsdata;
    var allMoney = this.data.allMoney;
    // console.log(index,goodsdata[index])
    goodsdata[index].num += 1;
    if(goodsdata[index].checked){
      // console.log(typeof allMoney,typeof goodsdata[index].price)
      allMoney += goodsdata[index].price;
    }
    this.setData({
      goodsdata: goodsdata,
      allMoney: Math.floor(allMoney*100)/100
    })
    wx.setStorageSync('shopcarData', goodsdata);
  },

  reduce(e){
    var index = e.currentTarget.id;
    var goodsdata = this.data.goodsdata;
    var allMoney = this.data.allMoney;
    var that = this;
    // console.log('reduce',index,goodsdata[index])
    if(goodsdata[index].num>1){
      goodsdata[index].num = goodsdata[index].num - 1;
      if(goodsdata[index].checked){
        allMoney = allMoney - goodsdata[index].price;
      }
      this.setData({
        goodsdata: goodsdata,
        allMoney: Math.floor(allMoney*100)/100
      })
      wx.setStorageSync('shopcarData', goodsdata);
    }else{
      wx.showModal({
        title: '提示',
        content: '确定删除该水果吗？',
        success(res) {
          if (res.confirm) {
            if(goodsdata[index].checked){
              allMoney = allMoney - goodsdata[index].price;
            }
            goodsdata.splice(index,1);
            that.setData({
              goodsdata: goodsdata,
              allMoney: Math.floor(allMoney*100)/100
            })
            wx.setStorageSync('shopcarData', goodsdata);
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },

  deleteAll(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定清空购物车吗？',
      success(res) {
        if (res.confirm) {
          that.setData({
            goodsdata: [],
            allMoney: 0
          })
          wx.setStorageSync('shopcarData', []);
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  }


})
