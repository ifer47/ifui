<template>
  <div>
    <!-- button -->
    <h2>按钮</h2>
    <h3>Button</h3>
    <div>
      <if-button>default</if-button>
      <if-button type="primary">primary</if-button>
      <if-button type="success">success</if-button>
      <if-button type="info">info</if-button>
      <if-button type="warning">warning</if-button>
      <if-button type="danger">danger</if-button>
    </div>
    <h3>Button size</h3>
    <div style="margin-bottom: 10px">
      <if-button type="primary" size="small">primary</if-button>
      <if-button type="success" size="small">success</if-button>
      <if-button type="info" size="small">info</if-button>
      <if-button type="warning" size="small">warning</if-button>
      <if-button type="danger" size="small">danger</if-button>
    </div>
    <div>
      <if-button type="primary" size="mini">primary</if-button>
      <if-button type="success" size="mini">success</if-button>
      <if-button type="info" size="mini">info</if-button>
      <if-button type="warning" size="mini">warning</if-button>
      <if-button type="danger" size="mini">danger</if-button>
    </div>
    <h3>Button round</h3>
    <div style="margin-bottom: 10px">
      <if-button round>default</if-button>
      <if-button type="primary" round>primary</if-button>
      <if-button type="success" round>success</if-button>
      <if-button type="info" round>info</if-button>
      <if-button type="warning" round>warning</if-button>
      <if-button type="danger" round>danger</if-button>
    </div>

    <h3>Button disabled</h3>
    <div>
      <if-button type="primary" disabled>primary</if-button>
      <if-button type="success" disabled>success</if-button>
      <if-button type="info" disabled>info</if-button>
      <if-button type="warning" disabled>warning</if-button>
      <if-button type="danger" disabled>danger</if-button>
    </div>

    <h3>Button icon</h3>

    <div>
      <if-button type="primary" icon="charif-bar">primary</if-button>
      <if-button type="success" icon="calendar">success</if-button>
      <if-button type="info" icon="data-view"></if-button>
      <if-button type="primary" icon="download"></if-button>
    </div>

    <h3>Button loading</h3>

    <div>
      <if-button type="primary" :loading="loading">加载中</if-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 3000);
</script>

<style scoped></style>
