(function (window) {
    'use strict';
    // 详细记录每一条用户访问情况的日志
    function InnerModel(storage) {
        if (window.app !== undefined) {
            window.app.BaseModel.apply(this, arguments);
        } else {
            window.background.BaseModel.apply(this, arguments);
        }
        this.storage = storage;
        this.Buffer = [];
    };


    if (window.app !== undefined) {
        InnerModel.prototype = Object.create(window.app.BaseModel.prototype);
    } else {
        InnerModel.prototype = Object.create(window.background.BaseModel.prototype);
    }
    InnerModel.prototype.constructor = InnerModel;

    /**
     * Creates a new todo model
     *
     * @param {string} [url]   url地址
     * @param {string} [blockTime] lastTime 上次访问时间
     * @param {function} [callback] The callback to fire after the model is created
     */
    InnerModel.prototype.create = function (url, visitTime, title) {
        if (visitTime < 0.5) {
            // 一闪而过的页面，并不记录,减小数据量
            return false;
        }
        var hostname = util.parserUrl(url).hostname;
        title = title || '';
        var newItem =  {
            host : hostname,
            url : url,
            costTime : visitTime,
            startTime : util.getNow() - visitTime,
            title : title
        }
        this.storage.save(newItem, function (updateData){
            console.log(updateData) 
        });
        //    }.bind(this));
}

//求一定时间之内 所有的访问网站列表
InnerModel.prototype.formatWebList = function (startTime, callback) {

    var webList = {};
    this.read({startTime : startTime}, function(data) {
        console.log(data);
        //data = [];
        //var newItem =  {
        //    host : "www.baidu.com",
        //    url : "http://www.yi-jy.com/2016/03/20/chrome-plug-manifest/",
        //    costTime : 112.12,
        //    startTime : util.getNow() - 112.12,
        //    title : "htllo,world"
        //}
        //data.push(newItem);
        //newItem = {
        //    host : "www.sina.com",
        //    url : "http://www.yi-jy.com/2016/03/20/chrome-plug-manifest/",
        //    costTime : 1.12,
        //    startTime : util.getNow() - 112.12,
        //    title : "htllo,world"
        //}
        //data.push(newItem);
        for (var i = 0; i < data.length; i++) {
            if (!data[i].hasOwnProperty("host")) {
                data[i].host = util.parserUrl(data[i].url).hostname;
            }
            var host = data[i].host ;
            if (!webList.hasOwnProperty(host)) {
                webList[host] = {
                    length: 0,
                    host: host,
                    times : 0,
                    startTime : -1,
                }
            }

            webList[host].length += data[i].costTime;
            webList[host].times += 1;
            if (webList[host].startTime == -1) {
                webList[host].startTime = data[i].startTime ;
            } else if (webList[host].startTime >  data[i].startTime) {
                webList[host].startTime = data[i].startTime;
            }
        }
        var sortList = [];
        webList.each(function(data) {
            console.log(data);
            sortList.push(data);
        });
        //for (var key in webList) {
        //    console.log(key) ;
        //    sortList.push(webList[key]);
        //}
        //console.log(sortList);
        sortList.sort(function(a, b) {
           return b.length - a.length;
        });
        console.log(sortList);
        callback(sortList);
    }, function (data, query) {
        //求大于startTime的值
        for (var q in query) {
            return data[q] > query[q];
        }
    });
}


InnerModel.prototype.SyncData = function () {
    console.log("visit model SyncData");
}


// Export to window
if (window.app !== undefined) {
    window.app.LogModel = InnerModel;
    //    window.app.VisitedModel = Model;
} else {
    if (window.background == undefined) {
        window.background = {};
    }
    window.background.LogModel = InnerModel;
}
})(window);
