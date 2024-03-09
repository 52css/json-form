# JsonForm json表单

开发中台大部分都是和表单交互，如何通过简单、通用配置得到易交互的表单呢？

## 如何通用？

目前市面上的UI框架很多，例如 element-plus、ant-design-vue、arco-design、tdesign，各自有相应的api，如何通用的？

所有的属性我们使用html标签已有特有属性，我们主要符合html标准，再各自统一就可以达到我们的目的。

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
};

```

## 框架TODO

- [ ] 支持tdesign、element-plus、ant-design-vue、acro-design
- [ ] 支持组件动态注入
- [ ] 支持标题
- [x] 支持inputs, 支持字符串、对象、label带星号必填、对象属性支持getter和promise、对象支持value设置默认值
- [x] 支持自定义slot
- [ ] 支持outputs
- [ ] 支持列表、表单、抽屉、弹窗场景
- [ ] 支持普通表单、步骤条、左边导航、头部导航
- [ ] 支持span分栏

### 支持普通表单、步骤条、左边导航、头部导航

```js
// 普通表单
inputs: {}

// 步骤条
steps: {
  s1: '步骤1'
},
inputs: {
  aa: {
    type: 'text',
    label: 's1.测试',
  }
}

// 左边导航
lefts: {
  l1: '基本信息'
},
inputs: {
  aa: {
    type: 'text',
    label: 'l1.测试',
  }
}

// 头部导航
tabs: {
  t1: '基本信息'
},
inputs: {
  aa: {
    type: 'text',
    label: 's1.l1.t1.基本信息',
  }
}
```

## 组件TODO

- [ ] AutoComplete 自动完成 => type="`text`" + autocomplete
- [ ] Cascader 级联选择 => type="`select`" + cascader
- [x] Checkbox 多选框 => type="`checkbox`"
- [ ] DatePicker 日期选择框 => type="`date`" type="`datetime`" type="`datetimerange`" type="`daterange`"
- [x] Input 输入框 => type="`text`" type="password"
- [ ] InputNumber 数字输入框 => type="`number`"
- [ ] Radio 单选框 => type="`radio`"
- [ ] Rate 评分 => type="`rate`"
- [ ] Select 选择器 => type="`select`"
- [ ] Slider 滑动输入条 => type="`range`"
- [ ] Switch 开关 => type="`switch`"
- [ ] TimePicker 时间选择框 => type="`time`" type="`timerange`"
- [ ] Transfer 穿梭框 => type="`transfer`"
- [ ] TreeSelect 树选择 => type="`select`" + treeSelect
- [ ] Upload 上传 => type="`file`" type="`image`"

## Form表单映射

| 属性                        | tdesign                               | element-plus                          | ant-design         | acro-design           |
|---------------------------|---------------------------------------|---------------------------------------|--------------------|-----------------------|
| 绑定数据(model)             | data                                  | model                                 | model              | model                 |
| 对齐方式(layout-horizontal) | label-align(right) + layout(vertical) | label-position(right) + inline(false) | layout(horizontal) | layout(horizontal) |
| 对齐方式(layout-vertical)   | label-align(top) + layout(vertical)   | label-position(top) + inline(false)   | layout(vertical)   | layout(vertical)   |
| 对齐方式(layout-inline)     | label-align(right) + layout(inline)   | label-position(right) + inline(true)  | layout(inline)     | layout(inline)     |

## FormItem表单映射

| 属性     | tdesign | element-plus | ant-design | acro-design |
|--------|---------|--------------|------------|-------------|
| 绑定属性 | data    | prop         | name       | field       |