/*global Store, Model, View, Controller, $$ */
(function () {
	'use strict';
	var ENTER_KEY = 13;

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Forbidden(name) {
		this.storage = new app.Store(name);
		this.model = new app.BlackModel(this.storage);
		this.view = new app.BlackView();
		this.controller = new app.BlackController(this.model, this.view);
		this.controller.showAll();
	}

	function Visited(name) {
		this.storage = new app.Store(name);
		this.model = new app.VisitedModel(this.storage);	
		this.view = new app.VisitedView();	
		this.controller = new app.VisitedController(this.model, this.view);
		this.controller.showAll();
	}

	var forbidden = new Forbidden('forbiddenList');
	var visited  = new Visited('VisitedList');

	/**
	 * Finds the model ID of the clicked DOM element
	 *
	 * @param {object} target The starting point in the DOM for it to try to find
	 * the ID of the model.
	 */
	function lookupTr(target) {
		var lookup = target;

		while (lookup.nodeName !== 'TR') {
			lookup = lookup.parentNode;
		}

		return lookup
//		return lookup.dataset.href;
	}
	/**
	 * 解析获得url的 各个组成部分
	 */
	function parserUrl(href) {
		var parser = document.createElement('a');
		parser.href = href;
		return parser;
	}

	function isUrl(url){
   		var strRegex = "^([A-Za-z]+://)?(www\\.)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$"
        var re=new RegExp(strRegex);
        return re.test(url);
	}
	function getHostname(url) {
		if (!(url.substr(0, 7) === "http://")) {
			url = "http://" + url;
		}
		var node = document.createElement("a");
		node.href = url;
		return node.hostname;
	}

	// When the enter key is pressed fire the addItem methodho
	$$('#visited').addEventListener('click', function (e) {
		var target = e.target;
		var parNode = lookupTr(target)
		if (target.className.indexOf("add") > -1 && parNode.dataset.href != undefined) {
			forbidden.controller.addItem(e, parNode.dataset.href, parNode);
		}
	});
	$$('#blacked').addEventListener('click', function (e) {
		var target = e.target;
		var parNode = lookupTr(target)
		if (target.className.indexOf("delete") > -1 && parNode.dataset.id != undefined) {
			forbidden.controller.removeItem(parNode.dataset.id);
		}
	});
	$$('#add-black').addEventListener('keypress', function (e) {
		var target = e.target;
		if (e.keyCode == ENTER_KEY) {
			if (isUrl(target.value) == false) {
				return true;
			}
			var hostname = getHostname(target.value);
			forbidden.controller.addItem(e, hostname);
			target.value = '';
		}
	});

	// A delegation event. Will check what item was clicked whenever you click on any
	// part of a list item.
//	$$('#todo-list').addEventListener('click', function (e) {
//		var target = e.target;
//
//		// If you click a destroy button
//		if (target.className.indexOf('destroy') > -1) {
//			todo.controller.removeItem(lookupId(target));
//		}
//
//		// If you click the checkmark
//		if (target.className.indexOf('toggle') > -1) {
//			todo.controller.toggleComplete(lookupId(target), target);
//		}
//
//	});
//
//	$$('#todo-list').addEventListener('dblclick', function (e) {
//		var target = e.target; if (target.nodeName === 'LABEL') { todo.controller.editItem(lookupId(target), target); } });
//
//	$$('#toggle-all').addEventListener('click', function (e) {
//		todo.controller.toggleAll(e);
//	});
//
//	$$('#clear-completed').addEventListener('click', function () {
//		todo.controller.removeCompletedItems();
//	});
})();
