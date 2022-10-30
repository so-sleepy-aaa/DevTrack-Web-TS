<template>
    <el-card class="login-container">
        <h3>登录DevTrack</h3>

        <SignInForm/>
    </el-card>
</template>

<script setup>
    import SignInForm from "@/components/forms/SignInForm";
</script>

<style scoped>
    .login-container {
        width: 400px;
        margin: 180px auto;
        padding: 0 20px;
    }
</style>