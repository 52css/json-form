<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout, type Model } from './packages/index.ts';

const componentMap = {
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
}
const configModel = ref({
  type: 'normal', // 'tabTop', //  'tabLeft', // 'normal',
  component: 'TDesignJsonForm',
  layout: 'vertical' as Layout,
  disabled: false,
  span: 12,
})
const configInputs = ref<Inputs>({
  component: {
    label: '组件',
    type: 'select',
    options: [
      { value: 'TDesignJsonForm', label: 'tdesign' },
      { value: 'ElementPlusJsonForm', label: 'element', disabled: true },
      { value: 'AntDesignJsonForm', label: 'ant-design', disabled: true },
      { value: 'AcroDesignJsonForm', label: 'acro-design', disabled: true },
    ],
  },
  type: {
    label: '表单类型',
    type: 'select',
    options: [
      { value: 'normal', label: '普通表单' },
      { value: 'tabLeft', label: '左边导航' },
      { value: 'tabTop', label: '头部导航' },
      { value: 'step', label: '步骤条', disabled: true },
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
  span: {
    label: '全局span',
    type: 'slider',
    min: 1,
    max: 12,
    marks: [2, 3, 4, 6, 12],
  },
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
  },
  tabTop: {
    inputs: {
      tabs: {
        type: 'tabs',
        value: '1',
        theme: 'card',
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
          },
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
  }
})
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
        :key="configModel.type"
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
