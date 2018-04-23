function getKeyValues(paths, path, value) {
  let keys = [];
  let i    = -1;
  let n    = 0;

  if (!value || Array.isArray(value) || (typeof value !== "object" && typeof value !== "function")) {
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

export default function getPathList(object) {
  const paths = [];
  getKeyValues(paths, [], object);
  return paths.sort(function (a, b) { a.length - b.length; });
}