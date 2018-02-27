import Bus         from "./class/Bus";
import set         from "./helpers/set";
import get         from "./helpers/get";
import copy        from "./helpers/copy";
import getPathList from "./helpers/getPathList";

function Store(props) {
  const cache = {};
  let stringifiedValue;
  let value;

  this.bus        = new Bus({ target : this });
  this.isDeferred = false;
  this.onchange   = [];
  this.value      = {};

  props = props || {};

  // Loads the localStorage object keys as properties of 'this'
  for (var path in window.localStorage) {
    stringifiedValue = window.localStorage.getItem(path);
    if (stringifiedValue !== "undefined") {
      value = JSON.parse(stringifiedValue);
      set(cache, path, value);
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
  const done = {};
  let   temp;
  for (var i = 0, n = paths.length; i < n; i++) {
    for (var x = paths[i].length; x > 0; x--) {
      temp = paths[i].slice(0, x);
      if (!done[temp]) {
        done[temp] = true;
        this.bus.trigger(temp.join("."), get(this.value, temp));
      }
    }
  }
  return this;
};

Store.prototype.triggerOnChange = function (paths) {
  const filter   = [];
  const onchange = this.onchange.slice();

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
  const paths    = getPathList(object);
  const instance = copy(this.value);
  let value;

  for (var i = 0, n = paths.length; i < n; i++) {
    value = get(object, paths[i]);
    set(instance, paths[i], value);
  }

  this.value = instance;
  this.triggerPaths(paths);
  this.triggerOnChange(paths);
  this.save();

  return this;
};

Store.prototype.get = function (path) {
  return get(this.value, [].concat(path).join("."));
};

Store.prototype.copy = function (obj) {
  return copy(obj);
};

Store.prototype.save = function () {
  if (!this.isDeferred) {
    const paths = getPathList(this.value);
    let i       = -1;
    let n       = paths.length;

    this.isDeferred = true;

    while (++i < n) {
      window.localStorage.setItem(
        paths[i].join("."),
        JSON.stringify(get(this.value, paths[i]))
      );
    }
  }

  setTimeout(() => { this.isDeferred = false; }, 100);
};

export default Store;