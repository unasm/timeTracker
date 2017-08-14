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
        console.log(name);
		this.storage = new app.Store(name);
        this.visitModel = new app.LogModel(this.storage);
        this.visitView = new app.VisitedView;
        this.visitController = new app.VisitedController(this.visitModel, this.visitView);
        this.visitController.showAll();
	}
	if (window.location.href.indexOf('#') === -1) {
        window.location.hash = '#/';
    }

	var forbidden = new Forbidden(CONFIG.getForbiddenDbName());
	var visited  = new Visited(CONFIG.getVisitedDbName());

	/**
	 * Finds the model ID of the clicked DOM element
	 *
	 * @param {object} target The starting point in the DOM for it to try to find
	 * the ID of the model.
	 */
	function lookupTr(target) {
		var lookup = target;
        //while (lookup.hasOwnProperty("nodeName") && lookup.nodeName !== 'TR') {
        try {
            while (lookup.nodeName !== 'TR') {
                lookup = lookup.parentNode;
            }
        } catch (e) {
            alert("find up tr exception");
            console.log(e) ;
        }

		return lookup
//		return lookup.dataset.href;
	}
	/**
	 * 解析获得url的 各个组成部分
	 */
	function parserUrl(href) {
		return url.parserUrl(href);
		var parser = document.createElement('a');
		parser.href = href;
		return parser;
	}

	//function isUrl(url){
   	//	var strRegex = "^([A-Za-z]+://)?(www\\.)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$"
    //    var re=new RegExp(strRegex);
    //    return re.test(url);
	//}
	function getHostname(url) {
        var node = util.parserUrl(url);
        return node.hostname;
        /*
		if (!(url.substr(0, 7) === "http://")) {
			url = "http://" + url;
		}
		var node = document.createElement("a");
		node.href = url;
		return node.hostname;
        */
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
			forbidden.controller.removeItem(parNode.dataset.id, parNode.dataset.href);
		}
	});
	$$('#add-black').addEventListener('keypress', function (e) {
		var target = e.target;
		if (e.keyCode == ENTER_KEY) {
			if (util.isUrl(target.value) == false) {
				return true;
			}
			var hostname = getHostname(target.value);
			forbidden.controller.addItem(e, hostname);
			target.value = '';
		}
	});
    $$('#test').addEventListener('click', function (e) {
        visited.visitController.showAll();
	});
    //swal({   title: "Error!",   text: "Here's my error message!",   type: "error",   confirmButtonText: "Cool" });
    //console.log("asdfa");
})();
