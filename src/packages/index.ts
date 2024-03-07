import type { App } from "vue";
import { TDesignJsonForm } from "./TDesignJsonForm";
import { ElementPlusJsonForm } from "./ElementPlusJsonForm";
import { AntDesignJsonForm } from "./AntDesignJsonForm";

export * from "./types";
export * from "./utils";

const components: any[] = [TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm];
const install = (app: App) => {
  components.forEach((component) => app.component((component.name, component)));
};
export { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm };
export default {
  install,
  ...components,
};
