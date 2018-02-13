export default function copy(x) {
  var i = 0;
  var t;

  if (Array.isArray(x)) {
    t = [];
    while (i++ < x.length) {
      t[i] = copy(x[i]);
    }
  } else if (typeof x === "object") {
    t = {};
    for (var k in x) {
      t[k] = copy(x[k]);
    }
  }

  return t || x;
}