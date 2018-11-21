const path = require("path");

module.exports = {
  presets: [
    ["@babel/env"]
  ],
  env: {
    test: {
      presets: [["@babel/env"]]
    }
  },
  plugins: [
    ["module-resolver", {
      root: ["./src"],
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }]
  ]
};
