import { createRouter, createWebHistory } from "vue-router";

import pages from "@/router/pages";
import guards from "@/router/guards";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...pages, ...guards]
});

export default router;
