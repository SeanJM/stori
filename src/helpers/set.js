export default function set(obj, path, value) {
  var t = obj;

  var p = Array.isArray(path)
    ? path.join(".").split(".")
    : path.split(".");

  var i = -1;
  var n = p.length - 1;

  while (++i < n) {
    if (typeof t[p[i]] !== "object" || t[p[i]] == null) {
      t[p[i]] = {};
    } else {
      t[p[i]] = t[p[i]];
    }
    t = t[p[i]];
  }

  t[p[n]] = value;
}