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
