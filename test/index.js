import tinyTest from "./test";
import Store from "../src/index";

const store = new Store();

tinyTest((test, load) => {
  test("Set (Basic)")
    .this(function () {
      store.set({
        value : "this"
      });
      return store.value;
    })
    .isEqual(() => {
      return "this";
    });

  test("Set (false)")
    .this(function () {
      store.set({
        isFalse : false
      });
      return store.isFalse;
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

  load();
});