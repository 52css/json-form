// import { computed } from "vue";

// export function useComputed(fn) {
//   const cache = new Map();

//   function getCache(args) {
//     return cache.get(JSON.stringify(args));
//   }

//   return function (...args) {
//     const cacheResult = getCache(args);

//     if (cacheResult) {
//       return cacheResult;
//     }
//     const result = computed(() => fn(...args));
//     cache.set(JSON.stringify(args), cacheResult);

//     return result;
//   };
// }
import { get } from "lodash";
import {
  type CommonInput,
  type Model,
  type Inputs,
  type Layout,
  type CommonValue,
  type CommonOption,
} from "../types";

export interface Field {
  if?: (x?: Model) => boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  outputs?: Record<string, any>;
  span?: number;
  type?: string;
  value?: CommonValue | CommonValue[];
  [key: string]: any; // 添加索引签名
}

/** 判断是否是promise */
export const isPromise = (obj: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const AsyncFunction = (async () => {}).constructor;
  return obj instanceof Promise || obj instanceof AsyncFunction === true;
};
// type PromiseType<T> = T extends Promise<infer P> ? P : never;

export const getCommonInput = (commonInput: CommonInput, model: Model) => {
  // console.log('getCommonInput', commonInput, model)
  if (typeof commonInput === "string") {
    return reactive<Field>({
      label: commonInput.replace(/\*/g, ""),
      required: /\*/.test(commonInput),
      type: "input",
      placeholder: "请输入",
      clearable: true,
      filterable: true,
    });
  }

  const rtv = reactive<Field>({});

  for (const [key, val] of Object.entries(commonInput)) {
    rtv[`_${key}`] = val;

    if (/^on/.test(key)) {
      continue;
    }

    if (isPromise(val)) {
      val(model).then((res: any) => {
        rtv[key] = res;
      });
    } else {
      Object.defineProperty(rtv, key, {
        get() {
          return typeof val === "function" ? val(model) : val;
        },
        // 设置可枚举，可以用直接 v-bind 绑定所有属性
        enumerable: true,
      });
    }
  }

  return rtv;
};

export const getInputsByInputs = (
  inputs: Inputs,
  model: Model,
  defaultModel: Model
) => {
  const rtv: Record<string, Field> = {};

  for (const [key, val] of Object.entries(inputs)) {
    rtv[key] = getCommonInput(val, model);

    // 判断多选是数组，其他是 undefined
    const isArray =
      rtv[key].type === "checkbox-group" ||
      rtv[key].type === "tree-select" ||
      rtv[key].type === "date-range-picker" ||
      rtv[key].type === "time-range-picker" ||
      (rtv[key].type === "select" && rtv[key].multiple);
    const defaultValue = isArray ? [] : undefined;
    const newVal = get(model, key) ?? rtv[key].value ?? defaultValue;

    model[key] = newVal;
    defaultModel[key] = newVal;
  }

  return rtv;
};

export const getLabelAlignByLayout = (layout: Layout = "vertical") => {
  return ["vertical"].includes(layout) ? "top" : "right";
};

export const getLayoutByLayout = (layout: Layout = "vertical") => {
  return ["inline"].includes(layout) ? "inline" : "vertical";
};

export const getOption = (
  val: CommonValue | CommonValue[],
  options: CommonOption[]
) => {
  if (Array.isArray(val)) {
    return options.filter((option) => val.includes(option.value));
  }

  return options.find((option) => option.value === val);
};

export const setOutputs = (model: Model, inputField: Field, args: any[]) => {
  if (!inputField.outputs) {
    return;
  }
  const value = args[0];
  for (const [key, val] of Object.entries(inputField.outputs)) {
    if (value) {
      const optionItem = getOption(value, inputField.options);
      model[key] =
        typeof val === "function"
          ? val(model, ...args)
          : get(optionItem, val as string);
    } else {
      // 设置model的变量为undefined
      model[key] = undefined;
    }
  }
};
