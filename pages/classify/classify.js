var seckillData = require('../../data/seckillData.js');
Page({
  data: {
    activeIndex1: 0,
    activeIndex2: 'Id01',
    activeIndex3: 'Id01',
    tops: [],
    classData: seckillData.classData
  },

  onShow: function () {
    var that = this;
    var query = wx.createSelectorQuery();
    var top = [];
    query.selectAll('.right_box').boundingClientRect(function(rec){
      // console.log(rec,that.data.tops)
      for(var i=0; i<rec.length; i++){
        top.push(rec[i].top)
      }
      that.setData({
        tops: top
      })
      // console.log(that.data.tops)
    }).exec()
  },

  changetypes1(e){
    var index = e.currentTarget.id;
    this.setData({
      activeIndex1: index,
      activeIndex2: 'Id01',
      activeIndex3: 'Id01',
    })
  },

  changetypes2(e){
    var index = e.currentTarget.id;
    // console.log(index)
    this.setData({
      activeIndex2: index,
      activeIndex3: index
    })
  },

  contentscroll(e){
    var tops = this.data.tops;
    var top = e.detail.scrollTop;
    var activeIndex=0;
    for(var i=1; i<tops.length; i++){
      if(top < tops[0]){
        activeIndex=0;
        this.setData({
          activeIndex2: ('Id01')
        })
        return;
      }
      if(top>tops[i-1] && top<=tops[i]){
        if(activeIndex != i){
          activeIndex = i;
          this.setData({
            activeIndex2: ('Id0'+(i+1))
          })
        }
        return;
      }
    }
  }
})
