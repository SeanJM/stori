import tinyTest from "./test";
import Store from "../src/index";

const store = new Store();

tinyTest((test, load) => {
  test("Set (Basic)")
    .this(function () {
      store.set({
        value : "this"
      });
      return store.value.value;
    })
    .isEqual(() => {
      return "this";
    });

  test("Set (false)")
    .this(function () {
      store.set({
        isFalse : false
      });
      return store.value.isFalse;
    })
    .isEqual(() => {
      return false;
    });

  test("Set (OnSet)")
    .this(function () {
      let isSet = [ false, false, false ];

      store.on("a", () => {
        isSet[0] = !isSet[0];
      });

      store.on("a.b", () => {
        isSet[1] = !isSet[1];
      });

      store.on("a.b.c", () => {
        isSet[2] = !isSet[2];
      });

      store.set({
        a : {
          b : {
            c : "d"
          },
          e : {
            f : "g"
          }
        }
      });

      return isSet[0] && isSet[1] && isSet[2];
    })
    .isEqual(() => {
      return true;
    });

  test("Get (path string)")
    .this(function () {
      store.set({
        a : {
          b : {
            c : "d"
          }
        }
      });

      return store.get("a.b.c");
    })
    .isEqual(() => {
      return "d";
    });

  test("Get (path array)")
    .this(function () {
      store.set({
        a : {
          b : {
            c : "d"
          }
        }
      });

      return store.get([ "a", "b", "c" ]);
    })
    .isEqual(() => {
      return "d";
    });

  test("Get (undefined)")
    .this(function () {
      store.set({
        a : "d"
      });

      return store.get([ "a", "b", "c" ]);
    })
    .isEqual(() => {
      return undefined;
    });

  test("Set (merge values)")
    .this(function () {
      store.set({
        a : {
          b : true
        }
      });

      store.set({
        a : {
          c : true
        }
      });

      return store.value.a.b && store.value.a.c;
    })
    .isEqual(() => {
      return true;
    });

  test("Set (nulls)")
    .this(function () {
      store.set({
        a : null
      });

      store.set({
        a : {
          c : true
        }
      });

      return store.value.a.c;
    })
    .isEqual(() => {
      return true;
    });

  test("New version")
    .this(function () {
      const s = new Store({ version : store.version + 1 })
      return typeof s.a === "undefined";
    })
    .isEqual(() => {
      return true;
    });

  test("onChange")
    .this(function () {
      const state = {};

      store.onChange(function (path, value) {
        state.path  = path;
        state.value = value;
      });

      store.set({
        path : {
          to : {
            virtue : "is here"
          },
          above : {
            is : "now"
          }
        }
      });

      return (
        state.path === "path" &&
        state.value.to.virtue === "is here" &&
        state.value.above.is === "now"
      );
    })
    .isEqual(() => {
      return true;
    });

  test("Setting empty objects")
    .this(function () {
      const store = new Store();

      store.set({
        service : {
          modal : {},
          slideIn : {},
        }
      });

      return !!store.value.service.modal && !!store.value.service.slideIn;
    })
    .isEqual(() => {
      return true;
    });

  test("Immutable?")
    .this(function () {
      const store = new Store();
      const t = [];

      store.set({
        service : {
          modal : "test"
        }
      });

      t.push(store.value.service);

      store.set({
        service : {
          modal : "test2"
        }
      });

      t.push(store.value.service);

      return t[0].modal === "test" && t[1].modal === "test2";
    })
    .isEqual(() => {
      return true;
    });

  test("Immutable 2")
    .this(function () {
      const store = new Store();
      const t = [];

      store.set({
        service : {
          modal : "test"
        }
      });

      t.push(store.value);

      store.set({
        service : {
          modal : "test2"
        }
      });

      t.push(store.value);
      return t[0].service.modal === "test" && t[1].service.modal === "test2";
    })
    .isEqual(() => {
      return true;
    });

  load();
});