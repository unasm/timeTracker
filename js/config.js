/*************************************************************************
  * File Name :     ./js/config.js
  * Author  :       unasm
  * Mail :          doujm@jiedaibao.com
  * Last_Modified : 2017-07-30 17:09:18
 ************************************************************************/


function config () {
    this.visitDbName = "VisitedLogList";
    this.forbiddenDbName = "forbiddenDbList";
}

config.prototype.getVisitedDbName = function () {
    return this.visitDbName;
}

config.prototype.getForbiddenDbName = function () {
    return this.forbiddenDbName;
}

var CONFIG = new config();
