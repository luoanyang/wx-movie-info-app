Page({
  data: {},
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    });

    const collectionData = wx.getStorageSync('collectionData');
    let promptFlag = false;
    const data = {};
    if (JSON.stringify(collectionData) == '{}' || collectionData == '') {
      promptFlag = true;
    } else {
      for (let i in collectionData) {
        console.log(collectionData[i].alreadySeenFlag)
        if (!collectionData[i].alreadySeenFlag) {
          data[i] = collectionData[i];
        }
      }
    }
    if(JSON.stringify(data) =='{}'){
      promptFlag = true;
    }
    this.setData({
      listData: data,
      promptFlag
    });
    wx.hideLoading();
  },
  toDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})