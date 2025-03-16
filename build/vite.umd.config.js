import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: path.resolve(__dirname, "../packages/components/index.js"),
      name: "IfUI",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") {
            return "style.css";
          }
          return assetInfo.name;
        },
      },
    },
  },
});
