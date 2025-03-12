# 进行组件库初始化

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
  <button class="if-button">
    <slot />
  </button>
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

# 如何搭建组件文档

1\. 搭建 vitepress 文档。

docs 目录

```bash
npx vitepress init
```

```bash
$ npx vitepress init

┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./
│
◇  Site title:
│  IfUI
│
◇  Site description:
│  This is a fantastic UI framework.
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  No
│
◇  Add VitePress npm scripts to package.json?
│  No
│
└  You're all set! Now run npx vitepress dev and start writing.
```

```bash
📦docs
 ┣ 📂.vitepress
 ┃ ┣ 📂cache
 ┃ ┗ 📜config.mjs
 ┣ 📜api-examples.md
 ┣ 📜index.md
 ┗ 📜markdown-examples.md
```

根目录

```bash
pnpm i vitepress -D -w
```

根 package.json

```json
{
  "docs:dev": "vitepress dev docs",
  "docs:build": "vitepress build docs",
  "docs:preview": "vitepress preview docs"
  // ...
}
```

运行

```bash
pnpm docs:dev
```

<img src="./assets/image-20250312191836639.png" 
     style="border: 2px solid #333; border-radius: 8px;" 
     alt="image-20250312191836639"/>

要展示我们的组件，需要先安装，通过[自定义主题](https://vitepress.dev/zh/guide/custom-theme)，安装我们的组件库。

docs\.vitepress\theme\index.js

```js
import DefaultTheme from "vitepress/theme";
import IfUI from "@ifui/components";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(IfUI);
  },
};
```

清除里面的内容，放我们自己的组件观察效果，docs\markdown-examples.md

```html
<if-button>Hello World</if-button>
```

![image-20250312192405311](./assets/image-20250312192405311.png)

准备样式，根

```bash
pnpm i less less-loader -D -w
```

packages\theme-chalk\index.less

```less
.if-button {
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  white-space: nowrap;
  color: #fff;
  text-align: center;
  outline: none;
  user-select: none;
  background-color: #67c23a;
  border: 1px solid #dcdfe6;
  border-color: #67c23a;
}
```

在文档注册组件的时候导入样式，`docs\.vitepress\theme\index.js`

```less
import DefaultTheme from "vitepress/theme";
import IfUI from "@ifui/components";
import "@ifui/theme-chalk/index.less";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(IfUI);
  },
};

```

确保之前的组件代码，packages\components\button\src\button.vue

```html
<template>
  <button class="if-button">
    <slot />
  </button>
</template>

<script setup>
defineOptions({
  name: "if-button",
});
</script>
```

会发现已经添加上样式拉。



如何预览组件源码？

```bash
📦.vitepress
 ┣ 📂theme
 ┃ ┣ 📂preview
 ┃ ┃ ┗ 📜index.vue
 ┃ ┗ 📜index.ts # 主题配置入口
 ┗ 📜config.mts
```



`docs\.vitepress\theme\code-preview\index.vue`

```html
<template>
  <div><slot /></div>
</template>

<script setup></script>

<style scoped></style>

```

`docs\.vitepress\theme\index.ts`

```js
import DefaultTheme from "vitepress/theme";
import IfUI from "@ifui/components";
import "@ifui/theme-chalk/index.less";
import CodePreview from "./code-preview/index.vue";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    app.use(IfUI);
    app.component("CodePreview", CodePreview);
  },
};
```

在 markdown-examples.md 中应用一下我们注册的组件，看下是否成功。

```html
<if-button>Hello World</if-button>

<code-preview>🎉</code-preview>
```



docs\components\button\index.md

```md
# Button

<code-preview>
  <if-button>button</if-button>
</code-preview>
```

`docs\.vitepress\config.mts`

```ts
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IfUI",
  description: "An UI framework.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/button/" },
    ],

    sidebar: [
      {
        text: "基本",
        items: [{ text: "Button 按钮", link: "/components/button/" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
```

![image-20250312193539401](./assets/image-20250312193539401.png)

展示代码，`docs\.vitepress\theme\code-preview\index.vue`

```html
<template>
  <div class="preview">
    <div class="preview-content">
      <slot />
    </div>
    <div class="code-wrap">
      <div class="code" :class="{ 'show-code': showCode }">
        <div class="code-inner">
          <pre>{{sourceCode}}</pre>
        </div>
      </div>
      <div class="code-btn" @click="state.showCode = !state.showCode">
        {{ showCode ? "隐藏" : "显示" }}代码
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, toRefs } from "vue";

  const props = defineProps({
    compName: {
      type: String,
      default: "",
    },
    demoName: {
      type: String,
      default: "",
    },
  });
  const cmpCode = async () => {
    console.log(props.compName, props.demoName, 888);
    const data = await import(
      `../../../components/${props.compName}/${props.demoName}.vue?raw`
    );
    state.sourceCode = data.default;
  };

  onMounted(cmpCode);

  const state = reactive({
    sourceCode: "",
    showCode: false,
  });

  const { sourceCode, showCode } = toRefs(state);
</script>

<style scoped>
  .preview {
    margin: 20px 0;
    border: 1px solid #efefef;
    border-radius: 6px;
    overflow: hidden;
  }
  .preview-content {
    padding: 20px;
  }
  .code-btn {
    position: relative;
    height: 46px;
    line-height: 46px;
    color: #666;
    text-align: center;
    background: #f7f7f7;
    cursor: pointer;
    z-index: 100;
  }
  .code-btn:hover {
    background: #f2f2f2;
  }
  .code {
    border-top: 1px solid #efefef;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
  }
  .code .code-inner {
    overflow: hidden;
  }
  .show-code {
    grid-template-rows: 1fr;
  }
</style>
```

此时会有报错，不用管，继续。

docs\components\button\basic.vue

```html
<template>
  <if-button>Hello</if-button>&nbsp;
  <if-button>World</if-button>
</template>
```

`docs\components\button\index.md`

```html
<script setup>
import basic from './basic.vue'
</script>

# Button

<code-preview comp-name="button" demo-name="basic">
  <basic/>
</code-preview>
```

此时效果如下：

![image-20250312194800767](./assets/image-20250312194800767.png)

处理代码高亮问题，根目录安装

```bash
pnpm i highlight.js @highlightjs/vue-plugin -w
```

使用 `docs\.vitepress\theme\index.ts`

```ts
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
```

改造 docs\.vitepress\theme\code-preview\index.vue





```html
<template>
  <div class="preview">
    <div class="preview-content">
      <slot />
    </div>
    <div class="code-wrap">
      <div class="code" :class="{ 'show-code': showCode }">
        <div class="code-inner">
          <!-- #2 -->
          <highlightjs autodetect :code="sourceCode" />
        </div>
      </div>
      <div class="code-btn" @click="state.showCode = !state.showCode">
        {{ showCode ? "隐藏" : "显示" }}代码
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from "vue";
// #1
import "highlight.js";
// ...
</script>
<style scoped>
/* ... */
</style>
```

处理访问 http://localhost:5174/markdown-examples.html 时的报错问题，删除 code-preview 组件，docs\markdown-examples.md

```html
<if-button>Hello World</if-button>
```



