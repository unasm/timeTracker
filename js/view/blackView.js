/*jshint laxbreak:true */
(function (window) {
	'use strict';

	/**
	 * Sets up defaults for all the View methods such as a default template
	 *
	 * @constructor
	 */
	function View() {
		this.defaultTemplate 
		= 	'<tr data-id="{{id}}" data-href="{{host}}">'
		+		'<td class = "url">{{href}}</td>'
		+		'<td>{{notice}}</td>'
		+		'<td>{{removeTimes}}</td>'
		+		'<td>{{delete}}</td>'
		+	'</tr>';
	}

	/**
	 * Creates an <li> HTML string and returns it for placement in your app.
	 *
	 * @param {object} data The object containing keys you want to find in the
	 *                      template to replace.
	 * @returns {string} HTML String of an <li> element
	 *
	 * @example
	 * view.show({
	 *	id: 1,
	 *	title: "Hello World",
	 *	completed: 0,
	 * });
	 */
	View.prototype.showList = function (data) {
		var i, l;
		var view = '';
		for (i = 0, l = data.length; i < l; i++) {
            if (data[i].hasOwnProperty("isDel") && data[i].isDel == 1) {
                continue;
            }
			view = view + this.showOne(data[i])
		}
		return view;
	};

	/**
     * 生成一个黑名单的dom
     *
	 * @param {object} data The object containing keys you want to find in the model
     * @example
	 *  view.showOne({
     *       startTime: new Date().getTime(),
     *       href: href,
     *       blockTime: blockTime,
     *       frozenTime : frozenTime
     * })
	 */
	View.prototype.showOne = function(row) {
        console.log(row);
		var template = this.defaultTemplate;
		var notice = '';
		var deleteNode = '';
		if (row.href == undefined) {
			return '';
		}
        //console.log(row);
		if (row.frozenTime !== -1) {
			//不允许删除
			notice = row.frozenTime + " 分钟内禁止删除，已加黑12分钟"; 
		} else {
			//不在冰冻期内就允许删除
            var now = util.getNow();
            if (row.startTime > 0) {
                //var minute = ((now - row.startTime) / 60.0).toFixed(2)
            //console.log(row.href, now - row.startTime);
                var timeStr = this.formatTime(now - row.startTime);
                notice = "<span class = 'bkMinute' title = '" + timeStr + "分钟未访问'>" + timeStr + "</span>";
                deleteNode = "<span class = 'delete'>删除</span>";
            }
		}

        var remove = "<span></span>"
        if (row.hasOwnProperty("rmTimes") && row.rmTimes > 0) {
            remove = "<span title = '" + row.rmTimes + "次被删除后重新添加'>" + row.rmTimes + "次</span>";
        }

		template = template.replace('{{id}}', row.id);
		template = template.replace('{{href}}', row.href);
		template = template.replace('{{host}}', row.href);
		template = template.replace('{{notice}}', notice);
		template = template.replace('{{removeTimes}}', remove);
		template = template.replace('{{delete}}', deleteNode);
		return template;
	};

    View.prototype.formatTime = function(length) {
        if (length < 0) {
            length = 0;
        }
        length = parseInt(length);
        var res = "";
        var day = parseInt(length / 86400);
        if (day > 0) {
            res += day + "d ";
        }
        length %= 86400;
        var hour = parseInt(length / 3660);
        if (day > 0 || hour > 0) {
            res += hour + "h " ;
        }
        length %= 3600;
        var minute = (length / 60.0).toFixed(2);
        res += minute + "m " ;
        return res;
    }
	// Export to window
	window.app.BlackView = View;
})(window);
