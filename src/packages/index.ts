import type { App } from "vue";
import { TDesignJsonForm } from "./TDesignJsonForm";
import { ElementPlusJsonForm } from "./ElementPlusJsonForm";
import { AntDesignJsonForm } from "./AntDesignJsonForm";
import { AcroDesignJsonForm } from "./AcroDesignJsonForm";

import '@arco-design/web-vue/dist/arco.css';

export * from "./types";
export * from "./utils";

const components: any[] = [TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm];
const install = (app: App) => {
  components.forEach((component) => app.component((component.name, component)));
};
export { TDesignJsonForm, ElementPlusJsonForm, AntDesignJsonForm, AcroDesignJsonForm };
export default {
  install,
  ...components,
};
