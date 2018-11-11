const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
const cssDev = require("./webpack.dev.js");
const cssProd = require("./webpack.prod.js");
const cssConfig = isProd ? cssProd : cssDev;
const myEnv = require("dotenv").config();

module.exports = {
  output: {
    path: path.resolve(__dirname, "docs/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss|.css$/,
        use: cssConfig
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[ext]",
              publicPath: "./",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "../",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    stats: "errors-only"
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: "./css/main.css",
      disable: !isProd,
      allChunks: true
    })
  ]
};

console.log(isProd ? "It is Production" : "It is Devolopment");
