# JsonForm json表单

开发中台大部分都是和表单交互，如何通过简单、通用配置得到易交互的表单呢？

## 如何通用？

目前市面上的UI框架很多，例如 element-plus、ant-design-vue、arco-design、tdesign，各自有相应的api，如何通用的？

~~所有的属性我们使用html标签已有特有属性，我们主要符合html标准，再各自统一就可以达到我们的目的。~~ 映射太复杂，直接type是相应组件。例如 `t-input-number` 对应的 type 就是 `input-number`

## 如何简单？

我们目前常用有3个场景

1. 新建表单
2. 编辑表单
3. 搜索（查询表单 + 表格展示）

以下表单元素`fields` 命名成 `inputs`

### 新建表单

* inputs (表单元素)
* request (请求)

### 编辑表单

* model (数据)
* inputs (表单元素)
* request (请求)

### 搜索

* inputs (表单元素)
* request (请求)
* columns (表格展示)

## 考虑兼容性

* 提交表单有默认值，可以`inputField` 增加 `value` 为默认值
* `select` 常见不单提交`value`，还有`label` 或 `其他`属性？可以`inputField` 增加 `outputs`
* `inputField` 定义成数组还是对象？对象只要不是“数字”是可以排序的，目前提交都不是数字，可以使用`对象`
* 如果提交的key不是原始类型，例如提交是 `test.id` , 可以对key兼容处理支持 `test.id`: `field配置`
* 如果`必填`，可以设置 label 后面加 `*`，也可以`inputField` 增加 `required` 属性
* 常用的input，可以设置 `inputField` 支持 `string`
* 常用是计算方式，可以修改成 `getter` 函数，对于 `inputs` 就是普通函数，如果数据是异步获取, 可以修改成`异步函数`
* 增加自定义`slot`，优先级高于定义类型

通过以上考虑，可以定义类型

```typescript
export type CommonValue = string | number | boolean;

export interface CommonField {
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  outputs?: Record<string, any>;
}

export interface CommonOption {
  label: string;
  value: CommonValue;
}

export interface TextField extends CommonField {
  type: "text";
  placeholder?: string;
  maxlength?: number;
  clearable?: boolean;
  value?: CommonValue;
}

export interface CheckboxField extends CommonField {
  type: "checkbox";
  options: CommonOption[];
  value?: CommonValue[];
}

export type Inputs = Record<string, string | TextField | CheckboxField>;

export interface JsonFormProps {
  inputs: Inputs;
  request: Request;
  model?: Record<string, any>;
}

const inputs: Inputs = {
  input1: "普通输入框",
  input2: "支持必填*",
  input3: {
    type: "input",
    label: "通过type生成",
  },
  input4: {
    type: "input",
    label: "支持默认值",
    value: "默认值",
  },
  input5: {
    type: "input",
    label: "支持禁用",
    disabled: true,
  },
  input6: {
    type: "input",
    label: "禁用是同步函数",
    disabled: () => !!disabled.value,
  },
  input7: {
    type: "input",
    label: "禁用是异步函数",
    disabled: async () => !!disabled.value,
  },
  input8: '自定义插槽',
  "obj.input9": {
    type: "input",
    label: "支持对象属性",
  },
};

```

## 框架支持

- [ ] 支持tdesign、element-plus、ant-design-vue、acro-design
- [ ] 支持组件动态注入
- [ ] 支持插入场景（页面、抽屉、弹窗）
- [ ] 支持表单形式（普通表单、步骤条、左边导航、头部导航）


## Prop支持

- [x] 支持自定义slot
- [x] 支持`layout` 布局, 可设置`horizontal`, `vertical`, `inline`
- [x] 支持span分栏（全局和单个）
- [x] 支持disabled禁用(全局和单个)

## Inputs支持

- [x] 支持attrValue.`if`, 控制显示隐藏
- [x] 支持attrValue=`字符串`，转换成`input`对象
- [x] 支持attrValue.`label`，带星号必填，其他转换成`label`
- [x] 支持attrValue.`*`, 所有的属性`透传`到组件, `t-input` 响应的`label` 转换成属性`prefix`
- [x] 支持attrValue.`*`，支持`string`, `function` 转换成 `getter function`, `async function` 转换成 `响应式数据`
- [x] 支持attrValue.type=`tabs`，`嵌套`表单，支持错误`校验`
- [ ] 支持attrValue.`outputs`控制输出转换
- [ ] 支持attrValue.type=`title`实现标题
- [ ] 支持attrValue.type=`steps`，`步骤`表单
- [ ] 支持attrValue.`request` 提交表单
- [ ] 支持attrValue.`request` + `columns` 请求搜索，并且渲染表格

## Form表单映射

| 属性                        | tdesign                               | element-plus                          | ant-design         | acro-design        |
|---------------------------|---------------------------------------|---------------------------------------|--------------------|--------------------|
| 绑定数据(model)             | data                                  | model                                 | model              | model              |
| 对齐方式(layout-horizontal) | label-align(right) + layout(vertical) | label-position(right) + inline(false) | layout(horizontal) | layout(horizontal) |
| 对齐方式(layout-vertical)   | label-align(top) + layout(vertical)   | label-position(top) + inline(false)   | layout(vertical)   | layout(vertical)   |
| 对齐方式(layout-inline)     | label-align(right) + layout(inline)   | label-position(right) + inline(true)  | layout(inline)     | layout(inline)     |

## FormItem表单映射

| 属性     | tdesign | element-plus | ant-design | acro-design |
|--------|---------|--------------|------------|-------------|
| 绑定属性 | data    | prop         | name       | field       |

## Input表单映射

| 属性       | tdesign | element-plus | ant-design | acro-design |
|----------|---------|--------------|------------|-------------|
| prefix属性 | label   | -            | -          | -           |