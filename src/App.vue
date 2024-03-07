<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout } from './packages/index.ts';

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
const layout = ref<Layout>('vertical')
</script>

<template>
  <h5>layout</h5>
  <t-radio-group v-model="layout">
    <t-radio-button value="horizontal">horizontal</t-radio-button>
    <t-radio-button value="vertical">vertical</t-radio-button>
    <t-radio-button value="inline">inline</t-radio-button>
  </t-radio-group>
  <h2>TDesignJsonForm</h2>
  <TDesignJsonForm :inputs="inputs" :layout="layout" />
  <h2>ElementPlusJsonForm</h2>
  <ElementPlusJsonForm :inputs="inputs" :layout="layout" />
  <h2>AntDesignJsonForm</h2>
  <AntDesignJsonForm :inputs="inputs" :layout="layout" />
  <h2>AcroDesignJsonForm</h2>
  <AcroDesignJsonForm :inputs="inputs" :layout="layout" />
</template>

<style scoped>
</style>
