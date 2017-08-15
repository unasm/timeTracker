/*global Router, $$, $ */
(function (window) {
    'use strict';

    /**
     * Takes a model and view and acts as the controller between them
     *
     * @constructor
     * @param {object} model The model constructor
     * @param {object} view The view constructor
     */
    function Controller(model, view) {
        this.model = model;
        this.view = view;

        this.$listArea = $$("#visited");
        this.$blacked = $$("#blacked");
        //this.router = new Router();
        //this.router.init();

        //this.$todoList.addEventListener('click', this._doShowUrl);

//        window.addEventListener('load', function () {
//            console.log("window loaded") ;
//            //this._updateFilterState();
//        }.bind(this));
//
//        // Couldn't figure out how to get flatiron to run some code on all pages. I
//        // tried '*', but then it overwrites ALL handlers for all the other pages
//        // and only runs this.
//        window.addEventListener('hashchange', function () {
//            console.log("window hashchange") ;
//        }.bind(this));
//
        // Make sure on page load we start with a hash to trigger the flatiron and
        // onhashchange routes

    }

    /**
     * An event to fire on load. Will get all items and display them in the
     * todo-list
     */
    Controller.prototype.showAll = function () {
        this.model.read(function (data) {
            console.log("data length : ", data.length);
            this.$blacked.innerHTML = this.view.showList(data);
            //this._parseForImageURLs();
        }.bind(this));
    };

    /**
     * 添加一个黑名单
     * object and it'll handle the DOM insertion and saving of the new item.
     *
     * @param {object} e The event object
     * @param {trNode} tr 一行的节点, 所有的想要的信息，必然都在tr里面
     * @param {string} href 对于添加黑名单来说则只需要添加
     *
     */
    Controller.prototype.addItem = function (e, href, trNode) {
        var input = this.$listArea;
        this.model.create(href, -1, -1, function (data) {
            if (trNode !== undefined) {
                var addNode = trNode.querySelector("[class='add']");
                addNode.className = addNode.className.replace('add', '');
                addNode.className += "done";
            }

            if (data.length == 1) {
                var node = this.view.showOne(data[0]);
                this.$blacked.innerHTML += node;
            }
        }.bind(this));
    };

    /**
     * By giving it an ID it'll find the DOM element matching that ID,
     * remove it from the DOM and also remove it from storage.
     *
     * @param {number} id The ID of the item to remove from the DOM and
     * storage
     */
    Controller.prototype.removeItem = function (id, hostname) {
        console.log(id, hostname);
        this.model.read({id: parseInt(id)}, function (row) {
            console.log(row);
            console.log(hostname);
            if (row.length > 0) {
                row[0].isDel = 1;
                row[0].rmTimes += 1;
                this.model.update(row[0].id, row[0], function(data) {
                    console.log(data);
                    this.$blacked.removeChild($$('[data-id="' + row[0].id + '"]'));
                }.bind(this));  
            }
           
            /*
                var ids = [].concat(id);
                ids.forEach( function(id) {
                }.bind(this));
            */
            //this._filter();
        }.bind(this));
    };

    //
    //  /**
    //   * Hides the label text and creates an input to edit the title of the item.
    //   * When you hit enter or blur out of the input it saves it and updates the UI
    //   * with the new name.
    //   *
    //   * @param {number} id The id of the item to edit
    //   * @param {object} label The label you want to edit the text of
    //   */
    //  Controller.prototype.editItem = function (id, label) {
    //    var li =  label;
    //
    //    // This finds the <label>'s parent <li>
    //    while (li.nodeName !== 'LI') {
    //      li = li.parentNode;
    //    }
    //
    //    var onSaveHandler = function () {
    //      var value = input.value.trim();
    //      var discarding = input.dataset.discard;
    //
    //      if (value.length && !discarding) {
    //        this.model.update(id, { title: input.value });
    //
    //        // Instead of re-rendering the whole view just update
    //        // this piece of it
    //        label.innerHTML = this._parseForURLs(value);
    //        this._parseForImageURLs();
    //
    //      } else if (value.length === 0) {
    //        // No value was entered in the input. We'll remove the todo item.
    //        this.removeItem(id);
    //      }
    //
    //      // Remove the input since we no longer need it
    //      // Less DOM means faster rendering
    //      li.removeChild(input);
    //
    //      // Remove the editing class
    //      li.className = li.className.replace('editing', '');
    //    }.bind(this);
    //
    //    // Append the editing class
    //    li.className = li.className + ' editing';
    //
    //    var input = document.createElement('input');
    //    input.className = 'edit';
    //
    //    // Get the innerText of the label instead of requesting the data from the
    //    // ORM. If this were a real DB this would save a lot of time and would avoid
    //    // a spinner gif.
    //    input.value = label.innerText;
    //
    //    li.appendChild(input);
    //
    //    input.addEventListener('blur', onSaveHandler);
    //
    //    input.addEventListener('keypress', function (e) {
    //      if (e.keyCode === this.ENTER_KEY) {
    //        // Remove the cursor from the input when you hit enter just like if it
    //        // were a real form
    //        input.blur();
    //      }
    //
    //      if (e.keyCode === this.ESCAPE_KEY) {
    //        // Discard the changes
    //        input.dataset.discard = true;
    //        input.blur();
    //      }
    //    }.bind(this));
    //
    //    input.focus();
    //  };



    //  /**
    //   * Will remove all completed items from the DOM and storage.
    //   */
    //  Controller.prototype.removeCompletedItems = function () {
    //    this.model.read({ completed: 1 }, function (data) {
    //      var ids = [];
    //      data.forEach(function (item) {
    //        ids.push(item.id);
    //      }.bind(this));
    //      this.removeItem(ids);
    //    }.bind(this));
    //
    //    this._filter();
    //  };
    //
    //  /**
    //   * Give it an ID of a model and a checkbox and it will update the item
    //   * in storage based on the checkbox's state.
    //   *
    //   * @param {number} id The ID of the element to complete or uncomplete
    //   * @param {object} checkbox The checkbox to check the state of complete
    //   *                          or not
    //   * @param {boolean|undefined} silent Prevent re-filtering the todo items
    //   */
    //  Controller.prototype.toggleComplete = function (ids, checkbox, silent) {
    //    var completed = checkbox.checked ? 1 : 0;
    //
    //    this.model.update(ids, { completed: completed }, function () {
    //      if ( ids.constructor != Array ) {
    //        ids = [ ids ];
    //      }
    //
    //      ids.forEach( function(id) {
    //        var listItem = $$('[data-id="' + id + '"]');
    //
    //        if (!listItem) {
    //          return;
    //        }
    //
    //        listItem.className = completed ? 'completed' : '';
    //
    //        // In case it was toggled from an event and not by clicking the checkbox
    //        listItem.querySelector('input').checked = completed;
    //      });
    //
    //      if (!silent) {
    //        this._filter();
    //      }
    //
    //    }.bind(this));
    //  };
    //
    //  /**
    //   * Will toggle ALL checkboxe's on/off state and completeness of models.
    //   * Just pass in the event object.
    //   *
    //   * @param {object} e The event object
    //   */
    //  Controller.prototype.toggleAll = function (e) {
    //    var completed = e.target.checked ? 1 : 0;
    //    var query = 0;
    //
    //    if (completed === 0) {
    //      query = 1;
    //    }
    //
    //    this.model.read({ completed: query }, function (data) {
    //      var ids = [];
    //      data.forEach(function (item) {
    //        ids.push(item.id);
    //      }.bind(this));
    //      this.toggleComplete(ids, e.target, false);
    //    }.bind(this));
    //
    //  };
    //
    //  /**
    //   * Updates the pieces of the page which change depending on the remaining
    //   * number of todos.
    //   */
    //  Controller.prototype._updateCount = function () {
    //    this.model.getCount(function(todos) {
    //      this.$todoItemCounter.innerHTML = this.view.itemCounter(todos.active);
    //
    //      this.$clearCompleted.innerHTML = this.view.clearCompletedButton(todos.completed);
    //      this.$clearCompleted.style.display = todos.completed > 0 ? 'block' : 'none';
    //
    //      this.$toggleAll.checked = todos.completed === todos.total;
    //
    //      this._toggleFrame(todos);
    //    }.bind(this));
    //
    //  };
    //
    //  /**
    //   * The main body and footer elements should not be visible when there are no
    //   * todos left.
    //   *
    //   * @param {object} todos Contains a count of all todos, and their statuses.
    //   */
    //  Controller.prototype._toggleFrame = function (todos) {
    //    var frameDisplay = this.$main.style.display;
    //    var frameVisible = frameDisplay === 'block' || frameDisplay === '';
    //
    //    if (todos.total === 0 && frameVisible) {
    //      this.$main.style.display = 'none';
    //      this.$footer.style.display = 'none';
    //    }
    //
    //    if (todos.total > 0 && !frameVisible) {
    //      this.$main.style.display = 'block';
    //      this.$footer.style.display = 'block';
    //    }
    //  };
    //
    //  /**
    //   * Re-filters the todo items, based on the active route.
    //   * @param {boolean|undefined} force  forces a re-painting of todo items.
    //   */
    //  Controller.prototype._filter = function (force) {
    //    var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);
    //
    //    // Update the elements on the page, which change with each completed todo
    //    this._updateCount();
    //
    //    // If the last active route isn't "All", or we're switching routes, we
    //    // re-create the todo item elements, calling:
    //    //   this.show[All|Active|Completed]();
    //    if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
    //      this['show' + activeRoute]();
    //    }
    //
    //    this._lastActiveRoute = activeRoute;
    //  };
    //
    //  /**
    //   * Simply updates the filter nav's selected states
    //   */
    //Controller.prototype._updateFilterState = function () {
    //  var currentPage = this._getCurrentPage() || '';

    //  // Store a reference to the active route, allowing us to re-filter todo
    //  // items as they are marked complete or incomplete.
    //  this._activeRoute = currentPage;

    //  if (currentPage === '') {
    //    this._activeRoute = 'All';
    //  }

    //  //unasm
    //  //this._filter();

    //  // Remove all other selected states. We loop through all of them in case the
    //  // UI gets in a funky state with two selected.
    //  //$('#filters .selected').each(function (item) {
    //  //  item.className = '';
    //  //});

    //  $$('#filters [href="#/' + currentPage + '"]').className = 'selected';
    //};
    //
    //   /**
    //    * A getter for getting the current page
    //    */
    //  Controller.prototype._getCurrentPage = function () {
    //    return document.location.hash.split('/')[1];
    //  };
    //
    //  Controller.prototype._parseForURLs = function (text) {
    //    var re = /(https?:\/\/[^\s"<>,]+)/g;
    //    return text.replace(re, '<a href="$1" data-src="$1">$1</a>');
    //  };
    //
    //  Controller.prototype._doShowUrl = function(e) {
    //    // only applies to elements with data-src attributes
    //    if (!e.target.hasAttribute('data-src')) {
    //      return;
    //    }
    //    e.preventDefault();
    //    var url = e.target.getAttribute('data-src');
    //    chrome.app.window.create(
    //     'webview.html',
    //     {hidden: true},   // only show window when webview is configured
    //     function(appWin) {
    //       appWin.contentWindow.addEventListener('DOMContentLoaded',
    //         function(e) {
    //           // when window is loaded, set webview source
    //           var webview = appWin.contentWindow.
    //                document.querySelector('webview');
    //           webview.src = url;
    //           // now we can show it:
    //           appWin.show();
    //         }
    //       );
    //     });
    //  };
    //
    //  Controller.prototype._parseForImageURLs = function () {
    //    // remove old blobs to avoid memory leak:
    //    this._clearObjectURL();
    //
    //    var links = this.$todoList.querySelectorAll('a[data-src]:not(.thumbnail)');
    //    var re = /\.(png|jpg|jpeg|svg|gif)$/;
    //
    //    for (var i = 0; i<links.length; i++) {
    //      var url = links[i].getAttribute('data-src');
    //      if (re.test(url)) {
    //        links[i].classList.add('thumbnail');
    //        this._requestRemoteImageAndAppend(url, links[i]);
    //      }
    //    }
    //  };
    //
    //
    //  Controller.prototype._requestRemoteImageAndAppend = function(imageUrl, element) {
    //    var xhr = new XMLHttpRequest();
    //    xhr.open('GET', imageUrl);
    //    xhr.responseType = 'blob';
    //    xhr.onload = function() {
    //      var img = document.createElement('img');
    //      img.setAttribute('data-src', imageUrl);
    //      img.className = 'icon';
    //      var objURL = this._createObjectURL(xhr.response);
    //      img.setAttribute('src', objURL);
    //      element.appendChild(img);
    //    }.bind(this);
    //    xhr.send();
    //  };
    //
    //  Controller.prototype._clearObjectURL = function() {
    //    if (this.objectURLs) {
    //      this.objectURLs.forEach(function(objURL) {
    //        URL.revokeObjectURL(objURL);
    //      });
    //      this.objectURLs = null;
    //    }
    //  };
    //
    //  Controller.prototype._createObjectURL = function(blob) {
    //    var objURL = URL.createObjectURL(blob);
    //    this.objectURLs = this.objectURLs || [];
    //    this.objectURLs.push(objURL);
    //    return objURL;
    //  };

    // Export to window
    window.app.BlackController = Controller;
})(window);
