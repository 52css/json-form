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
