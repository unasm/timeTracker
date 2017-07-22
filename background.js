/*************************************************************************
 * File Name :     ./background.js
 * Author  :       unasm
 * Mail :          doujm@jiedaibao.com
 * Last_Modified : 2017-07-19 20:49:31
 ************************************************************************/


function updateIcon(text) {
    if (!localStorage.hasOwnProperty('unreadCount')) {
        chrome.browserAction.setIcon({path:"images/icon128.png"});
        chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
        chrome.browserAction.setBadgeText({text:"?"});
    } else {
        chrome.browserAction.setIcon({path: "images/icon128.png"});
        chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
        chrome.browserAction.setBadgeText({
            text: text
                //text: localStorage.unreadCount != "0" ? localStorage.unreadCount : ""
        });
    }
}
//localStorage.unreadCount = 11;
function onAlarm(alarm) {
    localStorage.unreadCount += 1; 

    updateIcon(localStorage.unreadCount);
    chrome.tabs.query({'active': true}, function(tabs) {
        //chrome.tabs.update(tabs[0].id, {url: newUrl});
        //console.log(tabs[0].id);
        console.log(tabs.length);
    });
    console.log('Got alarm', alarm);
    // |alarm| can be undefined because onAlarm also gets called from
    // window.setTimeout on old chrome versions.
    //if (alarm && alarm.name == 'watchdog') {
    //  onWatchdog();
    //} else {
    //  startRequest({scheduleRequest:true, showLoadingAnimation:false});
    //}
    chrome.alarms.create('refresh', {periodInMinutes: 1});
}

// 发送一个 桌面的notice
function sendNotification(title, content) {
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

// alarms 都是通过onAlarm 来响应
//chrome.alarms.onAlarm.addListener(onAlarm);

//chrome.app.runtime.onLaunched.addListener(function() {
//  chrome.app.window.create('popup.html', {
//        frame: 'none',
//        bounds: { 
//            top: 0, 
//            left: 0,
//            // 缩小之后的宽度
//            width: parseInt(screen.availWidth / 2),
//            height: parseInt(screen.availHeight / 2)}
//    }, function(appWin) {
//        //开始的时候，默认全屏
//        appWin.fullscreen();
//    });
//});
//




//
//chrome.browserAction.onClicked.addListener(function(tab) {
//    chrome.browserAction.setPopup({"popup" : "popup.html"});
//});
//
//
//chrome.runtime.onMessage.addListener(function (message, sender) {
//    console.log("runtime on Message", message);
//})
//
//
//
//chrome.runtime.onStartup.addListener(function() {
//    console.log("on start up");
//});
//
//chrome.runtime.onInstalled.addListener(function() {
    //console.log("on installed");
//});

//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//    if (changeInfo.hasOwnProperty("status") && changeInfo.status == "complete") {
//        console.log("on table updated", tab);
//        console.log("on table changeInfo ", changeInfo);
//    }
//});
//
//chrome.tabs.onActivated.addListener(function (activeInfo) {
//    console.log("on table  actived", activeInfo);
//});
//
//chrome.tabs.onRemoved.addListener(function(removeInfo) {
//    console.log("on table remove", removeInfo);
//});
//chrome.tabs.onReplaced.addListener(function(addedTabId, removeId) {
//    console.log("on table replace", addedTabId);
//    console.log("on table replace", removeId);
//});//chrome.webNavigation.onDOMContentLoaded.addListener(function(event) {
//
//
////焦点的变化
//chrome.windows.onFocusChanged.addListener(function(winid){
//    console.log("onFocusChanged occure", winid);
//});
//
function launch() {
    console.log("launch");
    chrome.app.window.create("popup.html", {
        id:"popup", 
        bounds : {
            height: 555,
            width:380    
        }
    });
}


chrome.app.runtime.onLaunched.addListener(launch);
