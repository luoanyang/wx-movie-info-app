const movieService = require('../../service/moive-service');

Page({
  data: {
    loadOverFlag: false
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    movieService.findUsBox( result => {
      this.setData({
        listData: result.subjects
      });
      wx.hideLoading();
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  }
})