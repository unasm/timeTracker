(function () {
    'use strict';
    var alarmName = 'remindme';

    function checkFocus(callback) {
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
    //chrome.alarms.onAlarm.addListener(onAlarm);

    //$$('#toggleAlarm').addEventListener('click', doToggleAlarm);

    //checkAlarm();


})();
