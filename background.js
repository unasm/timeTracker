/*************************************************************************
 * File Name :     ./background.js
 * Author  :       unasm
 * Mail :          doujm@jiedaibao.com
 * Last_Modified : 2017-07-19 20:49:31
 ************************************************************************/

 function Badge() {

 }

// 更新 标题的图标
 Badge.prototype.updateIcon = function(text) {
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

var tabs = new window.background.tabs(CONFIG.getVisitedDbName());

chrome.browserAction.onClicked.addListener(function(tab) {
    now  = (new Date()).getTime();
    chrome.browserAction.setPopup({"popup" : "popup.html"});
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    //console.log("active step into ", activeInfo);
    tabs.MoveTo(activeInfo);
});
//

//
chrome.runtime.onStartup.addListener(function() {
    console.log("on start up");
});
//
//chrome.runtime.onInstalled.addListener(function() {
    //console.log("on installed");
//});

// 用户更新url的时候，触发
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.hasOwnProperty("status") && changeInfo.status == "complete") {
        //console.log("on table updated", tab);
        tabs.Update(tabId, tab);
    }
});
//

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    //console.log("on onRemoved", tabId, removeInfo);
    tabs.Delete(tabId);
    //if (removeInfo !== undefined && removeInfo.isWindowClosing == true) {
        //tabs.Delete(tabId);
    //}
});

// 打开一个tab, 但是打开未必跳转，所以并不开始计时, 交给active 处理
chrome.tabs.onCreated.addListener(function(tabInfo) {
    if (tabInfo.id !== undefined && (tabInfo.highlighted == false) && (tabInfo.selected == false)) {
        //未被选中的情况下，创建tab，目的在于避免active 触发的时候，两次创建
        if (tabs.activeTab !== tabInfo.openerTabId && tabs.activeTab !== -1) {
            console.log("activeTab is diff oper", tabs.activeTab, tabInfo.openerTabId);
        }
        console.log("created  ready to add", tabInfo.id, tabInfo);
        tabs.Add(tabInfo.id, tabInfo);
    }
    //console.log(tabInfo);
});


//
//chrome.app.runtime.onLaunched.addListener( function() {
//    console.log("launch");
//    chrome.app.window.create("popup.html", {
//        id:"popup", 
//        bounds : {
//            height: 555,
//            width:380    
//        }
//    });
//});
