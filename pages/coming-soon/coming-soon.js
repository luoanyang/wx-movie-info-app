const movieService = require('../../service/moive-service');

Page({
  data: {
    pageNumber: 1,
    loadOverFlag: false
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    movieService.findComingSoon(this.data.pageNumber, result => {
      this.setData({
        listData: result.subjects,
        countPage: Math.ceil(result.total / 10)
      });
      wx.hideLoading();
    })
  },
  loadNextPage: function () {
    this.data.pageNumber++;
    if (this.data.pageNumber > this.data.countPage) {
      this.setData({
        loadOverFlag: true
      })
      return false;
    }
    wx.showLoading({
      title: '加载中',
    });
    movieService.findComingSoon(this.data.pageNumber, result => {
      this.setData({
        listData: [...this.data.listData, ...result.subjects],
        pageNumber: this.data.pageNumber
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