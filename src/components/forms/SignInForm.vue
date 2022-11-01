<template>
    <el-form :model="signInForm" :rules="signInFormRules" ref="signInFormRef" status-icon>
        <el-form-item prop="username">
            <el-input type="text" placeholder="用户名" v-model="signInForm.username"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="signInForm.password" show-password/>
        </el-form-item>

        <el-form-item>
            <el-button class="form-button" type="primary" @click="submitSignInForm" :loading="requestingService">登录</el-button>
        </el-form-item>

        <el-form-item>
            <router-link class="el-link el-link--primary" to="/account/forget">忘记密码</router-link>
            <div style="flex-grow: 1"/>
            没有账号？
            <router-link class="el-link el-link--primary" to="/signup">点此注册</router-link>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import { ElMessage, FormInstance, FormRules } from "element-plus";

    import axios from "axios";
    import ApiUrl from "@/api/ApiUrl";
    import StatusCode from "@/api/StatusCode";
    import router from "@/router";

    const requestingService = ref(false);
    const signInForm = reactive({
        username: "",
        password: ""
    });
    const signInFormRules: FormRules = {
        username: [{ required: true, message: "请输入用户名。", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码。", trigger: "blur" }]
    };

    const signInFormRef = ref<FormInstance>();

    function showMessage(message: string, type: "success" | "warning" | "info" | "error") {
        ElMessage({
            showClose: false,
            message,
            type,
            duration: 3000
        });
    }

    function submitSignInForm() {
        signInFormRef.value?.validate((valid) => {
            if (!valid) return;

            requestingService.value = true;
            axios.get(ApiUrl.signIn, { params: signInForm, timeout: 3000 }).then((res) => {
                if (res.data.statusCode === StatusCode.success) {
                    showMessage("欢迎 " + res.data.resultData.nickname + " ！", "success");
                    router.push("/");
                    sessionStorage.setItem("account", JSON.stringify(res.data.resultData));
                }
                if (res.data.statusCode === StatusCode.userNotExists)
                    showMessage("用户不存在！", "error");
                if (res.data.statusCode === StatusCode.passwordError)
                    showMessage("密码错误！", "error");
                requestingService.value = false;
            }).catch((error) => {
                showMessage("请求超时！", "error");
                requestingService.value = false;
            });
        });
    };
</script>

<style scoped>
    .form-button {
        width: 100%;
    }
</style>
