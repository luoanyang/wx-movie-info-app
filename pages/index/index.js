const movieService = require('../../service/moive-service');

Page({
  data: {
    swiperHeight: 220,
    currentDotIndex: 0,
    selectBoxHeight: 160,
    loading: true,
    selectBoxMT: 14 //选择栏目的margin-top
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    });
    let timeOut = setTimeout(() => {
      wx.hideLoading();
      this.setData({
        loading: false
      });
    }, 8000);
    movieService.findOnNowAll(result => {
      clearTimeout(timeOut);
      this.setData({
        loading: false,
        recommendMovie: result.subjects.filter(item => {
          return item.rating.average >= 7.5;
        })
      });
      wx.hideLoading();
    });
  },
  swiperChange: function(e) {
    this.setData({
      currentDotIndex: e.detail.current
    });
  },
  toOnNow: function() {
    wx.navigateTo({
      url: '/pages/on-now/on-now'
    });
  },
  toComingSoon: function() {
    wx.navigateTo({
      url: '/pages/coming-soon/coming-soon'
    });
  },
  toUsBox: function() {
    wx.navigateTo({
      url: '/pages/us-box/us-box'
    });
  },
  toTop250: function() {
    wx.navigateTo({
      url: '/pages/top-250/top-250'
    });
  },
  toDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    });
  },
  toCollection: function() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    });
  },
  toAlreadySeen: function() {
    wx.navigateTo({
      url: '/pages/already-seen/already-seen'
    });
  },
  onShareAppMessage: function() {
    return {
      title: '我在使用白菜电影资讯哦😄',
      path: '/pages/index/index'
    };
  }
});