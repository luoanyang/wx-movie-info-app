module.exports = {
  DEFAULT_API_HOST: "https://luoanyang.xin",

  /**
   * 一个api请求
   *
   * @param {Object} options 是请求的数据.
   * options参数为以下：
   *  host:发送请求的host.
   *  url:发送请求的url.
   *  data:发送请求的data.
   *  success:发送请求成功的回调.
   */
  apiRequest: function(options) {
    const self = this;
    const method = options.method || 'GET';
    const url = (options.host || self.DEFAULT_API_HOST) + options.url;
    wx.request({
      method,
      url,
      data: options.data,
      success(result) {
        console.log(result.data)
        options.success && options.success(result.data);
      },
      fail(result) {
        options.fail && options.fail(result);
      }
    })
  }
}