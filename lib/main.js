var DOMinode = require('./dominodes_methods');

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
  var nodes = Array.prototype.slice.call(document.querySelctorAll(selector), 0);
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
