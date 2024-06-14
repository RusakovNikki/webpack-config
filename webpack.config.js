const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV;

module.exports = (env) => {
  /**
   * Добавлен cross-env, чтобы можно было достучаться до process.env как на Windows,
   * так и на Linux
   */
  return {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
    ],
    /**
     * Откуда брать код
     */
    entry: path.resolve(__dirname, "src", "index.js"),
    /**
     * Куда записать билд. При этом если название будет статичным,
     * то браузер его может кешировать.
     * Поэтому нужно использовать шаблоны
     */
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      // перед сборкой очищает папку
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            // транспиляция js
            loader: "babel-loader",
          },
        },
        // {
        //   test: /\.(css|scss)$/i,
        //   /**
        //    * Чтобы внедрить css в js, используется css-loader, но не даёт возможность отобразить стили на странице
        //    * Чтобы отобразить стили, используется style-loader, причём первым
        //    * Чтобы отображать scss, нужен sass-loader
        //    */
        //   use: ["style-loader", "css-loader", "sass-loader"],
        // },
        {
          test: /\.(css|scss)$/i,
          /**
           * Используем эту библиотеку, если хотим, чтобы в сборке css был отдельным файлом.
           * При этом все файлы (css, scss) конвертируются в один.
           */
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    /**
     * Теперь при просмотре в логах кода можно посмотреть файл в обычном виде, а не в транспилированном.
     * Это происходит  благодаря файлу *.map
     */
    devtool: "source-map",

    devServer: {
      static: {
        directory: "./dist",
      },
    },
  };
};
