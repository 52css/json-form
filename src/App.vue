<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout, type Model, type Request } from './packages/index.ts';

const componentMap = {
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
}
const configModel = ref({
  type: 'tabLeft', // 'normal',
  component: 'TDesignJsonForm',
  layout: 'vertical' as Layout,
  disabled: false,
  // oneDisabled: true,
  span: 12,
  // oneSpan: 12
})
const configInputs = ref<Inputs>({
  type: {
    label: '表单类型',
    type: 'select',
    options: [
      { value: 'normal', label: '普通表单' },
      { value: 'step', label: '步骤条', disabled: true },
      { value: 'tabLeft', label: '左边导航' },
      { value: 'tabTop', label: '头部导航' },
    ],
  },
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
  // oneDisabled: {
  //   label: '单独禁用',
  //   type: 'switch',
  //   span: 6,
  // },
  span: {
    label: '全局span',
    type: 'slider',
    min: 1,
    max: 12,
    marks: [2, 3, 4, 6, 12],
  },
  // oneSpan: {
  //   label: '单独span',
  //   type: 'slider',
  //   min: 1,
  //   max: 12,
  //   marks: [2, 3, 4, 6, 12],
  // }
})

const formData = ref({
  normal: {
    model: {},
    inputs: {
      title1: {
        type: 'title',
        label: '基本信息',
        span: 12,
      },
      input1: '普通输入框',
      select1: {
        type: 'select',
        label: '下拉框',
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      },
      cascader1: {
        type: 'cascader',
        label: '级联选择',
        options: [
          {
            label: '选项一',
            value: '1',
            children: [
              { label: '子选项一', value: '1.1' },
              { label: '子选项二', value: '1.2' },
            ],
          },
          {
            label: '选项二',
            value: '2',
            children: [
              { label: '子选项三', value: '2.1' },
              { label: '子选项四', value: '2.2' },
            ],
          },
        ]
      },
      textarea1: {
        type: 'textarea',
        label: '备注/详细地址',
        maxlength: 100,
      },
      date1: {
        type: 'date-picker',
        label: '单个日期选择',
      },
      dateRange1: {
        type: 'date-range-picker',
        label: '时间段选择',
        outputs: {
          startTime: 0,
          endTime: 1
        }
      },
      radio1: {
        type: 'radio-group',
        label: '单选框',
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      },
      checkbox1: {
        type: 'checkbox-group',
        label: '多选框',
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      },
    },
    request: (model: Model) => {
      return new Promise((resolve) => {
        console.log('正在请求model', model)
        setTimeout(() => {
          resolve(true)
        }, 200)
      })
    }
  },
  tabLeft: {
    inputs: {
      tabs: {
        type: 'tabs',
        value: '1',
        placement: 'left',
        options: [
          {
            label: '基本信息',
            value: '1',
            inputs: {
              title1: {
                type: 'title',
                label: '基本信息',
                span: 12,
              },
              input1: '普通输入框',
              select1: {
                type: 'select',
                label: '下拉框',
                options: [
                  { label: "选项1", value: "1" },
                  { label: "选项2", value: "2" },
                ],
              },
              cascader1: {
                type: 'cascader',
                label: '级联选择',
                options: [
                  {
                    label: '选项一',
                    value: '1',
                    children: [
                      { label: '子选项一', value: '1.1' },
                      { label: '子选项二', value: '1.2' },
                    ],
                  },
                  {
                    label: '选项二',
                    value: '2',
                    children: [
                      { label: '子选项三', value: '2.1' },
                      { label: '子选项四', value: '2.2' },
                    ],
                  },
                ]
              },
              textarea1: {
                type: 'textarea',
                label: '备注/详细地址',
                maxlength: 100,
              },
              date1: {
                type: 'date-picker',
                label: '单个日期选择',
              },
              dateRange1: {
                type: 'date-range-picker',
                label: '时间段选择',
                outputs: {
                  startTime: 0,
                  endTime: 1
                }
              },
              radio1: {
                type: 'radio-group',
                label: '单选框',
                options: [
                  { label: "选项1", value: "1" },
                  { label: "选项2", value: "2" },
                ],
              },
              checkbox1: {
                type: 'checkbox-group',
                label: '多选框',
                options: [
                  { label: "选项1", value: "1" },
                  { label: "选项2", value: "2" },
                ],
              },
            },
            request: (model: Model) => {
              return new Promise((resolve) => {
                console.log('正在请求model', model)
                setTimeout(() => {
                  resolve(true)
                }, 200)
              })
            }
          },
          {
            label: '高级信息',
            value: '2',
            inputs: {
              'tab2.input11': 'input11',
              'tab2.input12': 'input12*',
              'tab2.input13': '自定义插槽'
            },
            request: (model: Model) => {
              return new Promise((resolve) => {
                console.log('正在请求model', model)
                setTimeout(() => {
                  resolve(true)
                }, 200)
              })
            }
          },
        ],
      },
    }
  }
})

// const model = ref({
//   obj: {
//     input9: 99
//   },
//   input1: ''
// })
// setTimeout(() => {
//   console.log('模拟接口请求完毕')
//   // 模拟接口请求完毕
//   model.value = {
//     obj: {
//       input9: 100
//     },
//     input1: '哈哈'
//   }
// }, 1000)
// const inputs: Inputs = {
//   title1: {
//     type: 'title',
//     label: '所有配置项',
//   },
//   input1: "普通输入框",
//   input2: "支持必填*",
//   input3: {
//     type: "input",
//     label: "通过type生成",
//     placeholder: "请输入a试试",
//   },
//   input4: {
//     if: (x: any) => x.input3 !== "a",
//     type: "input",
//     label: "支持默认值",
//     value: "默认值",
//   },
//   input5: {
//     type: "input",
//     label: "支持禁用",
//     disabled: true,
//   },
//   input6: {
//     type: "input",
//     label: "禁用是同步函数",
//     disabled: () => !!configModel.value.oneDisabled,
//   },
//   input7: {
//     type: "input",
//     label: "禁用是异步函数",
//     disabled: async () => !!configModel.value.oneDisabled,
//   },
//   input8: '自定义插槽',
//   "obj.input9": {
//     type: "input",
//     label: "支持对象属性",
//   },
//   input10: {
//     type: 'input',
//     label: "span默认12",
//     span: () => configModel.value.oneSpan
//   },
//   title2: {
//     type: 'title',
//     label: '支持tabs兼容对象',
//   },
//   tabs: {
//     type: 'tabs',
//     value: '1',
//     theme: 'card',
//     options: [
//       {
//         label: '学生1',
//         value: '1',
//         inputs: {
//           'tab1.input11': 'input11',
//           'tab1.input12': 'input12'
//         }
//       },
//       {
//         label: '学生2',
//         value: '2',
//         inputs: {
//           'tab2.input11': 'input11',
//           'tab2.input12': 'input12*',
//           'tab2.input13': '自定义插槽'
//         }
//       },
//     ],
//   },
//   title3: {
//     type: 'title',
//     label: '支持数据切换onChange或outputs',
//   },
//   input14: {
//     type: 'input',
//     label: '支持onChange',
//     onChange(model: Model, val: any) {
//       console.log('val', model, val)
//     }
//   },
//   select1: {
//     type: 'select',
//     label: '下拉框',
//     clearable: true,
//     options: [
//       { label: "选项1", value: "1" },
//       { label: "选项2", value: "2" },
//     ],
//     outputs: {
//       select1Label1: 'label',
//       select1Label2: (_m: Model, _val: string, content:any) => content.option.label
//     }
//   },
// }
// const request: Request = (model: Model) => {
//   return new Promise((resolve) => {
//     console.log('正在请求model', model)
//     setTimeout(() => {
//       resolve(true)
//     }, 200)
//   })
// }
</script>

<template>
  <div class="container">
    <main>
      <!-- {{ formData.normal.model }} -->
      <component
        :is="componentMap[configModel.component as keyof typeof componentMap]"
        v-bind="(formData[configModel.type as keyof typeof formData] as any)"
        :layout="configModel.layout"
        :disabled="configModel.disabled"
        :span="configModel.span"
      >
        <!-- <template #tab2.input13>
          这个是input8
        </template> -->
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
