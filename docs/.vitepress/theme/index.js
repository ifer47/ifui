import DefaultTheme from "vitepress/theme";
import IfUI from "@ifui/components";
import "@ifui/theme-chalk/index.less";
import CodePreview from "./code-preview/index.vue";
import "highlight.js/styles/base16/summerfruit-light.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(IfUI);
    app.component("CodePreview", CodePreview);
    app.use(hljsVuePlugin);
  },
};