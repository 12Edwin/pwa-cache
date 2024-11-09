const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./public/js/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  plugins: [
    new InjectManifest({
      swSrc: "./public/sw.js",
      swDest: "sw.js",
    }),
  ],
};
