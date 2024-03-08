export type CommonValue = string | number | boolean;

export type CommonAttr<T> =
  | T
  | ((model?: Model) => T)
  | ((model?: Model) => Promise<T>);

export interface CommonField {
  required?: CommonAttr<boolean>;
  disabled?: CommonAttr<boolean>;
  readonly?: CommonAttr<boolean>;
  label?: CommonAttr<string>;
  outputs?: Record<string, any>;
}

export interface CommonOption {
  label: string;
  value: CommonValue;
  disabled?: boolean;
  children?: CommonOption[];
}

export interface SlotField {
  type: "slot";
}

export interface TextField extends CommonField {
  type: "text";
  placeholder?: CommonAttr<string>;
  maxlength?: CommonAttr<number>;
  clearable?: CommonAttr<boolean>;
  value?: CommonAttr<CommonValue>;
  prefix?: CommonAttr<string>;
  suffix?: CommonAttr<string>;
  // 兼容AutoComplete
  autocomplete?: CommonAttr<boolean>;
  filterable?: CommonAttr<boolean>;
  options?: CommonAttr<CommonOption[]>;
}

export interface CheckboxField extends CommonField {
  type: "checkbox";
  options: CommonAttr<CommonOption[]>;
  value?: CommonAttr<CommonValue[]>;
}

export interface SelectField extends CommonField {
  type: "select";
  placeholder?: CommonAttr<string>;
  clearable?: CommonAttr<boolean>;
  value?: CommonAttr<CommonValue | CommonValue[]>;
  filterable?: CommonAttr<boolean>;
  options?: CommonAttr<CommonOption[]>;
  multiple?: CommonAttr<boolean>;
  // cascader
  cascader?: CommonAttr<boolean>;
  // tree-select
  treeSelect?: CommonAttr<boolean>;
  data?: CommonAttr<CommonOption[]>;
}

export interface ColorField extends CommonField {
  type: "color";
  value?: CommonAttr<CommonValue>;
}

export interface DateField extends CommonField {
  type: "date";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface DateRangeField extends CommonField {
  type: "daterange";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface DateTimeField extends CommonField {
  type: "datetime";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface DateTimeRangeField extends CommonField {
  type: "datetimerange";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface YearField extends CommonField {
  type: "year";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface MonthField extends CommonField {
  type: "month";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface QuarterField extends CommonField {
  type: "quarter";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface WeekField extends CommonField {
  type: "week";
  value?: CommonAttr<CommonValue>;
  clearable?: CommonAttr<boolean>;
  allowInput?: CommonAttr<boolean>;
}

export interface NumberField extends CommonField {
  type: "number";
  value?: CommonAttr<CommonValue>;
  min?: CommonAttr<number>;
  max?: CommonAttr<number>;
  step?: CommonAttr<number>;
  precision?: CommonAttr<number>;
  prefix?: CommonAttr<string>;
  suffix?: CommonAttr<string>;
}

export interface RadioField extends CommonField {
  type: "radio";
  options: CommonAttr<CommonOption[]>;
  value?: CommonAttr<CommonValue[]>;
}

export interface InputRangeField extends CommonField {
  type: "inputrange";
  value?: CommonAttr<CommonValue[]>;
}

export interface RangeField extends CommonField {
  type: "range";
  value?: CommonAttr<CommonValue>;
}

export interface RangeField extends CommonField {
  type: "range";
  value?: CommonAttr<CommonValue>;
}

export interface SwitchField extends CommonField {
  type: "switch";
  value?: CommonAttr<CommonValue>;
}

export interface TextareaField extends CommonField {
  type: "textarea";
  value?: CommonAttr<CommonValue>;
  placeholder?: CommonAttr<string>;
  maxlength?: CommonAttr<number>;
  clearable?: CommonAttr<boolean>;
  autosize?: CommonAttr<{ minRows?: number, maxRows?: number }>
}

export interface TransferField extends CommonField {
  type: 'transfer',
  value?: CommonAttr<CommonValue[]>;
  data?: CommonAttr<CommonOption[]>;
}

export interface TimeField extends CommonField {
  type: 'time',
  value?: CommonAttr<CommonValue>;
}

export interface TimeRangeField extends CommonField {
  type: 'timerange',
  value?: CommonAttr<CommonValue[]>;
}

export type CommonInput =
  | string
  | SlotField
  | TextField
  | CheckboxField
  | SelectField
  | ColorField
  | DateField
  | DateRangeField
  | DateTimeField
  | DateTimeRangeField
  | YearField
  | MonthField
  | QuarterField
  | WeekField
  | NumberField
  | RadioField
  | InputRangeField
  | RangeField
  | SwitchField
  | TextareaField
  | TransferField
  | TimeField
  | TimeRangeField;

export type Inputs = Record<string, CommonInput>;
export type Model = Record<string, CommonValue>;
export type Layout = "horizontal" | "vertical" | "inline";

export interface JsonFormProps {
  inputs?: Inputs;
  layout?: Layout;
  disabled?: boolean;
  request?: Request;
  model?: Model;
}

export const JsonFormDefault = {
  layout: "vertical" as Layout,
  model: () => {
    return {};
  },
};
