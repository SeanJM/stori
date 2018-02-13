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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Bus = __webpack_require__(1);

var _Bus2 = _interopRequireDefault(_Bus);

var _set = __webpack_require__(2);

var _set2 = _interopRequireDefault(_set);

var _get = __webpack_require__(3);

var _get2 = _interopRequireDefault(_get);

var _getPathList = __webpack_require__(4);

var _getPathList2 = _interopRequireDefault(_getPathList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Store(props) {
  var cache = {};
  var value = void 0;
  var parsed = void 0;

  props = props || {};

  this.bus = new _Bus2.default({ target: this });
  this.deferred = false;
  this.onchange = [];
  this.value = {};

  // Loads the localStorage object keys as properties of 'this'
  for (var key in window.localStorage) {
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

  for (k in props) {
    this.value[k] = props[k];
  }

  for (k in cache) {
    this.value[k] = cache[k];
  }

  this.save();
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

  this.value = _extends({}, this.value);
  this.triggerPaths(paths);
  this.triggerOnChange(paths);
  this.save();

  return this;
};

Store.prototype.get = function (path) {
  return (0, _get2.default)(this.value, [].concat(path).join("."));
};

Store.prototype.save = function () {
  var _this = this;

  clearTimeout(this.deferred);
  this.deferred = setTimeout(function () {
    for (var key in _this.value) {
      if (typeof _this.value[key] !== "function") {
        window.localStorage.setItem(key, JSON.stringify(_this.value[key]));
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
function set(store, path, value) {
  var t = store.value;
  var p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");

  for (var i = 0, n = p.length - 1; i < n; i++) {
    if (_typeof(t[p[i]]) !== "object" || t[p[i]] == null) {
      t[p[i]] = {};
    } else if (Array.isArray(t[p[i]])) {
      t[p[i]] = t[p[i]].slice();
    } else if (_typeof(t[p[i]]) === "object") {
      t[p[i]] = Object.assign({}, t[p[i]]);
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
  var keys = [];

  if (typeof value === "undefined" || value == null) {
    paths.push(path);
  } else if (Array.isArray(value) || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" && typeof value !== "function") {
    paths.push(path);
  } else {
    for (var k in value) {
      if (value.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    if (keys.length) {
      for (var i = 0, n = keys.length; i < n; i++) {
        getKeyValues(paths, path.concat(keys[i]), value[keys[i]]);
      }
    } else {
      getKeyValues(paths, path, undefined);
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