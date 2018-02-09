function getKeyValues(paths, path, value) {
  let keys = [];

  if (typeof value === "undefined" || value == null) {
    paths.push(path);
  } else if (Array.isArray(value) || (typeof value !== "object" && typeof value !== "function")) {
    paths.push(path);
  } else if (typeof value !== "function") {
    for (var k in value) {
      keys.push(k);
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

export default function getPathList(object) {
  const paths = [];
  getKeyValues(paths, [], object);
  return paths;
}