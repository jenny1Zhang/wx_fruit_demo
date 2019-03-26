Component({
  properties: {
    data: Array
  },

  pageLifetimes: {

  },

  methods: {
    goDetail(e){
      console.log(e)
      wx.navigateTo({
        url: '/pages/goodDetail/goodDetail?good_id='+e.currentTarget.id
      })
    },
    addGood(e){
      var id = e.currentTarget.id;
      var shopcardata = wx.getStorageSync('shopcarData');
      if(shopcardata){
        var flag = false;
        for(var i=0; i<shopcardata.length; i++){
          if(id === shopcardata[i].id){
            flag = true;
            shopcardata[i].num += 1;
          }
        }
        if(!flag){
          var data;
          for(var i=0; i<this.data.data.length; i++){
            if(id === this.data.data[i].id){
              data = this.data.data[i];
              break;
            }
          }
          data.num = 1;
          data.checked = true;
          shopcardata.push(data);
        }
        wx.setStorageSync('shopcarData',shopcardata);
      }else{
        var data;
        for(var i=0; i<this.data.data.length; i++){
          if(id === this.data.data[i].id){
            data = this.data.data[i];
            break;
          }
        }
        data.num = 1;
        data.checked = true;
        wx.setStorageSync('shopcarData',[data])
      }
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        duration: 1000
      })
    }
  }
})
