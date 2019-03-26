var seckillData = require('../../data/seckillData.js');

Page({
  data: {
    list: seckillData.group_book_list
  },
  onReady: function () {
    console.log(seckillData)
    console.log(this.data.list)
  },
})
