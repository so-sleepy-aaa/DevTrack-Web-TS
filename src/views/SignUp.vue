<template>
    <el-card class="signUp-container">
        <h3>注册AuroraLab账号</h3>

        <SignUpForm/>
    </el-card>
</template>

<script setup>
    import { onMounted } from "vue";
    import SignUpForm from "@/components/forms/SignUpForm";
    import Environment from "@/api/Environment";

    onMounted(() => {
        Environment.setTitle("注册");
    });
</script>

<style scoped>
    .signUp-container {
        width: 400px;
        margin: 180px auto;
        padding: 0 20px;
    }
</style>
