/*eslint-env node*/
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "production",
  entry: ["./src/main.ts", "./src/style.sass"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/manifest.json", to: path.resolve(__dirname, "dist/manifest.json") },
        { from: "./src/icon/*.png", to: path.resolve(__dirname, "dist/"), flatten: true },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
}
