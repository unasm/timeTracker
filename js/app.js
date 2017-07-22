/*global Store, Model, View, Controller, $$ */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function Forbidden(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
	}

	var forbidden = new Forbidden('time-tracker');
	forbidden.controller.showAll();

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

	// When the enter key is pressed fire the addItem methodho
	$$('#visited').addEventListener('click', function (e) {
		var target = e.target;
		var parNode = lookupTr(target)
		if (target.className.indexOf("add") > -1 && parNode.dataset.href != undefined) {
			forbidden.controller.addItem(e, parNode);
		}
	});
	$$('#blacked').addEventListener('click', function (e) {
		var target = e.target;
		var parNode = lookupTr(target)
		if (target.className.indexOf("delete") > -1 && parNode.dataset.id != undefined) {
			forbidden.controller.removeItem(parNode.dataset.id);
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
