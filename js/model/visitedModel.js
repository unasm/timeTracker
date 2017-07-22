(function (window) {
  'use strict';
  
  function Model(storage) {
    var F = function(){};
    if (window.app !== undefined) {
        F.prototype = new window.app.BaseModel(storage);
    } else {
        F.prototype = new window.background.BaseModel(storage);
    }
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
  Model.prototype.create = function () {
  };

  console.log(window);
  debugger;
  // Export to window
  if (window.app !== undefined) {
    window.app.VisitedModel = Model;
  } else {
    if (window.background == undefined) {
        window.background = {};
    }
    window.background.VisitedModel = Model;
  }
})(window);
