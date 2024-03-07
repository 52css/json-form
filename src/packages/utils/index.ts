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

import { CommonInput, Model, InputField, Inputs, Layout } from "../types";

export const getCommonInput = (commonInput: CommonInput) => {
  if (typeof commonInput === "string") {
    return {
      label: commonInput.replace(/\*/g, ""),
      required: /\*/.test(commonInput),
      type: "input",
    } as InputField;
  }

  return commonInput;
};

export const getInputsByInputs = (inputs: Inputs, model: Model) => {
  const rtv: Record<string, Exclude<CommonInput, string>> = {};

  for (const key in inputs) {
    rtv[key] = getCommonInput(inputs[key]);
    model[key] = model[key] ?? rtv[key].value;
  }

  return rtv;
};

export const getLabelAlignByLayout = (layout?: Layout) => {
  return layout === "vertical" ? "top" : "right";
};

export const getLayoutByLayout = (layout?: Layout) => {
  return layout === "inline" ? "inline" : "vertical";
};
