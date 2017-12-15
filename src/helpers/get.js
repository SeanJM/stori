export default function get(target, path) {
  let t = target;
  let p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");
  for (var i = 0, n = p.length; i < n; i++) {
    if (!t[p[i]]) {
      return undefined;
    }
    t = t[p[i]];
  }
  return t;
}