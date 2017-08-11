function Util() {
	
}

Util.prototype.sendNotice = function(title, content) {
    key = "reminder:" + (new Date().getTime()).getTime()
    chrome.notifications.create(key, {
        //TemplateType : "basic",
        //title : "good news",
        title : title,
//        title : "这里是一个消息",
        type : "basic",
        message : content,
        iconUrl : "images/icon128.png"
    }); 
}


Util.prototype.getNow = function() {
	return (new Date).getTime() * 0.001;
}
/**
    只去比较 ? 之前的部分，之后的内容太不可控，
 */

Util.prototype.isUrl = function(url) {
    var arr = url.split("?") ;
   	var strRegex = "^([A-Za-z]+://)?(www\\.)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=#]+$";
    var re = new RegExp(strRegex);
    return re.test(arr[0]);
}
/**
 * 解析获得url的 各个组成部分
*/
Util.prototype.parserUrl = function(href) {
    var parser = document.createElement('a');
    parser.href = href;
    return parser;
}

Util.prototype.getMin = function(vala, valb) {
    return vala > valb ? valb : vala;
}

Util.prototype.stampToMinutes = function(timestamp) {
    var tmp = timestamp / 60.0;
    //tmp = parseInt(tmp * 100) * 0.01;
    return tmp.toFixed(2) + "分钟" ;
}
var util = new Util();
