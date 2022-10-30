import { RouteRecordRaw } from "vue-router";

import NotFound from "@/views/NotFound.vue";

const guards: Array<RouteRecordRaw> = [
    {
        path: "/404",
        name: "notFound",
        component: NotFound
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        beforeEnter: (to, from, next) => {
            next({name: "notFound"});
        }
    }
];

export default guards;
