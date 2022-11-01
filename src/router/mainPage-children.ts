import { RouteRecordRaw } from "vue-router";

import Profile from "@/views/mainpage/Profile.vue";

const mainPageChildren: Array<RouteRecordRaw> = [
    {
        path: "/profile",
        name: "profile",
        component: Profile
    }
];

export default mainPageChildren;
