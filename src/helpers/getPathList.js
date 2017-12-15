function getKeyValues(paths, path, value) {
  if (Array.isArray(value) || typeof value !== "object") {
    paths.push(path);
  } else {
    for (var k in value) {
      getKeyValues(paths, path.concat(k), value[k]);
    }
  }
}

export default function getPathList(object) {
  const paths = [];
  getKeyValues(paths, [], object);
  return paths;
}