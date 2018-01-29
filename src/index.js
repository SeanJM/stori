import Bus         from "./class/Bus";
import set         from "./helpers/set";
import get         from "./helpers/get";
import getPathList from "./helpers/getPathList";

const EXCLUDED_PROPERTIES = {
  __bus      : true,
  __deferred : true,
};

function Store(props) {
  const cache = {};
  let i = 0;
  let key;
  let value;
  let parsed;

  props = props || {};

  // Loads the localStorage object keys as properties of 'this'
  for (; window.localStorage.key(i); i += 1) {
    key    = window.localStorage.key(i);
    value  = window.localStorage.getItem(key);
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

  this.__bus      = new Bus({ target : this });
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
  const done = {};
  let   temp;
  for (var i = 0, n = paths.length; i < n; i++) {
    for (var x = paths[i].length; x > 0; x--) {
      temp = paths[i].slice(0, x);
      if (!done[temp]) {
        done[temp] = true;
        this.__bus.trigger(temp.join("."), get(this, temp));
      }
    }
  }
  return this;
};

Store.prototype.set = function (object) {
  const paths = getPathList(object);
  let value;

  for (var i = 0, n = paths.length; i < n; i++) {
    value = get(object, paths[i]);
    if (this[paths[i][0]] === "function") {
      throw new Error(
        "[Store] Cannot set value \"" + paths[i][0] + "\", it is a reserved name."
      );
    }
    set(this, paths[i], value);
  }

  this.triggerPaths(paths);
  this.save();
  return this;
};

Store.prototype.get = function (path) {
  return get(this, [].concat(path).join("."));
};

Store.prototype.save = function () {
  clearTimeout(this.__deferred);
  this.__deferred = setTimeout(() => {
    for (var key in this) {
      if (
        this.hasOwnProperty(key) &&
        !EXCLUDED_PROPERTIES[key] &&
        typeof this[key] !== "function"
      ) {
        // console.log(key, JSON.stringify(this[key]));
        window.localStorage.setItem(
          key,
          JSON.stringify(this[key])
        );
      }
    }
  }, 50);
};

export default Store;