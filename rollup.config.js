import resolve from "@rollup/plugin-node-resolve";
import vuePlugin from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";
import url from "postcss-url";

export default {
  input: "./packages/components/index.js",
  output: [
    {
      file: "dist/es.js",
      name: "IfUI",
      format: "es",
    },
    {
      file: "dist/cjs.js",
      name: "IfUI",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/umd.js",
      name: "IfUI",
      format: "umd",
      exports: "named",
      globals: {
        vue: "Vue",
      },
    },
  ],
  plugins: [
    resolve(),
    vuePlugin(),
    postcss({
      extract: "theme-chalk/style.css",
      plugins: [
        autoprefixer(),
        url({
          url: "copy",
          basePath: "fonts",
          assetsPath: "fonts",
        }),
      ],
    }),
    copy({
      targets: [
        {
          src: "packages/theme-chalk/fonts/*",
          dest: "dist/theme-chalk/fonts/",
        },
      ],
    }),
  ],
  external: ["vue"],
};
