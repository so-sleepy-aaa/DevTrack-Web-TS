<template>
    <el-card class="login-container">
        <h3>登录DevTrack</h3>

        <SignInForm/>
    </el-card>
</template>

<script setup>
    import { onMounted } from "vue";
    import SignInForm from "@/components/forms/SignInForm";
    import Environment from "@/api/Environment";

    onMounted(() => {
        Environment.setTitle("登录");
    });
</script>

<style scoped>
    .login-container {
        width: 400px;
        margin: 180px auto;
        padding: 0 20px;
    }
</style>
