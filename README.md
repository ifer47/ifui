# 项目初始化

1\. 基本目录结构。

```bash
docs # 文档
examples # 实例
  - package.json # name: @ifui/examples
packages # 组件
  - components # 组件
    - package.json # name: @ifui/components
  - theme-chalk # 样式
    - package.json # name: @ifui/components
  - utils # 公共
    - package.json # name: @ifui/components
pnpm-workspace.yaml
```

2\. `pnpm-workspace.yaml`。

```yml
packages:
  - packages/**
  - examples
```

3\. 配置 `.npmrc`。

pnpm 会尝试模仿传统的 npm 和 yarn 行为，将所有依赖项都安装在项目的根 node_modules 文件夹中，解决工具链（如 `jest`、`vite`）和第三方库的路径解析问题，可以确保依赖版本统一，避免冲突。

尽管这一配置会削弱 `pnpm` 的严格隔离优势，但在复杂的 UI 组件库开发中，兼容性和稳定性通常优先于磁盘空间优化。对于开发者来说，这是一个权衡后的实用选择。

```bash
shamefully-hoist = true
```

```bash
pnpm i @ifui/examples -w
pnpm i @ifui/components -w
pnpm i @ifui/theme-chalk -w
pnpm i @ifui/utils -w
```

4\. 4 个 `package.json` 对应的项目间可以互通啦。

5\. 整理组件代码结构。

使用 ElementPlus 的时候如下：

```js
import ElementPlus from "element-plus";
app.use(ElementPlus);
```

意味着 components/index.js

```js
import ElButton from "./button";
export default {
  install(app) {
    app.component("el-button", ElButton);
  },
};
```

```bash
📦button
 ┣ 📂src
 ┃ ┗ 📜button.vue
 ┗ 📜index.js
```

`button/src/button.vue`

```html
<template>
  <div>
    <button>
      <slot />
    </button>
  </div>
</template>

<script setup>
  defineOptions({
    name: "if-button",
  });
</script>
```

`button/index.js`

```js
import Button from "./src/button.vue";

// 允许用户通过 app.use(Button) 的方式全局注册 Button 组件，例如 examples/index.js
// import IfButton from "@ifui/components/button";
// app.use(IfButton)
Button.install = (app) => {
  app.component(Button.name, Button);
};
export const IfButton = Button;

export default IfButton;
```

统一导入组件，`components/components.js`

```js
export { IfButton } from "./button";
```

`components/index.js`

```js
import * as components from "./components";

export default {
  install(app) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value);
    });
  },
};
```

# 搭建组件预览环境

```bash
📦examples
 ┣ 📜app.vue
 ┣ 📜index.html
 ┣ 📜index.js
 ┣ 📜package.json
 ┗ 📜vite.config.js
```

1\. 根目录，安装 vite 和处理 SFC 的插件。

```bash
# @vitejs/plugin-vue 的主要作用是为 Vite 提供对 Vue 单文件组件的支持
pnpm i @vitejs/plugin-vue vite -D -w
```

`vite.config.js`

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

`package.json`

```json
{
  "name": "@ifui/examples",
  "type": "module"
  // ...
}
```

2\. 准备模板，通过 createApp 创建应用。

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ifui</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
  <script type="module" src="./index.js"></script>
</html>
```

App.vue

```html
<template>
  <div>
    <p>Hello</p>
  </div>
</template>

<script setup></script>

<style scoped></style>
```

examples/index.js

```js
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

`根 package.json`

```json
{
  "scripts": {
    "dev": "vite examples" // 添加启动命令
  }
  // ...
}
```

3\. 使用我们自己的组件。

注册 IfUI 组件

```js
import { createApp } from "vue";
import App from "./app.vue";
import IfUI from "@if-ui/components";

const app = createApp(App);
app.use(IfUI);
app.mount("#app");
```

使用 IfUI 组件中的 button 组件，App.vue

```html
<template>
  <div>
    <p>Hello</p>
    <if-button>World</if-button>
  </div>
</template>

<script setup></script>

<style scoped></style>
```

```bash
pnpm dev
```

