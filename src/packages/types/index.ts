export type CommonValue = string | number | boolean;

export type CommonAttr<T> = T | ((model?: Model) => T) | ((model?: Model) => Promise<T>);

export type CommonAttr2<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => Promise<infer P1> ? P1 : T[P] extends (...args: any[]) => infer P2 ? P2 : T[P];
};

// type b = CommonAttr2<CommonAttr<boolean>>

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
}

export interface TextField extends CommonField {
  type: "text";
  placeholder?: CommonAttr<string>;
  maxlength?: CommonAttr<number>;
  clearable?: CommonAttr<boolean>;
  value?: CommonAttr<CommonValue>;
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

export type CommonInput = string | TextField | CheckboxField;
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
