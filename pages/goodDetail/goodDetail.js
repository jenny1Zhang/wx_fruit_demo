var seckillData = require('../../data/seckillData.js');
Page({
  data: {
    gooddata: {},
    swiperList: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ]
  },
  onLoad: function (options) {
    // console.log(options)
    var data = seckillData.seckillList[0].concat(seckillData.seckillList[1])
    for(var i=0; i<data.length; i++){
      if(options.good_id == data[i].id){
        this.setData({
          gooddata: data[i]
        })
        console.log(this.data.gooddata)
        return;
      }
    }

  }
})
