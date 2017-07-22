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

Util.prototype.isUrl = function(url) {
   	var strRegex = "^([A-Za-z]+://)?(www\\.)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=#]+$"
    var re = new RegExp(strRegex);
    return re.test(url);
}

var util = new Util();