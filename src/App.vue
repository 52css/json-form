<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout } from './packages/index.ts';

const tabs = ref('tdesign')
const layout = ref<Layout>('vertical')
const disabled = ref(false)
const oneDisabled = ref(true)
// const submission = ref(false)
const span = ref(12)
const oneSpan = ref(12)

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
    label: "通过type生成"
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
    disabled: () => !!oneDisabled.value,
  },
  input7: {
    type: "text",
    label: "禁用是异步函数",
    disabled: async () => !!oneDisabled.value,
  },
  input8: '自定义插槽',
  "obj.input9": {
    type: "text",
    label: "支持对象属性",
  },
  input10: {
    type: 'text',
    label: "span默认12",
    span: () => oneSpan.value
  }
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
          <TDesignJsonForm :model="model" :inputs="inputs" :layout="layout" :disabled="disabled" :span="span">
            <template #input8>
              这个是input8
            </template>
          </TDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="element" label="element">
          <ElementPlusJsonForm :model="model" :inputs="inputs" :layout="layout" :disabled="disabled" :span="span">
            <template #input8>
              这个是input8
            </template>
          </ElementPlusJsonForm>
        </t-tab-panel>
        <t-tab-panel value="ant-design" label="ant-design">
          <AntDesignJsonForm :model="model" :inputs="inputs" :layout="layout" :disabled="disabled" :span="span">
            <template #input8>
              这个是input8
            </template>
          </AntDesignJsonForm>
        </t-tab-panel>
        <t-tab-panel value="acro-design" label="acro-design">
          <AcroDesignJsonForm :model="model"  :inputs="inputs" :layout="layout" :disabled="disabled" :span="span">
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
          <t-switch v-model="disabled" />
        </t-form-item>
        <t-form-item label="oneDisabled">
          <t-switch v-model="oneDisabled" />
        </t-form-item>
        <!-- <t-form-item label="submission">
          <t-switch v-model="submission" />
        </t-form-item> -->
        <t-form-item label="span">
          <t-slider v-model="span" :min="1" :max="12" :marks="[2, 3, 4, 6, 12]" />
        </t-form-item>
        <t-form-item label="oneSpan">
          <t-slider v-model="oneSpan" :min="1" :max="12" :marks="[2, 3, 4, 6, 12]" />
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
