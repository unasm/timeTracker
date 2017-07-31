/*jshint laxbreak:true */
(function (window) {
	'use strict';

	/**
	 * Sets up defaults for all the View methods such as a default template
	 *
	 * @constructor
	 */
	function View() {
		this.pageNum = 10;
		this.defaultTemplate 
		= '<tr data-href = "{{host}}">'
		+	'<td class = "color"></td>'
		+	'<td class = "url">{{host}}</td>'
		+	'<td class = "hour textCenter">{{time}}</td>'
		+	'<td class = "textCenter prop">{{tag}}</td>'
		+	'<td class = "textCenter oper" ><button class = "add">禁止</button></td>'
		+'</tr>'
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
	View.prototype.showPage = function (data, pageId) {
		var i, l;
		var view = '';
		pageId = pageId || 0;
		var start = pageId * this.pageNum;
		if (start > (data.length)) {
			start = start.length;
		}
		var end = start + this.pageNum;
		if (end > data.length) {
			end = data.length;			
		}
		for (i = start; i < end; i++) {
			view += this.showOne(data[i])
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
        var tag = '';
		
		var minute = util.stampToMinutes(row.length);
		template = template.replace(/{{host}}/g, row.host);
		//template = template.replace('{{host}}', row.host);
		template = template.replace('{{time}}', minute);
		template = template.replace('{{tag}}', tag);
		return template;
	}
	// Export to window
	window.app.VisitedView = View;
})(window);
