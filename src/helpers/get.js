export default function get(target, path) {
  let t = target;

  let p = Array.isArray(path)
    ? path.join(".").split(".")
    : path.split(".");

  let i = -1;
  let n = p.length;

  while (++i < n) {
    if (!t[p[i]]) {
      return t[p[i]];
    }
    t = t[p[i]];
  }

  return t;
}