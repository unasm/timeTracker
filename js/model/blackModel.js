(function (window) {
    'use strict';

    if (window.app !== undefined) {
        var BaseModel = window.app.BaseModel;
    } else {
        var BaseModel = window.background.BaseModel;
    }
    //console.log(BaseModel);


    /***

      blockTime : -1 表示永远禁止， 其他的表示禁止的分钟数，到时候自动允许访问
      href      : 禁止的网址
      startTime : 开始禁止的时间
      frozenTime: 冰冻期，该时间端内禁止删除
     **/

    function Model(storage) {
        BaseModel.apply(this, arguments);
        this.storage = storage;
    }

    Model.prototype = Object.create(BaseModel.prototype);
    Model.prototype.constructor = Model;


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
        this.read({href : href}, function (data) {
            if (data.length > 0) {
                if (data[0].hasOwnProperty("isDel") && data[0].isDel == 0) {
                    return;
                }
                data[0].isDel = 0;
                data[0].startTime = util.getNow();
                this.update(data[0].id, data[0], callback);  
            } else {
                var newItem = {
                    startTime: util.getNow(),
                    //startTime: new Date().getTime(),
                    href: href,
                    blockTime: blockTime,
                    frozenTime : frozenTime, 
                    rmTimes: 0, // 历史上被删除的次数
                    isDel: 0 // 当前是否已经被删除
                };

                this.storage.save(newItem, callback);
            }
        }.bind(this));
    };

    // Export to window
    if (window.app !== undefined) {
        window.app.BlackModel = Model;
    } else {
        if (window.background == undefined) {
            window.background = {};
        }
        window.background.BlackModel = Model;
    }
})(window);
