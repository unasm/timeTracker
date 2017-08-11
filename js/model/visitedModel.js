(function (window) {
  'use strict';
  
   function InnerModel(storage) {
      if (window.app !== undefined) {
        window.app.BaseModel.apply(this, arguments);
      } else {
        window.background.BaseModel.apply(this, arguments);
      }
      this.storage = storage;
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
   * @param {string} [host]   host 地址
   * @param {string} [blockTime] lastTime 上次访问时间
   * @param {function} [callback] The callback to fire after the model is created
   */
  InnerModel.prototype.create = function (url, visitTime) {
    var hostname = util.parserUrl(url).hostname;
    if (this.read({host : hostname}, function(data) {
        console.log(data);
        if (data.length == 0) {
          var newItem =  {
            host : hostname,
            costTime : visitTime
          }
          this.storage.save(newItem, function (updateData){
            console.log(updateData) 
          });
        } else if (data.length == 1){
          var exist = data[0];
          var newItem = {
            host : hostname,
            costTime : exist.costTime + visitTime
          };
          console.log(newItem);
          this.storage.save(exist.id, newItem, function(updateData) {
            console.log(updateData);
          });
          console.log("exists data");
        } else {
          console.log("error", url) ;
        }
       
    }.bind(this)));
//    }.bind(this));
  };


  InnerModel.prototype.SyncData = function () {
    console.log("visit model SyncData");
  }


 // Export to window
  if (window.app !== undefined) {
    window.app.VisitedModel = InnerModel;
//    window.app.VisitedModel = Model;
  } else {
    if (window.background == undefined) {
        window.background = {};
    }
    window.background.VisitedModel = InnerModel;
  }
})(window);
