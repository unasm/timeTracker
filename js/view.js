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
			notice = "已经禁止12分钟";
			deleteNode = "<span class = 'delete'>删除</span>";
		}

		template = template.replace('{{id}}', row.id);
		template = template.replace('{{href}}', row.href);
		template = template.replace('{{notice}}', notice);
		template = template.replace('{{delete}}', deleteNode);
		return template;
	}

	/**
	 * Displays a counter of how many to dos are left to complete
	 *
	 * @param {number} activeTodos The number of active todos.
	 * @returns {string} String containing the count
	 */
	View.prototype.itemCounter = function (activeTodos) {
		var plural = activeTodos === 1 ? '' : 's';

		return '<strong>' + activeTodos + '</strong> item' + plural + ' left';
	};

	/**
	 * Updates the text within the "Clear completed" button
	 *
	 * @param  {[type]} completedTodos The number of completed todos.
	 * @returns {string} String containing the count
	 */
	View.prototype.clearCompletedButton = function (completedTodos) {
		if (completedTodos > 0) {
			return 'Clear completed (' + completedTodos + ')';
		} else {
			return '';
		}
	};

	// Export to window
	window.app.View = View;
})(window);
