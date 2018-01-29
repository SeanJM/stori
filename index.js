module.exports =
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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Bus = __webpack_require__(1);

var _Bus2 = _interopRequireDefault(_Bus);

var _set = __webpack_require__(2);

var _set2 = _interopRequireDefault(_set);

var _get = __webpack_require__(3);

var _get2 = _interopRequireDefault(_get);

var _getPathList = __webpack_require__(4);

var _getPathList2 = _interopRequireDefault(_getPathList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXCLUDED_PROPERTIES = {
  __bus: true,
  __deferred: true
};

function Store(props) {
  var cache = {};
  var i = 0;
  var key = void 0;
  var value = void 0;
  var parsed = void 0;

  props = props || {};

  // Loads the localStorage object keys as properties of 'this'
  for (; window.localStorage.key(i); i += 1) {
    key = window.localStorage.key(i);
    value = window.localStorage.getItem(key);
    if (value !== "undefined") {
      parsed = JSON.parse(value);
      cache[key] = parsed;
    }
  }

  props.version = props.version || 0;
  cache.version = cache.version || 0;

  if (props.version > cache.version) {
    for (var k in cache) {
      delete cache[k];
    }
  }

  for (var k in props) {
    this[k] = props[k];
  }

  for (k in cache) {
    this[k] = cache[k];
  }

  this.__bus = new _Bus2.default({ target: this });
  this.__deferred = false;
  this.save();
}

Store.prototype.on = function (path, callback) {
  this.__bus.on(path, callback);
  return this;
};

Store.prototype.once = function (path, callback) {
  this.__bus.once(path, callback);
  return this;
};

Store.prototype.off = function (path, callback) {
  this.__bus.off(path, callback);
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
        this.__bus.trigger(temp.join("."), (0, _get2.default)(this, temp));
      }
    }
  }
  return this;
};

Store.prototype.set = function (object) {
  var paths = (0, _getPathList2.default)(object);
  var value = void 0;

  for (var i = 0, n = paths.length; i < n; i++) {
    value = (0, _get2.default)(object, paths[i]);
    if (this[paths[i][0]] === "function") {
      throw new Error("[Store] Cannot set value \"" + paths[i][0] + "\", it is a reserved name.");
    }
    (0, _set2.default)(this, paths[i], value);
  }

  this.triggerPaths(paths);
  this.save();
  return this;
};

Store.prototype.get = function (path) {
  return (0, _get2.default)(this, [].concat(path).join("."));
};

Store.prototype.save = function () {
  var _this = this;

  clearTimeout(this.__deferred);
  this.__deferred = setTimeout(function () {
    for (var key in _this) {
      if (_this.hasOwnProperty(key) && !EXCLUDED_PROPERTIES[key] && typeof _this[key] !== "function") {
        // console.log(key, JSON.stringify(this[key]));
        window.localStorage.setItem(key, JSON.stringify(_this[key]));
      }
    }
  }, 50);
};

exports.default = Store;

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = set;
function set(target, path, value) {
  var t = target;
  var p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");

  for (var i = 0, n = p.length - 1; i < n; i++) {
    if (_typeof(t[p[i]]) !== "object" || typeof t[p[i]] == null) {
      t[p[i]] = {};
    }
    t = t[p[i]];
  }

  t[p.slice(-1)[0]] = value;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;
function get(target, path) {
  var t = target;
  var p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");
  for (var i = 0, n = p.length; i < n; i++) {
    if (typeof t[p[i]] === "undefined") {
      return undefined;
    }
    t = t[p[i]];
  }
  return t;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getPathList;
function getKeyValues(paths, path, value) {
  if (Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object") {
    paths.push(path);
  } else {
    for (var k in value) {
      getKeyValues(paths, path.concat(k), value[k]);
    }
  }
}

function getPathList(object) {
  var paths = [];
  getKeyValues(paths, [], object);
  return paths;
}

/***/ })
/******/ ])["default"];
//# sourceMappingURL=index.js.map