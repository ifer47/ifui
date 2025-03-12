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
