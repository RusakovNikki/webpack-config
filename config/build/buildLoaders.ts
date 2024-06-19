import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => [
  // {
  //   test: /\.js$/,
  //   exclude: /node_modules/,
  //   use: {
  //     // транспиляция js
  //     loader: "babel-loader",
  //   },
  // },
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
   * Так же ts-loader умеет обрабатывать (j/t)sx
   */
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
  /**
   * Используется чтобы была возможность
   * импортировать изображения
   */
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
        },
      },
    ],
  },
];
