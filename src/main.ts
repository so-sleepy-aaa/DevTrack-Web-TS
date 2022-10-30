import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import installI18n from "@/plugins/I18n";
import installElementPlus from "@/plugins/ElementPlus";
import installElementPlusIcon from "@/plugins/ElementPlusIcons";

const app = createApp(App);

installI18n(app);
installElementPlus(app);
installElementPlusIcon(app);

app.use(store);
app.use(router);
app.mount("#app");
