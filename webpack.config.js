const path           = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const nodeExternals  = require("webpack-node-externals");
const IS_PRODUCTION  = process.env.NODE_ENV === "production";

module.exports = [{
  externals : [ nodeExternals() ],
  entry     : path.resolve("src/index.js"),

  output  : {
    libraryTarget : "commonjs2",
    libraryExport : "default",
    filename      : "index.js",
    path          : path.resolve("./")
  },

  module : {
    loaders : [{
      test    : /\.js$/,
      loader  : "babel-loader",
      exclude : /node_modules/,
      query : {
        presets: [
          [ "env", { targets : { node: "current" } } ]
        ]
      }
    }],
  },

  devtool : !IS_PRODUCTION ? "source-map" : undefined,

  plugins: (
    IS_PRODUCTION
      ? [ new UglifyJsPlugin() ]
      : []
  )
}, {
  entry : path.resolve("test/index.js"),

  output  : {
    filename : "bundle.js",
    path     : path.resolve("test/")
  },

  module : {
    loaders : [{
      test    : /\.js$/,
      loader  : "babel-loader",
      exclude : /node_modules/,
      query : {
        presets: [ "env"]
      }
    }],
  }
}];