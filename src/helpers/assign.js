export default function assign(a, b) {
  let key;

  for (key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
}