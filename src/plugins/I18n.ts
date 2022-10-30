import { App } from "vue";
import { createI18n } from "vue-i18n";

import zh_cn from "@/lang/zh_cn";

const langList = {zh_cn};

const i18n = createI18n({
    locale: "zh_cn",
    messages: langList
});

export default (app: App<Element>) => {
    app.use(i18n);
};
