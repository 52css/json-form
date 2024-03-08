<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout } from './packages/index.ts';

const tabs = ref('tdesign')
const layout = ref<Layout>('vertical')
const disabled = ref(1)

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
  input6: {
    type: "text",
    label: "输入框6",
    disabled: () => !!disabled.value,
  },
  input7: {
    type: "text",
    label: "输入框7",
    disabled: async () => !!disabled.value,
  },
  input8: '输入框8',
  checkbox1: {
    type: "checkbox",
    label: '复选框1',
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
  },
  checkbox2: {
    type: "checkbox",
    label: '复选框2',
    options: [
      { label: "选项1", value: "1" },
      { label: "选项2", value: "2" },
    ],
    value: ["1"],
  },
}
</script>

<template>
  <div class="container">
    <main>
      <t-tabs v-model="tabs" theme="card">
        <t-tab-panel value="tdesign" label="tdesign">
          <TDesignJsonForm :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </TDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="element" label="element">
          <ElementPlusJsonForm :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </ElementPlusJsonForm>
        </t-tab-panel>
        <t-tab-panel value="ant-design" label="ant-design">
          <AntDesignJsonForm :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </AntDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="acro-design" label="acro-design">
          <AcroDesignJsonForm :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </AcroDesignJsonForm>
        </t-tab-panel>
      </t-tabs>
    </main>
    <aside>
      <t-form label-align="top">
        <t-form-item label="layout">
          <t-select v-model="layout" clearable>
            <t-option value="horizontal">horizontal</t-option>
            <t-option value="vertical">vertical</t-option>
            <t-option value="inline">inline</t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="disabled">
          <t-select v-model="disabled" clearable>
            <t-option :value="1">true</t-option>
            <t-option :value="0">false</t-option>
          </t-select>
        </t-form-item>
      </t-form>
    </aside>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  max-width: 1440px;
  margin: 20px auto;
}
.container main {
  flex: 1;
}
.container aside {
  width: 200px;
  margin-left: 20px;
}
</style>
