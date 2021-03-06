/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _test = __webpack_require__(1);

var _test2 = _interopRequireDefault(_test);

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = new _index2.default();

(0, _test2.default)(function (test, load) {
  test("Set (Basic)").this(function () {
    store.set({
      value: "this"
    });
    return store.value.value;
  }).isEqual(function () {
    return "this";
  });

  test("Set (false)").this(function () {
    store.set({
      isFalse: false
    });
    return store.value.isFalse;
  }).isEqual(function () {
    return false;
  });

  test("Set (OnSet)").this(function () {
    var isSet = [false, false, false];

    store.on("a", function () {
      isSet[0] = !isSet[0];
    });

    store.on("a.b", function () {
      isSet[1] = !isSet[1];
    });

    store.on("a.b.c", function () {
      isSet[2] = !isSet[2];
    });

    store.set({
      a: {
        b: {
          c: "d"
        },
        e: {
          f: "g"
        }
      }
    });

    return isSet[0] && isSet[1] && isSet[2];
  }).isEqual(function () {
    return true;
  });

  test("Get (path string)").this(function () {
    store.set({
      a: {
        b: {
          c: "d"
        }
      }
    });

    return store.get("a.b.c");
  }).isEqual(function () {
    return "d";
  });

  test("Get (path array)").this(function () {
    store.set({
      a: {
        b: {
          c: "d"
        }
      }
    });

    return store.get(["a", "b", "c"]);
  }).isEqual(function () {
    return "d";
  });

  test("Get (undefined)").this(function () {
    store.set({
      a: "d"
    });

    return store.get(["a", "b", "c"]);
  }).isEqual(function () {
    return undefined;
  });

  test("Set (merge values)").this(function () {
    store.set({
      a: {
        b: true
      }
    });

    store.set({
      a: {
        c: true
      }
    });

    return store.value.a.b && store.value.a.c;
  }).isEqual(function () {
    return true;
  });

  test("Set (nulls)").this(function () {
    store.set({
      b: null,
      a: null,
      c: {
        value: null
      }
    });

    store.set({
      a: {
        c: true
      }
    });

    store.set({
      c: {
        value: "cat"
      }
    });

    return store.value.a.c && store.value.b == null && store.value.c.value === "cat";
  }).isEqual(function () {
    return true;
  });

  test("New version").this(function () {
    var s = new _index2.default({ version: store.version + 1 });
    return typeof s.a === "undefined";
  }).isEqual(function () {
    return true;
  });

  test("onChange").this(function () {
    var state = {};

    store.onChange(function (path, value) {
      state.path = path;
      state.value = value;
    });

    store.set({
      path: {
        to: {
          virtue: "is here"
        },
        above: {
          is: "now"
        }
      }
    });

    return state.path === "path" && state.value.to.virtue === "is here" && state.value.above.is === "now";
  }).isEqual(function () {
    return true;
  });

  test("Setting empty objects").this(function () {
    var store = new _index2.default();

    store.set({
      service: {
        modal: {},
        slideIn: {}
      }
    });

    return !!store.value.service.modal && !!store.value.service.slideIn;
  }).isEqual(function () {
    return true;
  });

  test("Immutable?").this(function () {
    var store = new _index2.default();
    var t = [];

    store.set({
      service: {
        modal: "test"
      }
    });

    t.push(store.value.service);

    store.set({
      service: {
        modal: "test2"
      }
    });

    t.push(store.value.service);

    return t[0].modal === "test" && t[1].modal === "test2";
  }).isEqual(function () {
    return true;
  });

  test("Immutable 2").this(function () {
    var store = new _index2.default();
    var t = [];

    store.set({
      service: {
        modal: "test"
      }
    });

    t.push(store.value);

    store.set({
      service: {
        modal: "test2"
      }
    });

    t.push(store.value);
    return t[0].service.modal === "test" && t[1].service.modal === "test2";
  }).isEqual(function () {
    return true;
  });

  test("Copy helper").this(function () {
    var store = new _index2.default();
    var t = [{ value: 1 }, { value: 2 }];
    var f = store.copy(t);
    f[0].value = 3;
    return t[0].value === 1 && f[0].value === 3;
  }).isEqual(function () {
    return true;
  });

  test("Persistance").this(function () {
    var store = new _index2.default();
    setTimeout(function () {
      store.set({
        persistance: {
          is: ["key"]
        }
      });
    });
    return store.get("persistance.is")[0];
  }).isEqual(function () {
    return "key";
  });

  load();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _elLite = __webpack_require__(2);

var _elLite2 = _interopRequireDefault(_elLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(result) {
  var a = (0, _elLite2.default)({ class: "test" }, [(0, _elLite2.default)({ ref: "title", class: "test_title" }, [result.title]), (0, _elLite2.default)({ ref: "result", class: "test_result" }, [(0, _elLite2.default)({ class: "test_result_indicator" })])]);

  var d = (0, _elLite2.default)({ class: "test_expectation" }, [(0, _elLite2.default)({ class: "test_expectation_title" }, ["Expected"]), (0, _elLite2.default)({ class: "test_expectation_expected" }, [result.value[1]]), (0, _elLite2.default)({ class: "test_expectation_title" }, ["Received"]), (0, _elLite2.default)({ class: "test_expectation_received" }, [result.value[0]])]);

  if (result.isValid) {
    a.addClass("test--is-valid");
  } else {
    a.addClass("test--is-invalid");
    a.append(d);
  }

  (0, _elLite2.default)("body").append(a);
}

function Test(title) {
  var _this = this;

  this.value = [];
  this.isValid = false;
  this.title = title;

  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  }).then(function () {
    return _this.from();
  }).then(function (res) {
    res = typeof res === "undefined" ? "undefined" : res.toString();
    _this.value[0] = res;
  }).then(function () {
    return _this.to();
  }).then(function (res) {
    res = typeof res === "undefined" ? "undefined" : res.toString();
    _this.value[1] = res;
  }).then(function () {
    _this.isValid = _this.value[0] === _this.value[1];
  }).catch(function (err) {
    console.log(err);
    _this.value[1] = _this.value[0] || "Error";
    _this.value[0] = (0, _elLite2.default)({
      class: "error_message"
    }, err.stack.split("\n").map(function (value) {
      return (0, _elLite2.default)({ class: "error_message_line" }, [value]);
    }));
    _this.reject(err);
  });
}

Test.prototype.this = function (callback) {
  this.from = callback;
  return this;
};

Test.prototype.isEqual = function (callback) {
  this.to = callback;
  this.resolve();
  return this;
};

module.exports = function (callback) {
  var P = [];
  var T = [];

  function test(title) {
    var o = new Test(title);
    P.push(o.promise);
    T.push(o);
    return o;
  }

  function load() {
    Promise.all(P).then(function () {
      console.log("All " + P.length + " tests are loaded");
      for (var i = 0, n = T.length; i < n; i++) {
        log(T[i]);
      }
    });
  }

  callback(test, load);
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports=function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e,r){"use strict";var o={},n=n||void 0,i=n?n.getComputedStyle(document.body):{};o.transform=i.webkitTransform?"webkitTransform":i.MozTransform?"MozTransform":i.msTransform?"msTransform":"transform",o.userSelect=i.webkitUserSelect?"webkitUserSelect":i.MozUserSelect?"MozUserSelect":i.msUserSelect?"msUserSelect":"userSelect";t.exports={MOUNTED:[],STYLE_NAME:o,IS_OFFSET:["width","height","top","left"],XLINK_NS:"http://www.w3.org/1999/xlink",SVG_NS:"http://www.w3.org/2000/svg",IS_VALUE_DEG:["rotate","rotateX","rotateY","rotateZ"],IS_VALUE_PX:["left","right","top","bottom","margin","marginLeft","marginRight","marginTop","marginBottom","height","width","minHeight","minWidth","maxHeight","maxWidth","padding","paddingLeft","paddingRight","paddingTop","paddingBottom","translate","translateX","translateY","translateZ"],IS_TRANSFORM:["rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","translateX","translateY","translateZ"]}},function(t,e,r){"use strict";function o(){var t=this,e=[arguments[0],arguments[1],arguments[2]],r=s(e[0]),n=[];this.tagName=r?arguments[0].tagName.toLowerCase():"div",this.bus=new d({target:this}),this.refs={},this.props={};for(var u=0,p=e.length;u<p;u++)"string"==typeof e[u]?this.tagName=e[u]:i(e[u])?this.props=e[u]:Array.isArray(e[u])&&(n=e[u]);this.isSvg=-1!==["use","svg"].indexOf(this.tagName),r?this.node=e[0]:this.isSvg?this.node=document.createElementNS(y,this.tagName):"fragment"===this.tagName?this.node=new DocumentFragment:this.node=document.createElement(this.tagName);for(var a in o.__defaultProps)this.props[a]||(this.props[a]=o.__defaultProps[a]);for(this.append(n),this.attr(this.props),u=0,p=o.__onCreate.length;u<p;u++)o.__onCreate[u].call(this);r&&setTimeout(function(){f(t.node)},0)}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(2),s=r(3),u=r(4),f=r(8),p=r(9),a=r(10),h=r(5),c=r(11),d=r(6),l=r(0),g=l.XLINK_NS,y=l.SVG_NS,v=l.IS_TRANSFORM,b=l.STYLE_NAME;o.id={},o.__onAttr={},o.__defaultProps={},o.__onCreate=[],o.prototype.setStyle=function(t){var e,r={transform:[],default:[]},o=[],i={};for(var s in t)if(v.indexOf(s)>-1)if("object"===n(t[s]))for(var u in t[s])r.transform.push(a(u,t[s][u]));else r.transform.push(a(s,t[s]));else o.push({name:s,value:h(s,t[s])});r.transform.length&&o.push({name:"transform",value:r.transform.join(" ")});for(var f=0,p=o.length;f<p;f++)e=b[o[f].name]||o[f].name,this.node.style[e]=o[f].value,i[e]=o[f].value;this.trigger("style",{list:o,value:i})},o.prototype.style=function(t){return"object"===(void 0===t?"undefined":n(t))?(this.setStyle(t),this):"string"==typeof t?c(window.getComputedStyle(this.node)[b[t]||t]):window.getComputedStyle(this.node)},o.prototype.value=function(t){return void 0===t?this.node.value:(this.node.value=t,this)},o.prototype.offset=function(){var t=this.node.getBoundingClientRect();return{top:t.top,left:t.left,width:t.width,height:t.height}},o.prototype.classList=function(){var t=this.node.getAttribute("class");return t?t.split(" "):[]},o.prototype.removeClass=function(t){var e=this.classList(),r=e.indexOf(t);return r>-1&&e.splice(r,1),this.node.setAttribute("class",e.join(" ")),this},o.prototype.addClass=function(t){var e=this.classList();return-1===e.indexOf(t)&&e.push(t),this.node.setAttribute("class",e.join(" ")),this},o.prototype.parent=function(){return this.node.parentNode&&new o(this.node.parentNode)},o.prototype.getRoot=function(){return this.node},o.prototype.getEl=function(){return this},o.prototype.focus=function(){return this.node.focus(),this},o.prototype.append=function(t){var e;if(t)for(var r=0,o=(t=[].concat(t)).length;r<o;r++)e=t[r].getRoot?t[r].getRoot():new Text(t[r]),this.getRoot().appendChild(e),f(e),u.call(this,t[r]);return this},o.prototype.after=function(t){var e=t.getRoot(),r=e.parentNode,o=-1,n=-1,i=void 0,s=void 0;if(r){for(i=r.childNodes,s=r.childNodes.length;++n<s;)i[n]===e&&(o=n+1);i[o]?r.insertBefore(this.node,i[o]):r.appendChild(this.node)}return this},o.prototype.before=function(t){var e=t.getRoot(),r=e.parentNode;return r&&r.insertBefore(this.node,e),this},o.prototype.prepend=function(t){var e=this.node.childNodes[0],r=[].concat(t),o=0,n=0;if(e)for(o=0,n=r.length;o<n;o++)e.parentNode.insertBefore(r[o].getRoot(),e),u.call(this,r[o]);else for(o=0,n=r.length;o<n;o++)this.node.appendChild(r[o].getRoot()),u.call(this,r[o])},o.prototype.attr=function(t){var e;if("string"==typeof t)return this.node.getAttribute(t);t.id&&(o.id[t.id]=this);for(var r in t)e=r.toLowerCase(),"ref"===r?this.ref=t[r]:o.__onAttr[e]?o.__onAttr[e].call(this,t[r]):"style"===r?this.setStyle(t[r]):"once"===r.substring(0,4)?this.once(r.substring(4),t[r]):"on"===r.substring(0,2)?this.on(r.substring(2),t[r]):"class"===r?"string"==typeof t[r]&&this.node.setAttribute("class",t[r].split(" ").filter(function(t){return t.length}).map(function(t){return t.trim()}).join(" ")):t[r]&&"object"!==n(t[r])&&"function"!=typeof t[r]&&(this.isSvg?this.node.setAttributeNS("href"===r?g:y,r,t[r]):this.node.setAttribute(r,t[r].toString()));return this},o.prototype.closest=function(t){return new o(this.node.closest(t))},o.prototype.find=function(t){var e=this.node.querySelector(t);return e&&new o(e)},o.prototype.findAll=function(t){for(var e=[],r=this.node.querySelectorAll(t),n=0,i=r.length;n<i;n++)e.push(new o(r[n]));return e},o.prototype.children=function(t){for(var e=[],r=this.node.childNodes,n=0,i=r.length;n<i;n++)if(s(r[n])&&(e.push(new o(r[n])),e[t]))return e[t];return e},o.prototype.html=function(t){return void 0===t?this.node.innerHTML:(Array.prototype.forEach.call(this.node.childNodes,p),this.node.innerHTML=t,this)},o.prototype.remove=function(){return this.node.parentNode&&(p(this.node),this.node.parentNode.removeChild(this.node)),this},o.prototype.replaceWith=function(t){var e=t.getRoot();return this.node.parentNode.replaceChild(e,this.node),p(this.node),f(e),this},o.prototype.on=function(t,e){var r=this,o=t.toLowerCase();return"function"==typeof e&&(this.bus.on(o,e),"load"===o?this.node.onload=function(t){r.trigger(o,t)}:1===this.bus.subscribers[o].length&&this.node.addEventListener(o,function(t){r.trigger(o,t)},!1)),this},o.prototype.once=function(t,e){return this.on(t,function r(){e.call(this),this.off(t,r)}),this},o.prototype.off=function(t,e){var r=t.toLowerCase();if(e)this.node.removeEventListener(r,e,!1);else for(var o=this.bus.subscribers.length-1;o>=0;o--)this.node.removeEventListener(r,this.bus.subscribers[o],!1);return this.bus.off(r,e),this},o.prototype.trigger=function(t,e){return this.bus.trigger(t,e),this},o.prototype.contains=function(t){return this.node.contains(s(t)?t:t.getRoot())},t.exports=o},function(t,e,r){"use strict";t.exports=function(t){return"[object Object]"===Object.prototype.toString.call(t)}},function(t,e,r){"use strict";t.exports=function(t){var e=(t?Object.prototype.toString.call(t):"").substring(8);return 0===e.indexOf("HTML")||0===e.indexOf("SVG")}},function(t,e,r){"use strict";t.exports=function(t){var e=t.ref;e&&!this.refs[e]&&(this.refs[e]=t);for(var r in t.refs)this.refs[r]||(this.refs[r]=t.refs[r])}},function(t,e,r){"use strict";var o=r(0),n=o.IS_VALUE_PX,i=o.IS_VALUE_DEG;t.exports=function(t,e){return n.indexOf(t)>-1?"number"==typeof e?e+"px":e:i.indexOf(t)>-1?"number"==typeof e?e+"deg":e:e&&e.toString()}},function(t,e,r){"use strict";function o(t){this.target=t.target||this,this.subscribers={}}o.prototype.once=function(t,e){var r=this,o=void 0;if(void 0===e)throw new Error("Once cannot be used without a valid callback");return o=function(n){r.off(t,o),e.call(r.target,n)},this.on(t,o)},o.prototype.off=function(t,e){var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).indexOf(e);return o>-1?this.subscribers[r].splice(o,1):void 0===e&&(this.subscribers[r]=[]),this.target},o.prototype.on=function(t,e){var r=t.toLowerCase().trim();return"function"==typeof e&&(this.subscribers[r]=(this.subscribers[r]||[]).concat(e)),this.target},o.prototype.trigger=function(t,e){for(var r=t.toLowerCase().trim(),o=(this.subscribers[r]||[]).slice(),n=0,i=o.length;n<i;n++)o[n].call(this.target,e);return this.target},t.exports=o},function(t,e,r){"use strict";function o(t,e,r){return i.lib[t]?new i.lib[t](e,r):t instanceof Text||t instanceof Comment?t:"body"===t?f:new n(t,e,r)}var n=r(1),i=r(12),s=r(13),u=r(3),f=o(document.body);o.and=function(t){return new s(t)},o.onAttr=function(t,e){n.__onAttr[t.toLowerCase()]=e},o.defaultProps=function(t){Object.assign(n.__defaultProps,t)},o.onCreate=function(t){n.__onCreate.push(t)},o.fn=function(t,e){n.prototype[t]=e,i.prototype[t]=i.__extend(t),s.prototype[t]=s.__extend(t);for(var r in i.lib)i.lib[r].prototype[t]||(i.lib[r].prototype[t]=i.prototype[t])},o.getElementById=function(t){var e=void 0,r=void 0;return o.id[t]?o.id[t]:(e=document.getElementById(t),r=e&&o(e),e&&(o.id[t]=r),r)},o.getComponentById=function(t){return i.id[t]},o.mapChildren=function(t){for(var e=[],r=t.childNodes,n=-1,i=r.length;++n<i;)u(r[n])&&e.push(o(r[n]));return e},o.id=n.id,o.create=i.create,t.exports=o},function(t,e,r){"use strict";var o=r(0).MOUNTED;t.exports=function t(e){var r=e.childNodes;if(document.body.contains(e)&&-1===o.indexOf(e)){o.push(e),e.dispatchEvent(new Event("mount",{bubbles:!1}));for(var n=0,i=r.length;n<i;n++)t(r[n])}}},function(t,e,r){"use strict";var o=r(0).MOUNTED;t.exports=function t(e){var r=e.childNodes,n=o.indexOf(e);if(-1!==n){o.splice(n,1),e.dispatchEvent(new Event("unmount",{bubbles:!1}));for(var i=0,s=r.length;i<s;i++)t(r[i])}}},function(t,e,r){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n=r(5);t.exports=function(t,e){var r=[];return"object"===(void 0===e?"undefined":o(e))?(e.x&&r.push(n(t,e.x)),e.y&&r.push(n(t,e.y)),e.z&&r.push(n(t,e.z))):r.push(n(t,e)),t+"("+r.join(", ")+")"}},function(t,e,r){"use strict";t.exports=function(t){return"px"===t.slice(-2)?Number(t.slice(0,-2)):t}},function(t,e,r){"use strict";function o(){}var n=r(2),i=r(4),s=r(6),u=r(1);o.__extend=function(t){return function(e,r,o){var n=this.node?this.node[t](e,r,o):u.prototype[t].call(null,e,r,o);return n===this.node?this:n}},o.lib={},o.id={};for(var f in u.prototype)o.prototype[f]=o.__extend(f);o.prototype.append=function(t){this.node.append(t);for(var e in this.node.refs)this.refs[e]||(this.refs[e]=this.node.refs[e]);return this},o.prototype.attr=function(t){return t&&t.id&&(o.id[t.id]=this),o.__extend("attr").call(this,t)},o.prototype.on=function(t,e){return this.bus.on(t,e)},o.prototype.once=function(t,e){return this.bus.once(t,e)},o.prototype.off=function(t,e){return this.bus.off(t,e)},o.prototype.trigger=function(t,e){return this.bus.trigger(t,e)},o.prototype.getEl=function(){return this.node.getEl()},o.create=function(t,e){function r(r,i){var f=Array.isArray(r)?r:i||[];this.props=n(r)?r:{},this.bus=new s({target:this}),this.refs={},this.ref=this.props.ref,this.tagName=t;for(var p in u.__defaultProps)this.props[p]||(this.props[p]=u.__defaultProps[p]);if(e.constructor&&e.constructor.call(this,this.props),e.render){if(this.node=e.render.call(this,this.props),void 0===this.node)throw new Error('Component "'+t+'" does not return a valid element.');this.ref=this.props.ref||this.node.ref;for(var a in this.refs){for(var h in this.refs[a].refs)this.refs[h]||(this.refs[h]=this.refs[a].refs[h]);this.refs[a].ref&&!this.refs[this.refs[a].ref]&&(this.refs[this.refs[a].ref]=this.refs[a].ref)}for(var c in this.node.refs)this.refs[c]||(this.refs[c]=this.node.refs[c]);this.append(f)}this.props.id&&(o.id[this.props.id]=this)}for(var f in o.prototype)r.prototype[f]=o.prototype[f];e.append&&(r.prototype.append=function(t){if(t){t=[].concat(t),e.append.call(this,t);for(var r=0,o=t.length;r<o;r++)i.call(this,t[r])}});for(f in e)"render"!==f&&"append"!==f&&(r.prototype[f]=e[f]);return o.lib[t]=r,r},t.exports=o},function(t,e,r){"use strict";function o(t){this.group=[].concat(t)}var n=r(1);o.prototype.and=function(t){return this.group=this.group.concat(t),this},o.__extend=function(t){return function(e,r,o){for(var n=0,i=this.group.length;n<i;n++)this.group[n][t](e,r,o);return this}};for(var i in n.prototype)o.prototype[i]=o.__extend(i);t.exports=o}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bus = __webpack_require__(4);

var _Bus2 = _interopRequireDefault(_Bus);

var _set = __webpack_require__(5);

var _set2 = _interopRequireDefault(_set);

var _get = __webpack_require__(6);

var _get2 = _interopRequireDefault(_get);

var _copy = __webpack_require__(7);

var _copy2 = _interopRequireDefault(_copy);

var _assign = __webpack_require__(8);

var _assign2 = _interopRequireDefault(_assign);

var _getPathList = __webpack_require__(9);

var _getPathList2 = _interopRequireDefault(_getPathList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Store(props) {
  var cache = {};
  var stringifiedValue = void 0;
  var value = void 0;

  this.bus = new _Bus2.default({ target: this });
  this.isDeferred = false;
  this.onsave = [];
  this.onchange = [];
  this.value = {};

  props = props || {};

  // Loads the localStorage object keys as properties of 'this'
  for (var path in window.localStorage) {
    stringifiedValue = window.localStorage.getItem(path);
    if (stringifiedValue !== "undefined" && stringifiedValue !== "null") {
      try {
        value = JSON.parse(stringifiedValue);
        (0, _set2.default)(cache, path, value);
      } catch (e) {
        value = stringifiedValue;
        (0, _set2.default)(cache, path, value);
      }
    }
  }

  props.version = props.version || 0;
  cache.version = cache.version || 0;

  // Ensure the cache has a previous version before comparing it
  if (cache.version && props.version > cache.version) {
    for (var k in cache) {
      delete cache[k];
    }
  }

  for (k in props) {
    this.value[k] = props[k];
  }

  for (k in cache) {
    this.value[k] = cache[k];
  }

  return this.save();
}

Store.prototype.on = function (path, callback) {
  this.bus.on(path, callback);
  return this;
};

Store.prototype.once = function (path, callback) {
  this.bus.once(path, callback);
  return this;
};

Store.prototype.off = function (path, callback) {
  this.bus.off(path, callback);
  return this;
};

Store.prototype.onChange = function (callback) {
  if (typeof callback === "function") {
    this.onchange.push(callback);
  }
  return this;
};

Store.prototype.offChange = function (callback) {
  if (typeof callback === "function") {
    this.onchange.splice(this.onchange.indexOf(callback), 1);
  }
  return this;
};

Store.prototype.triggerPaths = function (paths) {
  var done = {};
  var temp = void 0;
  for (var i = 0, n = paths.length; i < n; i++) {
    for (var x = paths[i].length; x > 0; x--) {
      temp = paths[i].slice(0, x);
      if (!done[temp]) {
        done[temp] = true;
        this.bus.trigger(temp.join("."), (0, _get2.default)(this.value, temp));
      }
    }
  }
  return this;
};

Store.prototype.triggerOnChange = function (paths) {
  var filter = [];
  var onchange = this.onchange.slice();

  for (var i = 0, n = paths.length; i < n; i++) {
    if (filter.indexOf(paths[i][0]) === -1) {
      filter.push(paths[i][0]);
    }
  }

  for (i = 0, n = filter.length; i < n; i++) {
    for (var a = 0, b = onchange.length; a < b; a++) {
      onchange[a](filter[i], this.value[filter[i]]);
    }
  }
};

Store.prototype.set = function (object, callback) {
  var paths = (0, _getPathList2.default)(object);
  var instance = (0, _assign2.default)({}, this.value);
  var copyPaths = [];

  var i = -1;
  var n = paths.length;
  var path = void 0;

  function shouldCopy(path) {
    var i = 0;
    var n = path.length + 1;
    var p = void 0;

    while (++i < n) {
      p = path.slice(0, i).join(".");
      if (copyPaths.indexOf(p) !== -1) {
        return false;
      }
    }

    copyPaths.push(p);
    return true;
  }

  while (++i < n) {
    path = paths[i].slice(0, Math.max(1, paths[i].length - 1));
    if (shouldCopy(path)) {
      (0, _set2.default)(instance, path, (0, _copy2.default)((0, _get2.default)(instance, path)));
    }
    path = paths[i];
    (0, _set2.default)(instance, path, (0, _get2.default)(object, path));
  }

  this.value = instance;
  this.triggerPaths(paths);
  this.triggerOnChange(paths);

  return this.save(callback);
};

Store.prototype.get = function (path) {
  return (0, _get2.default)(this.value, [].concat(path).join("."));
};

Store.prototype.save = function (callback) {
  var self = this;

  function save() {
    var paths = (0, _getPathList2.default)(self.value);
    var i = -1;
    var n = paths.length;

    self.isDeferred = true;

    while (++i < n) {
      window.localStorage.setItem(paths[i].join("."), JSON.stringify((0, _get2.default)(self.value, paths[i])));
    }

    while (self.onsave.length) {
      self.onsave[0]();
      self.onsave.shift();
    }
  }

  if (callback) {
    this.onsave.push(callback);
  }

  if (!this.isDeferred) {
    save();
  } else {
    clearTimeout(this.isDeferred);
    this.isDeferred = setTimeout(save, 100);
  }
};

Store.prototype.getPathList = function (obj) {
  return (0, _getPathList2.default)(obj);
};

Store.prototype.copy = function (obj) {
  return (0, _copy2.default)(obj);
};

exports.default = Store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Bus(props) {
  this.target = props.target || this;
  this.subscribers = {};
}

Bus.prototype.once = function (name, callback) {
  var _this = this;

  var once = function once(a) {
    _this.off(name, once);
    callback.call(_this.target, a);
  };
  return this.on(name, once);
};

Bus.prototype.off = function (name, callback) {
  var nameLower = name.toLowerCase().trim();
  var index = (this.subscribers[nameLower] || []).indexOf(callback);
  if (index > -1) {
    this.subscribers[nameLower].splice(index, 1);
  } else if (typeof callback === "undefined") {
    this.subscribers[nameLower] = [];
  }
  return this.target;
};

Bus.prototype.on = function (name, callback) {
  var nameLower = name.toLowerCase().trim();
  if (typeof callback === "function") {
    this.subscribers[nameLower] = (this.subscribers[nameLower] || []).concat(callback);
  }
  return this.target;
};

Bus.prototype.trigger = function (name, value) {
  var nameLower = name.toLowerCase().trim();
  var list = (this.subscribers[nameLower] || []).slice();
  for (var i = 0, n = list.length; i < n; i++) {
    list[i].call(this.target, value);
  }
  return this.target;
};

module.exports = Bus;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = set;
function set(obj, path, value) {
  var t = obj;

  var p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");

  var i = -1;
  var n = p.length - 1;

  while (++i < n) {
    if (_typeof(t[p[i]]) !== "object" || t[p[i]] == null) {
      t[p[i]] = {};
    } else {
      t[p[i]] = t[p[i]];
    }
    t = t[p[i]];
  }

  t[p[n]] = value;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(target, path) {
  var t = target;

  var p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");

  var i = -1;
  var n = p.length;

  while (++i < n) {
    if (!t[p[i]]) {
      return t[p[i]];
    }
    t = t[p[i]];
  }

  return t;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = copy;
function copy(x) {
  var i = -1;
  var n;
  var t;

  if (x) {
    if (Array.isArray(x)) {
      t = [];
      n = x.length;
      while (++i < n) {
        t[i] = copy(x[i]);
      }
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === "object") {
      t = {};
      for (var k in x) {
        t[k] = copy(x[k]);
      }
    }
  }

  return t || x;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assign;
function assign(a, b) {
  var key = void 0;

  for (key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getPathList;
function getKeyValues(paths, path, value) {
  var keys = [];
  var i = -1;
  var n = 0;

  if (!value || Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" && typeof value !== "function") {
    paths.push(path);
  } else {
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        keys.push(k);
      }
    }

    i = -1;
    n = keys.length;

    while (++i < n) {
      getKeyValues(paths, path.concat(keys[i]), value[keys[i]]);
    }

    if (!n) {
      getKeyValues(paths, path, undefined);
    }
  }
}

function getPathList(object) {
  var paths = [];
  getKeyValues(paths, [], object);
  return paths.sort(function (a, b) {
    a.length - b.length;
  });
}

/***/ })
/******/ ]);