/*global Router, $$, $ */
(function (window) {
    'use strict';

    /**
     * Takes a model and view and acts as the controller between them
     *
     * @constructor
     * @param {object} model The model constructor
     * @param {object} view The view constructor
     */
    function Controller(model, view) {
        this.model = model;
        this.view = view;

        this.$listArea = $$("#visited");
        this.$blacked = $$("#blacked");
        this.router = new Router();
        this.router.init();
    }

    /**
     * An event to fire on load. Will get all items and display them in the
     * todo-list
     */
    Controller.prototype.showAll = function () {
        console.log("stop into visited controller");
        var nowTime = util.getNow() -  86400;
        // 获取 时间大于nowTime的所有访问列表
        this.model.formatWebList(nowTime, function(data) {
            // 根据 host 计算时间
            this.$listArea.innerHTML = this.view.showPage(data, 0);
        }.bind(this));
    };

    /**
     * 添加一个黑名单
     * object and it'll handle the DOM insertion and saving of the new item.
     *
     * @param {object} e The event object
     * @param {trNode} tr 一行的节点, 所有的想要的信息，必然都在tr里面
     * @param {string} href 对于添加黑名单来说则只需要添加
     *
     */
    Controller.prototype.addItem = function (e, href, trNode) {
    };

    /**
     * By giving it an ID it'll find the DOM element matching that ID,
     * remove it from the DOM and also remove it from storage.
     *
     * @param {number} id The ID of the item to remove from the DOM and
     * storage
     */
    Controller.prototype.removeItem = function (id) {
    };


    // Export to window
    window.app.VisitedController = Controller;
})(window);
