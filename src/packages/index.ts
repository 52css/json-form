import type { App } from "vue";
import { TDesignJsonForm } from "./TDesignJsonForm";
import { ElementPlusJsonForm } from "./ElementPlusJsonForm";

export * from "./types";
export * from "./utils";

const components: any[] = [TDesignJsonForm, ElementPlusJsonForm];
const install = (app: App) => {
  components.forEach((component) => app.component((component.name, component)));
};
export { TDesignJsonForm, ElementPlusJsonForm };
export default {
  install,
  ...components,
};
