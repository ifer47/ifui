<template>
  <button
    class="if-button"
    :class="[
      `${size && 'if-button--' + size}`,
      `if-button__${type}`,
      { 'if-button--icon': icon },
      { 'is-plain': plain },
      { 'is-disabled': disabled || loading },
      { 'is-round': round },
    ]"
    :disabled="disabled || loading"
  >
    <div class="if-button__inner">
      <i v-if="loading" class="if-icon-loading"></i>
      <i v-if="icon" :class="[`if-icon-${icon}`]"></i>
      <span v-if="$slots.default">
        <slot />
      </span>
    </div>
  </button>
</template>

<script setup>
import { ButtonProps } from "./button";

defineOptions({
  name: "if-button",
});

defineProps(ButtonProps);
</script>
