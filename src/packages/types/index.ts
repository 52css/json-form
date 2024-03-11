export type CommonValue = string | number | boolean;

export type CommonAttr<T> =
  | T
  | ((model?: Model) => T)
  | ((model?: Model) => Promise<T>);

export type CommonOutput = string | ((model: Model, ...args: any[]) => any);

export type CommonColumn =
  | string
  | {
      if?: CommonAttr<boolean>;
      label?: CommonAttr<string>; // 映射组件的title，为了和inputs保持一致，使用label
      minWidth?: CommonAttr<number>;
      width?: CommonAttr<number>;
      align?: CommonAttr<"left" | "right" | "center">;
    };

export interface CommonField {
  if?: CommonAttr<boolean>;
  required?: CommonAttr<boolean>;
  disabled?: CommonAttr<boolean>;
  label?: CommonAttr<string>;
  outputs?: CommonAttr<Record<string, CommonOutput>>;
  span?: CommonAttr<number>;
  [key: string]: any; // 添加索引签名
}

export interface CommonOption {
  label: string;
  value: CommonValue;
  disabled?: boolean;
  children?: CommonOption[];
}

export interface AutoCompleteField extends CommonField {
  type: "auto-complete";
  value?: CommonAttr<CommonValue>;
}

export interface CascaderField extends CommonField {
  type: "cascader";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface CheckboxGroupField extends CommonField {
  type: "checkbox-group";
  value?: CommonAttr<CommonValue[]>;
}

export interface ColorPickerField extends CommonField {
  type: "color-picker";
  value?: CommonAttr<CommonValue>;
}

export interface DatePickerField extends CommonField {
  type: "date-picker";
  value?: CommonAttr<CommonValue>;
}

export interface DateRangePickerField extends CommonField {
  type: "date-range-picker";
  value?: CommonAttr<CommonValue[]>;
}

export interface InputField extends CommonField {
  type: "input";
  value?: CommonAttr<CommonValue>;
}

export interface InputAdornmentField extends CommonField {
  type: "input-adornment";
  value?: CommonAttr<CommonValue>;
}

export interface InputNumberField extends CommonField {
  type: "input-number";
  value?: CommonAttr<number>;
}

export interface TagInputField extends CommonField {
  type: "tag-input";
  value?: CommonAttr<CommonValue[]>;
}

export interface RadioGroupField extends CommonField {
  type: "radio-group";
  value?: CommonAttr<CommonValue[]>;
}

export interface RangeInputField extends CommonField {
  type: "range-input";
  value?: CommonAttr<CommonValue[]>;
}

export interface SelectField extends CommonField {
  type: "select";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface SelectInputField extends CommonField {
  type: "select-input";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface SliderField extends CommonField {
  type: "slider";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface SwitchField extends CommonField {
  type: "switch";
  value?: CommonAttr<CommonValue>;
}

export interface TextareaField extends CommonField {
  type: "textarea";
  value?: CommonAttr<CommonValue>;
}

export interface TransferField extends CommonField {
  type: "transfer";
  value?: CommonAttr<CommonValue[]>;
}

export interface TimePickerField extends CommonField {
  type: "time-picker";
  value?: CommonAttr<CommonValue>;
}

export interface TimeRangePickerField extends CommonField {
  type: "time-range";
  value?: CommonAttr<CommonValue[]>;
}

export interface TreeSelectField extends CommonField {
  type: "tree-select";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface UploadField extends CommonField {
  type: "upload";
  value?: CommonAttr<CommonValue | CommonValue[]>;
}

export interface TabsField extends CommonField {
  type: "tabs";
  value?: CommonAttr<CommonValue>;
  theme?: CommonAttr<string>;
  placement?: CommonAttr<"top" | "right" | "bottom" | "left">;
  options?: CommonAttr<
    (CommonOption & {
      inputs: Record<string, CommonInput>;
    })[]
  >;
}

export interface TitleField extends CommonField {
  type: "title";
  label: CommonAttr<string>;
}

export type CommonInput =
  | string
  | AutoCompleteField
  | CascaderField
  | CheckboxGroupField
  | ColorPickerField
  | DatePickerField
  | DateRangePickerField
  | InputField
  | InputAdornmentField
  | InputNumberField
  | TagInputField
  | RadioGroupField
  | RangeInputField
  | SelectField
  | SelectInputField
  | SliderField
  | SwitchField
  | TextareaField
  | TransferField
  | TimePickerField
  | TimeRangePickerField
  | TreeSelectField
  | UploadField
  | TabsField
  | TitleField;

export type Inputs = Record<string, CommonInput>;
export type Model = Record<string, any>;
export type Layout = "horizontal" | "vertical" | "inline";
export type Columns = Record<string, CommonColumn>;
export type Request = (model: Model) => Promise<any>;

export interface JsonFormProps {
  layout?: Layout;
  inputs?: Inputs;
  disabled?: boolean;
  request?: Request;
  model?: Model;
  // submission?: boolean;
  span?: number;
  columns?: Columns;
}

export const JsonFormDefault = {
  layout: "vertical" as Layout,
  model: () => {
    return {};
  },
  span: 12,
};
