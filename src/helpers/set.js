export default function set(obj, path, value) {
  let t = obj;
  let p = Array.isArray(path) ? path.join(".").split(".") : path.split(".");

  for (var i = 0, n = p.length - 1; i < n; i++) {
    if (typeof t[p[i]] !== "object" || t[p[i]] == null) {
      t[p[i]] = {};
    } else {
      t[p[i]] = t[p[i]];
    }

    t = t[p[i]];
  }

  t[p.slice(-1)[0]] = value;
}