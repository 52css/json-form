<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout } from './packages/index.ts';

const tabs = ref('tdesign')
const layout = ref<Layout>('vertical')
const disabled = ref(1)

const model = ref({
  obj: {
    input9: 99
  }
})
const inputs: Inputs = {
  input1: "普通输入框",
  input2: "支持必填*",
  input3: {
    type: "text",
    label: "通过type生成",
  },
  input4: {
    type: "text",
    label: "支持默认值",
    value: "默认值",
  },
  input5: {
    type: "text",
    label: "支持禁用",
    disabled: true,
  },
  input6: {
    type: "text",
    label: "禁用是同步函数",
    disabled: () => !!disabled.value,
  },
  input7: {
    type: "text",
    label: "禁用是异步函数",
    disabled: async () => !!disabled.value,
  },
  input8: '自定义插槽',
  "obj.input9": {
    type: "text",
    label: "支持对象属性",
  },
  // checkbox1: {
  //   type: "checkbox",
  //   label: '复选框1',
  //   options: [
  //     { label: "选项1", value: "1" },
  //     { label: "选项2", value: "2" },
  //   ],
  // },
  // checkbox2: {
  //   type: "checkbox",
  //   label: '复选框2',
  //   options: [
  //     { label: "选项1", value: "1" },
  //     { label: "选项2", value: "2" },
  //   ],
  //   value: ["1"],
  // },
}
</script>

<template>
  <div class="container">
    <main>
      <t-tabs v-model="tabs" theme="card">
        <t-tab-panel value="tdesign" label="tdesign">
          <TDesignJsonForm :model="model" :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </TDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="element" label="element">
          <ElementPlusJsonForm :model="model" :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </ElementPlusJsonForm>
        </t-tab-panel>
        <t-tab-panel value="ant-design" label="ant-design">
          <AntDesignJsonForm :model="model" :inputs="inputs" :layout="layout">
            <template #input8>
              这个是input8
            </template>
          </AntDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="acro-design" label="acro-design">
          <AcroDesignJsonForm :model="model"  :inputs="inputs" :layout="layout">
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
