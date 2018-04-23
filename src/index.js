import Bus         from "./class/Bus";
import set         from "./helpers/set";
import get         from "./helpers/get";
import copy        from "./helpers/copy";
import assign      from "./helpers/assign";
import getPathList from "./helpers/getPathList";

function shouldCopy(copyPaths, path) {
  let i = 0;
  let n = path.length + 1;
  let p;

  while (++i < n) {
    p = path.slice(0, i).join(".");
    if (copyPaths.indexOf(p) !== -1) {
      return false;
    }
  }

  copyPaths.push(p);
  return true;
}

function Store(props) {
  const cache = {};
  let stringifiedValue;
  let value;

  this.bus        = new Bus({ target : this });
  this.isDeferred = false;
  this.onsave     = [];
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

Store.prototype.set = function (object, callback) {
  const paths     = getPathList(object);
  const instance  = assign({}, this.value);
  const copyPaths = [];

  let i = -1;
  let n = paths.length;
  let path;

  while (++i < n) {
    path  = paths[i].slice(0, Math.max(1, paths[i].length - 1));
    if (shouldCopy(copyPaths, path)) {
      set(instance, path, copy(get(instance, path)));
    }
    path  = paths[i];
    set(instance, path, get(object, path));
  }

  this.value = instance;
  this.triggerPaths(paths);
  this.triggerOnChange(paths);

  return this.save(callback);
};

Store.prototype.get = function (path) {
  return get(this.value, [].concat(path).join("."));
};

Store.prototype.save = function (callback) {
  var self = this;

  function save() {
    const paths = getPathList(self.value);
    let i       = -1;
    let n       = paths.length;

    self.isDeferred = true;

    while (++i < n) {
      window.localStorage.setItem(
        paths[i].join("."),
        JSON.stringify(get(self.value, paths[i]))
      );
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
  return getPathList(obj);
};

Store.prototype.copy = function (obj) {
  return copy(obj);
};

export default Store;