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

import { InputField, Model, TextField, Inputs } from "../types";

export const getInputField = (inputField: InputField) => {
  if (typeof inputField === "string") {
    return {
      label: inputField.replace(/\*/g, ""),
      required: /\*/.test(inputField),
      type: "text",
    } as TextField;
  }

  return inputField;
};

export const getInputs = (inputs: Inputs, model: Model) => {
  const rtv: Record<string, Exclude<InputField, string>> = {};

  for (const key in inputs) {
    rtv[key] = getInputField(inputs[key]);
    model[key] = model[key] ?? rtv[key].value;
  }

  return rtv;
};
