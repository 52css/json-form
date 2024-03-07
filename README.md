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

export interface InputField extends CommonField {
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

export type Inputs = Record<string, string | InputField | CheckboxField>;

export interface JsonFormProps {
  inputs: Inputs;
  request: Request;
  model?: Record<string, any>;
}

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
};

```

## TODO

- [ ] AutoComplete 自动完成
- [ ] Cascader 级联选择
- [x] Checkbox 多选框
- [ ] DatePicker 日期选择框
- [x] Input 输入框
- [ ] InputNumber 数字输入框
- [ ] Mentions 提及
- [ ] Radio 单选框
- [ ] Rate 评分
- [ ] Select 选择器
- [ ] Slider 滑动输入条
- [ ] Switch 开关
- [ ] TimePicker 时间选择框
- [ ] Transfer 穿梭框
- [ ] TreeSelect 树选择
- [ ] Upload 上传

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