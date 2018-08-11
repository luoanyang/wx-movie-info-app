const util = require('./../utils/util');

module.exports = {
  /**
   * 查找 电影TOP250.
   *
   * @param {Number} page 页码.
   * @param {Function} cb 回调函数.
   */
  findTop250(page, cb) {
    util.apiRequest({
      url: '/api/movie/top250?page=' + page,
      success(result) {
        cb(result);
      }
    });
  },

  /**
   * 查找 电影院上映电影.
   *
   * @param {Number} page 页码.
   * @param {Function} cb 回调函数.
   */
  findOnNow(page, cb) {
    util.apiRequest({
      url: '/api/movie/on-now?page=' + page,
      success(result) {
        cb(result);
      }
    });
  },
  /**
   * 查找 电影院上映的所有电影
   * @param {Function} cb 回调方法.
   */
  findOnNowAll(cb){
    util.apiRequest({
      url: '/api/movie/on-now-all',
      success(result) {
        cb(result);
      }
    });
  },

  /**
   * 查找 即将上映的电影.
   *
   * @param {Number} page 页码.
   * @param {Function} cb 回调函数.
   */
  findComingSoon(page, cb) {
    util.apiRequest({
      url: '/api/movie/coming-soon?page=' + page,
      success(result) {
        cb(result);
      }
    });
  },
  /**
   * 根据电影id查找电影详细信息.
   *
   * @param {String} id 电影的id.
   * @param {Function} cb 回调函数.
   */
  findById(id, cb) {
    util.apiRequest({
      url: '/api/movie/subject/' + id,
      success(result) {
        cb(result);
      }
    });
  },
  /**
   * 查找北美最火电影.
   *
   * @param {Function} cb 回调函数.
   */
  findUsBox(cb) {
    util.apiRequest({
      url: '/api/movie/us-box',
      success(result) {
        cb(result);
      }
    });
  },
  /**
   * 根据关键字搜索电影.
   *
   * @param {String} keyword 关键字.
   * @param {Function} cb 回调函数.
   */
  searchByKeyword(keyword, cb) {
    util.apiRequest({
      url: '/api/movie/search?q=' + keyword,
      success(result) {
        cb(result);
      }
    });
  },
  /**
   * 根据标签搜索电影.
   *
   * @param {String} tag 标签.
   * @param {Function} cb 回调函数.
   */
  searchByTag(tag, cb) {
    util.apiRequest({
      url: '/api/movie/search?tag=' + tag,
      success(result) {
        cb(result);
      }
    });
  }
};