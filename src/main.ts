import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Packages from "./packages";

import 'virtual:uno.css'

createApp(App).use(Packages).mount("#app");
