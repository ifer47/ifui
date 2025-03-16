import { createApp } from "vue";
import App from "./App.vue";
import IfUI from '@ifui/components'
import "@ifui/theme-chalk/index.less";
const app = createApp(App);
app.use(IfUI)
app.mount("#app");
