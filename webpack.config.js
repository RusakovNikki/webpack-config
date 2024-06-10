module.exports = {
  mode: "development",
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
};
