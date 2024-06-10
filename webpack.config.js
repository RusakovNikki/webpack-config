const path = require("path");

const mode = process.env.NODE_ENV;

module.exports = (env) => {
  console.log(env);
  return {
    mode: env.NODE_ENV === "production" ? "production" : "development",
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