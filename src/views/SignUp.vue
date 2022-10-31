<template>
    <el-card class="signUp-container">
        <h3>注册AuroraLab账号</h3>

        <SignUpForm/>
    </el-card>
</template>

<script setup>
    import SignUpForm from "@/components/forms/SignUpForm";
</script>

<style scoped>
    .signUp-container {
        width: 400px;
        margin: 180px auto;
        padding: 0 20px;
    }
</style>
