import type { App } from "vue";
import { TDesignJsonForm } from "./TDesignJsonForm";
import { ElementPlusJsonForm } from "./ElementPlusJsonForm";
import { AntDesignJsonForm } from "./AntDesignJsonForm";
import { AcroDesignJsonForm } from "./AcroDesignJsonForm";
import { Title } from "./Title";
import { startCase, camelCase } from "lodash";

import "./index.scss";

import "@arco-design/web-vue/dist/arco.css";

export * from "./types";
export * from "./utils";

const pascalCase = (str = '') => startCase(camelCase(str)).replace(/ /g, '')

const components: any[] = [
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
];
const install = (app: App) => {
  components.forEach((component) => app.component((component.name, component)));

  registerJsonFormFieldComponent(Title);
};
export {
  TDesignJsonForm,
  ElementPlusJsonForm,
  AntDesignJsonForm,
  AcroDesignJsonForm,
};

export const registerJsonFormFieldComponents: Record<string, Component> = {};
export const registerJsonFormFieldComponent = (
  component: Component
) => {
  if (!component.name) {
    return;
  }
  const componentName = pascalCase(component.name);
  registerJsonFormFieldComponents[componentName] = component;
};

export default {
  install,
  ...components,
};
