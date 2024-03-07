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

export type InputField = string | TextField | CheckboxField;
export type Inputs = Record<string, InputField>;
export type Model = Record<string, CommonValue>;
export type Layout = 'horizontal' | 'vertical' | 'inline';

export interface JsonFormProps {
  inputs?: Inputs;
  layout?: Layout;
  request?: Request;
  model?: Model;
}

export const JsonFormDefault = {
  layout: 'vertical' as Layout,
  model: () => {
    return {};
  }
}