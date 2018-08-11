const movieService = require('../../service/moive-service');

Page({
  data: {
    loading: false,
    bigAvatarFlag: false
  },
  onLoad: function(options) {
    const collectionData = wx.getStorageSync('collectionData');
    let collectionFlag = false;
    let alreadySeenFlag = false;
    if (collectionData[options.id]) {
      collectionFlag = true;
      if (collectionData[options.id].alreadySeenFlag) {
        alreadySeenFlag = true;
      }
    }
    if (!options.id) {
      wx.navigateBack();
    }
    wx.showLoading({
      title: '加载中',
    });
    movieService.findById(options.id, result => {
      this.setData({
        detailData: result,
        loading: true,
        id: options.id,
        collectionFlag,
        alreadySeenFlag
      });
      wx.hideLoading();
    });
  },
  onShareAppMessage: function() {
    return {
      title: `强烈推荐给你一部好电影,电影名:《${this.data.detailData.title}》 评分:${this.data.detailData.average} `,
      imageUrl: this.data.detailData.avatar,
      path: '/pages/detail/detail?id=' + this.data.id
    };
  },
  backIndex: function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  collectionMovie: function() {
    let collectionFlag = !this.data.collectionFlag;
    this.setData({
      collectionFlag
    });
    let collectionData = wx.getStorageSync('collectionData');
    if (!collectionData) {
      collectionData = {};
    }
    if (collectionFlag) {
      const data = {
        id: this.data.id,
        title: this.data.detailData.title,
        avatar: this.data.detailData.avatar,
        average: this.data.detailData.average,
        casts: this.data.detailData.casts,
        tags: this.data.detailData.tags,
        alreadySeenFlag: false
      };
      collectionData[this.data.id] = data;
      wx.showToast({
        icon: 'none',
        title: '已添加到收藏',
        duration: 800
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '已取消收藏',
        duration: 800
      })
      delete collectionData[this.data.id];
    }
    wx.setStorageSync('collectionData', collectionData);
  },
  alreadySeen: function() {
    let alreadySeenFlag = !this.data.alreadySeenFlag;
    this.setData({
      alreadySeenFlag
    });
    let collectionData = wx.getStorageSync('collectionData');
    if (alreadySeenFlag) {
      collectionData[this.data.id].alreadySeenFlag = true;
      wx.showToast({
        icon: 'none',
        title: '已添加到已看',
        duration: 800
      });
    } else {
      wx.showToast({
        icon: 'none',
        title: '已取消已看',
        duration: 800
      });
      collectionData[this.data.id].alreadySeenFlag = false;
    }
    wx.setStorageSync('collectionData', collectionData);
  },
  toggleBigAvatar: function() {
    let bigAvatarFlag = !this.data.bigAvatarFlag;
    this.setData({
      bigAvatarFlag
    });
  },
  copyMovieUrl: function() {
    wx.setClipboardData({
      data: this.data.detailData.url,
      success: function(res) {
        wx.showToast({
          icon: 'none',
          title: '该电影的地址链接已复制',
          duration: 800
        });
      }
    })
  }
});