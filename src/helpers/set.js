export default function set(target, path, value) {
  let t = target;
  let p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");
  for (var i = 0, n = p.length - 1; i < n; i++) {
    if (!t[p[i]]) {
      t[p[i]] = {};
    }
    t = t[p[i]];
  }
  t[p.slice(-1)[0]] = value;
}