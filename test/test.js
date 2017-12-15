import el from "el-lite";

function log(result) {
  const a = el({ class : "test" }, [
    el({ ref : "title", class : "test_title" }, [ result.title ]),
    el({ ref : "result", class : "test_result" }, [
      el({ class : "test_result_indicator" })
    ])
  ]);

  const d = el({ class : "test_expectation" }, [
    el({ class : "test_expectation_title" }, [ "Expected"]),
    el({ class : "test_expectation_expected" }, [ result.value[1] ]),
    el({ class : "test_expectation_received" }, [ result.value[0] ])
  ]);

  if (result.isValid) {
    a.addClass("test--is-valid");
  } else {
    a.addClass("test--is-invalid");
    a.append(d);
  }

  el("body").append(a);
}

function Test(title) {
  this.value   = [];
  this.isValid = false;
  this.title   = title;

  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject  = reject;
  })
    .then(() => this.from())
    .then(res => {
      this.value[0] = res.toString();
    })
    .then(()  => this.to())
    .then(res => {
      this.value[1] = res.toString();
    })
    .then(() => { this.isValid = this.value[0] === this.value[1]; })
    .catch(err => {
      console.log(err);
      this.value[1] = this.value[0] || "Error";
      this.value[0] = el({
        class : "error_message"
      }, err.stack
        .split("\n")
        .map(value =>
          el({ class : "error_message_line" }, [ value ])
        )
      );
      this.reject(err);
    });
}

Test.prototype.this = function (callback) {
  this.from = callback;
  return this;
};

Test.prototype.isEqual = function (callback) {
  this.to = callback;
  this.resolve();
  return this;
};

module.exports = function (callback) {
  const P  = [];
  const T  = [];

  function test(title) {
    const o = new Test(title);
    P.push(o.promise);
    T.push(o);
    return o;
  }

  function load() {
    Promise.all(P).then(() => {
      console.log("All " + P.length + " tests are loaded");
      for (var i = 0, n = T.length; i < n; i++) {
        log(T[i]);
      }
    });
  }

  callback(test, load);
};