import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/es",
    lib: {
      entry: path.resolve(__dirname, "../packages/components/index.js"),
      name: "IfUI",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
