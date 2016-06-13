function DOMinode(nodes) {
  this.elements = Array.prototype.slice.call(nodes);
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
