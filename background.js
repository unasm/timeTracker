/*************************************************************************
 * File Name :     ./background.js
 * Author  :       unasm
 * Mail :          doujm@jiedaibao.com
 * Last_Modified : 2017-07-19 20:49:31
 ************************************************************************/


 function Tabs() {
    //key 为 tab Id
    this.tabList = {};
    // key 为 hostname
    this.webList = {};
    this.DbName = "VisitedList";
    this.activeTab = -1;
 }

//用户打开新的Tab
 Tabs.prototype.Add = function(tabId, tabInfo) {
    if (util.isUrl(tabInfo.url)) {
        this.tabList[tabId] =  {
            tabId: tabId,
            url : tabInfo.url,
            startTime : util.getNow(),
            windowId : tabInfo.windowId,
            costTime : 0
        };
    } else {
        console.log("not a url : ", tabInfo.url)
    }
 }

//用户更换 table
 Tabs.prototype.MoveTo = function(activeInfo) {
    if (this.activeTab !== -1) {
        //从一个tab 切换到另一个tab 
        tabInfo = this.tabList[this.activeTab];
        if (tabInfo !== undefined) {
            this.tabList[this.activeTab].costTime  += util.getNow() - tabInfo.startTime;
            console.log(this.activeTab + " : " + tabInfo.url + " stayed : " + this.tabList[this.activeTab].costTime + " s");
        } else {
            //说明这个tab 对应的不是 url
            console.log("strange ", this.activeTab);
        }
        
    }
    tabId = activeInfo.tabId;
    this.activeTab = tabId;
    if (!this.tabList.hasOwnProperty(tabId)) {
        this.GetOrSet(tabId);
    } else {
        //更新起止时间
        this.tabList[tabId].startTime = util.getNow();
    }
 }

//用户关闭tab
 Tabs.prototype.Delete = function() {

 }

//用户离开浏览器
 Tabs.prototype.Leave = function() {

 }
 Tabs.prototype.SetActive = function(tabId) {
    this.activeTab = tabId;
 }

//获得tab 的信息,如果得不到，则返回为空，但是 要从google的 api中初始化
 Tabs.prototype.GetOrSet = function(tabId) {
    if (this.tabList.hasOwnProperty(tabId)) {
        return this.tabList[tabId];
    }
    chrome.tabs.get(tabId, function (tabInfo) {
        this.Add(tabId, tabInfo)
    }.bind(this));
    return {};
 }
 var tabs = new Tabs();


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

// alarms 都是通过onAlarm 来响应
//chrome.alarms.onAlarm.addListener(onAlarm);


//
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.setPopup({"popup" : "popup.html"});
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log("step into ", activeInfo);
    tabs.MoveTo(activeInfo);
});
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
