<template>
    <el-container>
        <el-aside class="sidebar" width="60px">
            <el-menu class="function-menu" :router="true" :default-active="sideBarList[0].route" background-color="#3e4963"
                     text-color="white">
                <el-menu-item class="main-menu-item function-menu-item" v-for="item in sideBarList" :index="item.route" :key="item.id">
                    <el-icon style="margin-right: 0">
                        <component :is="item.icon"/>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </el-menu>

            <el-menu class="another-menu" background-color="#3e4963" text-color="white">
                <el-tooltip placement="right" :hide-after="toolTipHideAfter" content="个人偏好设置">
                    <el-menu-item class="main-menu-item">
                        <el-icon>
                            <Operation/>
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
                <el-tooltip placement="right" :hide-after="toolTipHideAfter" content="帮助中心">
                    <el-menu-item class="main-menu-item">
                        <el-icon>
                            <QuestionFilled/>
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
                <el-menu-item class="main-menu-item">
                    <el-avatar :size="32" :src="avatar"/>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script setup>
    import { onMounted, reactive, ref } from "vue";
    import Environment from "@/api/Environment";

    onMounted(() => {
        Environment.setTitle("主页");
        
        avatar.value = "data:image/jpeg;base64," + JSON.parse(sessionStorage.getItem("account")).avatar;
    });

    const sideBarList = reactive([
        { id: 1, name: "工作台", route: "/workbench", icon: "Menu" },
        { id: 2, name: "项目", route: "/project", icon: "Files" },
        { id: 3, name: "搜索", route: "/search", icon: "Search" },
        { id: 4, name: "消息", route: "/message", icon: "ChatLineRound" }
    ]);

    const toolTipHideAfter = ref(0);
    const avatar = ref("");
</script>

<style scoped>
    .sidebar {
        background: #3e4963;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
    }

    .main-menu-item {
        flex-direction: column;
        line-height: 2;
        justify-content: center;
    }

    .function-menu {
        margin-top: 20px;
        border-right: 0;
    }

    .another-menu {
        margin-bottom: 20px;
        border-right: 0;
    }

    .function-menu-item {
        padding-top: 30px;
        padding-bottom: 25px;
    }
</style>
