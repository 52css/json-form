<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout, type Model } from './packages/index.ts';

const componentMap = {
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
}
const configModel = ref({
  component: 'TDesignJsonForm',
  layout: 'vertical' as Layout,
  disabled: false,
  oneDisabled: true,
  span: 12,
  oneSpan: 12
})
const configInputs = ref<Inputs>({
  component: {
    label: '组件',
    type: 'select',
    options: [
      { value: 'TDesignJsonForm', label: 'tdesign' },
      { value: 'ElementPlusJsonForm', label: 'element' },
      { value: 'AntDesignJsonForm', label: 'ant-design' },
      { value: 'AcroDesignJsonForm', label: 'acro-design' },
    ],
  },
  layout: {
    label: '布局',
    type: 'select',
    options: [
      { label: 'horizontal', value: 'horizontal' },
      { label: 'vertical', value: 'vertical' },
      { label: 'inline', value: 'inline' },
    ],
  },
  disabled: {
    label: '全局禁用',
    type: 'switch',
    span: 6,
  },
  oneDisabled: {
    label: '单独禁用',
    type: 'switch',
    span: 6,
  },
  span: {
    label: '全局span',
    type: 'slider',
    min: 1,
    max: 12,
    marks: [2, 3, 4, 6, 12],
  },
  oneSpan: {
    label: '单独span',
    type: 'slider',
    min: 1,
    max: 12,
    marks: [2, 3, 4, 6, 12],
  }
})

const model = ref({
  obj: {
    input9: 99
  }
})
const inputs: Inputs = {
  // input1: "普通输入框",
  // input2: "支持必填*",
  // input3: {
  //   type: "input",
  //   label: "通过type生成",
  //   placeholder: "请输入a试试",
  // },
  // input4: {
  //   if: (x: any) => x.input3 !== "a",
  //   type: "input",
  //   label: "支持默认值",
  //   value: "默认值",
  // },
  // input5: {
  //   type: "input",
  //   label: "支持禁用",
  //   disabled: true,
  // },
  // input6: {
  //   type: "input",
  //   label: "禁用是同步函数",
  //   disabled: () => !!configModel.value.oneDisabled,
  // },
  // input7: {
  //   type: "input",
  //   label: "禁用是异步函数",
  //   disabled: async () => !!configModel.value.oneDisabled,
  // },
  // input8: '自定义插槽',
  // "obj.input9": {
  //   type: "input",
  //   label: "支持对象属性",
  // },
  // input10: {
  //   type: 'input',
  //   label: "span默认12",
  //   span: () => configModel.value.oneSpan
  // },
  tabs: {
    type: 'tabs',
    value: '1',
    theme: 'card',
    options: [
      {
        label: '学生1',
        value: '1',
        inputs: {
          'tab1.input11': 'input11',
          'tab1.input12': 'input12'
        }
      },
      {
        label: '学生2',
        value: '2',
        inputs: {
          'tab2.input11': 'input11',
          'tab2.input12': 'input12*',
          'tab2.input13': '自定义插槽'
        }
      },
    ],
  },
  input14: {
    type: 'input',
    label: '支持onChange',
    onChange(model: Model, val: any) {
      console.log('val', model, val)
    }
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
      <!-- {{ model }} -->
      <component
        :is="componentMap[configModel.component as keyof typeof componentMap]"
        :model="model"
        :inputs="inputs"
        :layout="configModel.layout"
        :disabled="configModel.disabled"
        :span="configModel.span"
      >
        <template #tab2.input13>
          这个是input8
        </template>
      </component>
    </main>
    <aside>
      <TDesignJsonForm
        :model="configModel"
        :inputs="configInputs"
      />
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
