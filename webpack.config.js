const path = require('path');
const docsPath = path.resolve(__dirname, "docs");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: docsPath,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.s[ac]ss$/i, use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
    ]
  },
  devServer: {
    contentBase: docsPath,
    hot: true,
  }
};
