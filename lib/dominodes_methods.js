function DOMinodes(nodes) {
  this.elements = Array.prototype.slice.call(nodes);
}

DOMNodeCollection.prototype = {
  html: function (string) {
    if (string){
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML =  string;
      }
      return this;
    }
  return this.elements[0].innerHTML;
},

  empty: function () {
  this.html("");
},

  append: function (arg) {
    var newHTML = arg;

    if (arg instanceof DOMNodeCollection) {
      newHTML = "";
      for (var j = 0; j < arg.elements.length; j++) {
        newHTML += arg.elements[j].outerHTML;
      }
    } else if (arg instanceof HTMLElement) {
      newHTML = arg.outerHTML;
    }

    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML += newHTML;
    }
  },

  attr: function (attrName, value) {
    if (value !== undefined) {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attrName, value);
      }
      return this;
    }
    return this.elements[0].getAttribute(attrName);
  },

  addClass: function (className) {
    var newAttr = className;
    if (this.attr("class")){
      newAttr = this.attr("class") + " " + className;
    }
    this.attr("class", newAttr);
    return this;
  },

  removeClass: function (className) {
    var remove = "";
    if (className){
      var classes = this.elements[0].getAttribute("class").split(" ");
      var index = classes.indexOf(className);
      if (index === -1) { return; }

      classes.splice(index, 1);
      remove = classes.join(" ");
    }

    this.attr("class", remove);
  },

  children: function () {
    var childrens = [];
    var nodes;
    for (var i = 0; i < this.elements.length; i++) {
      nodes = Array.prototype.slice.call(this.elements[i].children);
      childrens = childrens.concat(nodes);
    }

    return new DOMNodeCollection(childrens);
  },

  parent: function () {
    var parents = [];

    for (var i = 0; i < this.elements.length; i++) {
      parents = parents.concat(this.elements[i].parentElement);
    }

    return new DOMNodeCollection(parents);
  },

  find: function (selector) {
    var result = [];
    var nodes;
    for (var i = 0; i < this.elements.length; i++) {
      nodes = Array.prototype.slice.call(this.elements[i].querySelectorAll(selector));
      result = result.concat(nodes);
    }
    return new DOMNodeCollection(result);
  },

  remove: function () {
    this.empty();
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].remove();
    }
  },

  on: function (eventName, callback) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(eventName, callback);
    }
  },

  off: function (eventName, callback) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(eventName, callback);
    }
  }
};

module.exports = DOMinodes;
