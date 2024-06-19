import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  //   static: {
  //     directory: "./dist",
  //   },
  port: options.port ?? 3000,
  open: true,
  /**
   * Чтобы поддерживался роутинг в React Router Dom.
   * Работает только для devServer.
   * Если раздавать статику через nginx то нужно делать проксирование на index.html
   */
  historyApiFallback: true,
});
