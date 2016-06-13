module.exports = {
  context: __dirname,
  entry: "./lib/entry.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "dominodes.js",
  },
};
