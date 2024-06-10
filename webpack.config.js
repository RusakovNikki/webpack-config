const path = require("path");

const mode = process.env.NODE_ENV;

module.exports = (env) => {
  /**
   * Добавлен cross-env, чтобы можно было достучаться до process.env как на Windows,
   * так и на Linux
   */
  return {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public"),
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
        {
          test: /\.css$/i,
          /**
           * Чтобы внедрить css в js, используется css-loader, но не даёт возможность отобразить стили на странице
           * Чтобы отобразить стили, используется style-loader, причём первым
           */
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    /**
     * Теперь при просмотре в логах кода можно посмотреть файл в обычном виде, а не в транспилированном.
     * Это происходит  благодаря файлу main.js.map
     */
    devtool: "source-map",

    devServer: {
      static: {
        directory: "./public",
      },
    },
  };
};
