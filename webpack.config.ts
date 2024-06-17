import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import "webpack-dev-server";

enum EEnvMode {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

interface EnvVariables {
  mode?: EEnvMode;
  port?: number;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? EEnvMode.DEVELOPMENT,
    /**
     * Откуда брать код
     */
    entry: path.resolve(__dirname, "src", "index.ts"),
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
    plugins: [
      /**
       * Используем эту библиотеку, если хотим, чтобы в сборке css был отдельным файлом.
       * При этом все файлы (css, scss) конвертируются в один.
       */
      new MiniCssExtractPlugin(),
      /**
       * Добавляем этот плагин чтобы файл index.html автоматически шёл в сборку
       * и при этом подключал автоматом скрипт
       */
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
    ],

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
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        /**
         * Обработка typescript
         */
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    /**
     * Чтобы можно было писать import { AGE } from "./simpleFile"; без ".ts(x)"
     */
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
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
      port: env.port ?? 3000,
      open: true,
    },
  };

  return config;
};
