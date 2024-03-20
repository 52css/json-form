<script setup lang="ts">
import { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm, type Inputs, type Layout, type Model } from './packages/index.ts';

const componentMap = {
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
}
const configModel = ref({
  type: 'formNormal', // 'listTree', // 'listRadio', // 'listCheckbox', // 'listNormal', // 'formStep', // 'formTabTop', //  'formTabLeft', // 'formNormal',
  container: 'none', // 'dialog', // 'none',
  component: 'ElementPlusJsonForm', // 'ElementPlusJsonForm', // 'TDesignJsonForm',
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
      { value: 'formNormal', label: '普通表单' },
      { value: 'formTabLeft', label: '左边导航表单' },
      { value: 'formTabTop', label: '头部导航表单' },
      { value: 'formStep', label: '步骤条表单' },
      { value: 'listNormal', label: '普通列表' },
      { value: 'listCheckbox', label: '多选列表' },
      { value: 'listRadio', label: '单选列表' },
      { value: 'listTree', label: '树形列表' },
    ],
  },
  title: {
    type: 'title',
    label: '属性',
  },
  container: {
    label: '容器',
    type: 'select',
    options: [
      { label: '页面', value: 'none' },
      { label: '弹窗', value: 'dialog' },
      { label: '抽屉', value: 'drawer' },
    ],
    onChange: (m: any) => {
      visible.value = m.container !== 'none'
    }
  },
  layout: {
    label: '布局',
    type: 'select',
    options: [
      { label: '横向', value: 'horizontal' },
      { label: '纵向', value: 'vertical' },
      { label: '行内', value: 'inline' },
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

const visible = ref(true)
const selectedRowKeys = ref([])

const formData = ref({
  formNormal: {
    model: {},
    inputs: {
      input1: '普通输入框*',
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
      slot1: {
        type: 'slot',
        label: '自定义插槽', // 如果不要label，可以设置为''
      },
    },
    request: (model: Model) => {
      return new Promise((resolve, reject) => {
        console.log('正在请求model', model)
        setTimeout(() => {
          resolve(true)
        }, 200)
      })
    }
  },
  formTabLeft: {
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
              slot1: {
                type: 'slot',
                label: '自定义插槽', // 如果不要label，可以设置为''
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
  formTabTop: {
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
              slot1: {
                type: 'slot',
                label: '自定义插槽', // 如果不要label，可以设置为''
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
  },
  formStep: {
    inputs: {
      step: {
        type: 'steps',
        value: '1',
        options: [
          {
            label: '基本信息',
            value: '1',
            inputs: {
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
              slot1: {
                type: 'slot',
                label: '自定义插槽', // 如果不要label，可以设置为''
              },
            },
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
    },
  },
  listNormal: {
    inputs: {
      input1: '普通输入框',
    },
    request: (x: any) => {
      return new Promise((resolve) => {
        console.log('正在请求model', x)
        setTimeout(() => {
          resolve({
            total: 100,
            rows: Array(x.pageSize).fill(0).map((_, index) => {
              index = index + x.pageSize * (x.current - 1);
              return {
                id: index,
                name: `name${index}`,
                age: 18 + index,
                address: `address${index}`,
              }
            })
          })
        }, 200)
      })
    },
    columns: {
      id: '序号',
      name: '姓名',
      age: '年龄',
      address: '地址',
    }
  },
  listCheckbox: {
    inputs: {
      input1: '普通输入框',
    },
    request: (x: any) => {
      return new Promise((resolve) => {
        console.log('正在请求model', x)
        setTimeout(() => {
          resolve({
            total: 100,
            rows: Array(x.pageSize).fill(0).map((_, index) => {
              index = index + x.pageSize * (x.current - 1);
              return {
                id: index,
                name: `name${index}`,
                age: 18 + index,
                address: `address${index}`,
              }
            })
          })
        }, 200)
      })
    },
    columns: {
      $multiple: true,
      id: '序号',
      name: '姓名',
      age: '年龄',
      address: '地址',
    }
  },
  listRadio: {
    inputs: {
      input1: '普通输入框',
    },
    request: (x: any) => {
      return new Promise((resolve) => {
        console.log('正在请求model', x)
        setTimeout(() => {
          resolve({
            total: 100,
            rows: Array(x.pageSize).fill(0).map((_, index) => {
              index = index + x.pageSize * (x.current - 1);
              return {
                id: index,
                name: `name${index}`,
                age: 18 + index,
                address: `address${index}`,
              }
            })
          })
        }, 200)
      })
    },
    columns: {
      $single: true,
      id: '序号',
      name: '姓名',
      age: '年龄',
      address: '地址',
    }
  },
  listTree: {
    inputs: {
      input1: '普通输入框',
    },
    request: (x: any) => {
      return new Promise((resolve) => {
        console.log('正在请求model', x)
        setTimeout(() => {
          resolve({
            total: 100,
            rows: Array(x.pageSize).fill(0).map((_, index) => {
              index = index + x.pageSize * (x.current - 1);
              return {
                id: index,
                name: `name${index}`,
                age: 18 + index,
                address: `address${index}`,
                children: index === 3 ? Array(3).fill(0).map((_, index) => {
                  index = index + x.pageSize * (x.current - 1);
                  return {
                    id: index,
                    name: `name${index}`,
                    age: 18 + index,
                    address: `address${index}`,
                  }
                }) : undefined
              }
            })
          })
        }, 200)
      })
    },
    columns: {
      id: '序号',
      name: '姓名',
      age: '年龄',
      address: '地址',
    },
    tree: {
      childrenKey: 'children'
    }
  },
})
</script>

<template>
  <div class="container">
    <main>
      <!-- 选中的行: {{ selectedRowKeys }} -->
      <!-- {{ formData.normal.model }} -->
      <component
        :is="componentMap[configModel.component as keyof typeof componentMap]"
        v-bind="(formData[configModel.type as keyof typeof formData] as any)"
        v-model:selectedRowKeys="selectedRowKeys"
        v-model:visible="visible"
        :layout="configModel.layout"
        :disabled="configModel.disabled"
        :span="configModel.span"
        :key="configModel.type"
        :container="configModel.container"
        @close="configModel.container = 'none'"
        size="600px"
      >
        <template #slot1>
          我是自定义插槽
        </template>
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
  margin: 0 auto;
  padding: 20px 0;
  height: 100vh;
  overflow: hidden;
}
.container main {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.container aside {
  width: 200px;
  margin-left: 20px;
  height: 100%;
}
</style>
