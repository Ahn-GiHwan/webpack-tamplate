const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, option) => {
  return {
    entry: "./src/main.js",
    output: {
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: "./index.html",
      }),

      new MiniCssExtractPlugin({
        filename: "style.css",
      }),

      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
    ],
  };
};
