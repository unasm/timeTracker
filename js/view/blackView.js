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
		= 	'<tr data-id="{{id}}">'
		+		'<td class = "url">{{href}}</td>'
		+		'<td>{{notice}}</td>'
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
		var template = this.defaultTemplate;
		var notice = '';
		var deleteNode = '';
		if (row.href == undefined) {
			return '';
		}
		console.log(row);
		if (row.frozenTime !== -1) {
			//不允许删除
			notice = row.frozenTime + " 分钟内禁止删除，已加黑12分钟"; 
		} else {
			//不在冰冻期内就允许删除
            var now = util.getNow();
            if (row.startTime > 0) {
                var minute = ((now - row.startTime) / 60.0).toFixed(2);
                notice = "已经禁止 <span class = 'bkMinute'>" + minute + "</span> 分钟";
                deleteNode = "<span class = 'delete'>删除</span>";
            }
		}

		template = template.replace('{{id}}', row.id);
		template = template.replace('{{href}}', row.href);
		template = template.replace('{{notice}}', notice);
		template = template.replace('{{delete}}', deleteNode);
		return template;
	};
	// Export to window
	window.app.BlackView = View;
})(window);
