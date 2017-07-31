(function () {
    'use strict';
    var alarmName = 'remindme';

    function checkAlarm(callback) {
        chrome.alarms.getAll(function(alarms) {

            var hasAlarm = alarms.some(function(a) {
                return a.name == alarmName;
            });

            var newLabel;
            if (hasAlarm) {
                newLabel = 'Cancel alarm';
            } else {
                newLabel = 'Activate alarm';
            }
            document.getElementById('toggleAlarm').innerText = newLabel;

            if (callback) callback(hasAlarm);
        });
    }

    function createAlarm() {
        chrome.alarms.create(alarmName, {
            delayInMinutes: 0.1, periodInMinutes: 0.1});
    }

    function cancelAlarm() {
        chrome.alarms.clear(alarmName);
    }

    function doToggleAlarm() {
        checkAlarm( function(hasAlarm) {
            if (hasAlarm) {
                cancelAlarm();
            } else {
                createAlarm();
            }
            checkAlarm();
        });
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
        tabs.model.SyncData();
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


    $$('#toggleAlarm').addEventListener('click', doToggleAlarm);

    checkAlarm();

})();
