/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.$dn = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var DOMinode = __webpack_require__(2);

	var _functionQueue = [], _documentReady = false;

	function $dn (selector) {
	  var result;
	  switch(typeof (selector)){
	    case "function":
	      addToQueue(selector);
	      break;
	    case "string":
	      result = retrieveDOMNodes(selector);
	      break;
	    case "object":
	      if(selector instanceof HTMLElement){
	        result = new DOMinode([selector]);
	      }
	      break;
	  }
	  return result;
	}

	$dn.extend = function (base) {
	  var args = Array.prototype.slice.call(arguments, 1);
	  args.forEach(function (arg){
	    for(var property in arg){
	      if (arg.hasOwnProperty(property)){
	        base[property] = arg[property];
	      }
	    }
	  });
	  return base;
	};

	$dn.ajax = function (opts) {
	  var defaults = {
	    method: "GET",
	    url: window.location.pathname,
	    success: function(data){},
	    error: function(){},
	    data: {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  };

	  if (options.method.toUpperCase() ==="GET"){
	    options.url += "?" + queryStringify(options.data);
	  }

	  var defOpts = $dn.extend(defaults, opts);
	  var xhr = new XMLHttpRequest();
	  xhr.open(defOpts.method, defOpts.url);
	  xhr.onload = function() {
	    if (xhr.status === 200) {
	      options.success(xhr.response);
	    } else {
	      options.error(xhr.response);
	    }
	    xhr.send(JSON.stringify(options.data));
	  };
	};

	function queryStringify(arg) {
	  var result = "";
	  for(var property in arg){
	    if (arg.hasOwnProperty(property)){
	      result += property + "=" + arg[property] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	}

	function retrieveDOMNodes(selector){
	  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector), 0);
	  return new DOMinode(nodes);
	}

	function addToQueue(funct){
	  if(!_documentReady){
	    _functionQueue.push(funct);
	  } else {
	    funct();
	  }
	}

	document.addEventListener("DOMContentLoaded", function() {
	  _documentReady = true;
	  _functionQueue.forEach(function (funct) {
	    funct();
	  });
	});

	module.exports = $dn;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function DOMinode(nodes) {
	  this.nodes = Array.prototype.slice.call(nodes);
	}

	DOMinode.prototype = {
	  addClass: function (className){
	    this.each(function (node){
	      node.classList.add(className);
	    });
	  },

	  append: function(elements){
	    if (this.nodes.length > 0) return;
	    if (typeof elements === 'object' &&
	    !(elements instanceof DOMinode)) {
	      elements = root.$l(elements);
	    }

	    if (typeof elements === "string") {
	      this.each(function (node) {
	        node.innerHTML += elements;
	      });
	    } else if (elements instanceof DOMinode) {
	      var node = this.nodes[0];
	      elements.each(function (childNode) {
	        node.appendChild(childNode);
	      });
	    }
	  },

	  attr: function (attrName, value){
	    if (typeof value === "string") {
	      this.each(function (node) {
	        node.setAttribute(attrName, value);
	      });
	    } else
	    return this.nodes[0].getAttribute(attrName);
	  },

	  children: function (){
	    var childrens = [];
	    this.each(function (node) {
	      var nodes = node.children;
	      childrens = childrens.concat([].slice.call(nodes));
	    });

	    return new DOMinode(childrens);
	  },

	  each: function (callback){
	    this.nodes.forEach(callback);
	  },

	  empty: function (){
	    this.html("");
	  },

	  find: function (selector){
	    var result = [];
	    this.each(function(node) {
	      var nodes = Array.prototype.slice.call(node.querySelectorAll(selector));
	      result = result.concat(nodes);
	    });
	    return new DOMinode(result);
	  },

	  html: function (html){
	    if (typeof html === "string") {
	      this.each(function (node) {
	        node.innerHTML = html;
	      });
	    } else {
	      if (this.nodes.length > 0) {
	        return this.nodes[0].innerHTML;
	      }
	    }
	  },

	  off: function (eventName, callback) {
	    this.each(function (node) {
	      node.removeEventListener(eventName, callback);
	    });
	  },

	  on: function (eventName, callback) {
	    this.each(function (node){
	      node.addEventListener(eventName, callback);
	    });
	  },

	  parent: function (){
	    var parents = [];
	    this.each(function (node){
	      parents.push(node.parentNode);
	    });
	    return new DOMinode(parents);
	  },

	  remove: function () {
	    this.empty();
	    this.each(function (node){
	      node.parentNode.removeChild(node);
	    });
	  },

	  removeClass: function (className) {
	    this.each(function (node){
	      node.classList.remove(className);
	    });
	  }

	};

	module.exports = DOMinode;


/***/ }
/******/ ]);