<template>
  <div class="if-message" :class="`if-message__${type}`">
    <i :class="`if-icon icon-${MESSAGE_ICON_NAME[type]}`"></i>
    <span class="if-message__text">{{ message }}</span>
    <i
      class="if-icon icon-close-bold if-message_close_icon"
      v-if="showClose"
      @click="close"
    ></i>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { Props } from "./message";

defineProps(Props);

const emit = defineEmits(["close"]);

const MESSAGE_ICON_NAME = {
  success: "success-filling",
  info: "prompt-filling",
  warning: "warning-filling",
  error: "delete-filling",
};

const instance = getCurrentInstance();

const close = () => {
  emit("close", instance.vnode.el.parentElement);
};
</script>
