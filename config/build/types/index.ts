export interface BuildPath {
  entry: string;
  html: string;
  output: string;
  src: string;
}

export enum EEnvMode {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

export interface BuildOptions {
  port: number;
  paths: BuildPath;
  mode: EEnvMode;
}