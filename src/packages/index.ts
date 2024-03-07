import type { App } from "vue";
import { TDesignJsonForm } from "./TDesignJsonForm";

const components: any[] = [TDesignJsonForm];
const install = (app: App) => {
  components.forEach((component) => app.component((component.name, component)));
};
export { TDesignJsonForm };
export default {
  install,
  ...components,
};
