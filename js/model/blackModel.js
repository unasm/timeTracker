(function (window) {
  'use strict';
  
   /***

    blockTime : -1 表示永远禁止， 其他的表示禁止的分钟数，到时候自动允许访问
    href      : 禁止的网址
    startTime : 开始禁止的时间
    frozenTime: 冰冻期，该时间端内禁止删除
  **/

  function Model(storage) {
    var F = function(){};
    F.prototype = new window.app.BaseModel(storage);
    return new F();
  }
  /**
   * Creates a new todo model
   *
   * @param {string} [href] 要被block的 url
   * @param {string} [blockTime] block的时间长度
   * @param {string} [frozenTime] 该时间内禁止从黑名单中删除
   * @param {function} [callback] The callback to fire after the model is created
   */
  Model.prototype.create = function (href, blockTime, frozenTime, callback) {
    href = href || '';
    blockTime = blockTime || -1;
    callback = callback || function () {};

    var newItem = {
      startTime: new Date().getTime(),
      href: href,
      blockTime: blockTime,
      frozenTime : frozenTime
    };

    this.storage.save(newItem, callback);
  };

  // Export to window
  window.app.BlackModel = Model;
})(window);
