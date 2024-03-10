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
  CommonInput,
  Model,
  Inputs,
  Layout,
  CommonValue,
  CommonOption,
} from "../types";

export interface Field {
  type?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  clearable?: boolean;
  filterable?: boolean;
  value?: CommonValue;
  disabled?: boolean;
  outputs?: Record<string, any>;
  options?: (CommonOption & {
    inputs: Record<string, Field>
  })[];
  autocomplete?: boolean;
  maxlength?: number;
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
  if (typeof commonInput === "string") {
    return reactive<Field>({
      label: commonInput.replace(/\*/g, ""),
      required: /\*/.test(commonInput),
      type: "text",
      placeholder: "请输入",
      clearable: true,
      filterable: true,
    });
  }

  const rtv = reactive<Field>({});

  for (const [key, val] of Object.entries(commonInput)) {
    rtv[`$${key}`] = val;
    if (isPromise(val)) {
      val(model).then((res: any) => {
        rtv[key] = res;
      });
    } else {
      Object.defineProperty(rtv, key, {
        get() {
          return typeof val === "function" ? val(model) : val;
        },
      });
    }
  }

  return rtv;
};

export const getInputsByInputs = (inputs: Inputs, model: Model) => {
  const rtv: Record<string, Field> = {};

  for (const [key, val] of Object.entries(inputs)) {
    rtv[key] = getCommonInput(val, model);

    const defaultValue = rtv[key].type === 'group' ? {} : undefined

    model[key] = get(model, key) ?? rtv[key].value ?? defaultValue;
  }

  return rtv;
};

export const getLabelAlignByLayout = (layout: Layout) => {
  return ["vertical"].includes(layout) ? "top" : "right";
};

export const getLayoutByLayout = (layout: Layout) => {
  return ["inline"].includes(layout) ? "inline" : "vertical";
};
