<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, type Inputs } from './packages/index.ts';

const inputs: Inputs = {
  input1: "输入框1",
  input2: "输入框2*",
  input3: {
    type: "text",
    label: "输入框3",
  },
  input4: {
    type: "text",
    label: "输入框4",
    value: "默认值",
  },
  input5: {
    type: "text",
    label: "输入框5",
    disabled: true,
  },
  checkbox1: {
    type: "checkbox",
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
  },
  checkbox2: {
    type: "checkbox",
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
    value: ["1"],
  },
}
</script>

<template>
  <h2>TDesignJsonForm</h2>
  <TDesignJsonForm :inputs="inputs" />
  <h2>ElementPlusJsonForm</h2>
  <ElementPlusJsonForm :inputs="inputs" />
  <h2>AntDesignJsonForm</h2>
  <AntDesignJsonForm :inputs="inputs" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
