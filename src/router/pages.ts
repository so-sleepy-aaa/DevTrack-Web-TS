import { RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";

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
    },
    {
        path: "/signin",
        name: "signIn",
        component: SignIn
    }
];

export default pages;
