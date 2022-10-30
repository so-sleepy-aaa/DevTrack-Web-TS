import { RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";

const pages: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/about",
        name: "about",
        component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
    }
];

export default pages;