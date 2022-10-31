<template>
    <el-form :model="signUpForm" :rules="signUpFormRules" ref="signUpFormRef" label-position="top" label-width="80px">
        <el-form-item prop="username" label="用户名">
            <el-input type="text" v-model="signUpForm.username"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="signUpForm.password" show-password/>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
            <el-input type="password" v-model="signUpForm.confirmPassword" show-password/>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input type="email" v-model="signUpForm.email"/>
        </el-form-item>
        <el-form-item prop="vCode" label="验证码">
            <el-input type="text" v-model="signUpForm.vCode">
                <template #append>
                    <el-button v-show="!timer.isCountdown" class="getVCodeButton" type="primary" @click="getVCode">获取验证码</el-button>
                    <el-button v-show="timer.isCountdown" disabled>{{ timer.count }}秒后可获取</el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button class="form-button" type="primary" @click="submitSignUpForm" :loading="requestingService">注册</el-button>
        </el-form-item>

        <el-form-item>
            已有账号？
            <router-link class="el-link el-link--primary" to="/signin">点此登录</router-link>
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

    const signUpFormRef = ref<FormInstance>();

    const timer = reactive({
        id: -1,
        isCountdown: false,
        count: 0,

        start() {
            this.isCountdown = true;
            this.count = 60;
            this.id = setInterval(() => {
                if (this.count > 0 && this.count <= 60)
                    this.count--;
                else
                    this.stop();
            }, 1000);
        },
        stop() {
            this.isCountdown = false;
            clearInterval(this.id);
            this.id = -1;
        }
    });

    const requestingService = ref(false);
    const signUpForm = reactive({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        vCode: ""
    });

    const formValidator = {
        username(rule: any, value: any, callback: any) {
            const regex = new RegExp("^\\w{6,20}$");
            if (!regex.test(value))
                callback("用户名由字母，数字和下划线组成，长度为6到20位。");
        },
        password(rule: any, value: any, callback: any) {
            const regex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,._])[0-9a-zA-Z!@#$%^&*,._]{8,16}$");
            if (!regex.test(value))
                callback("密码由大写字母、小写字母、数字、符号组成，长度为8到16位。");
        },
        confirmPassword(rule: any, value: any, callback: any) {
            if (value !== signUpForm.password)
                callback("两次密码不一致！");
        }
    };

    const signUpFormRules: FormRules = {
        username: [
            { required: true, message: "请输入用户名。", trigger: "blur" },
            { validator: formValidator.username, trigger: "blur" }
        ],
        password: [
            { required: true, message: "请输入密码。", trigger: "blur" },
            { validator: formValidator.password, trigger: "blur" }
        ],
        confirmPassword: [
            { required: true, message: "请确认密码。", trigger: "blur" },
            { validator: formValidator.confirmPassword, trigger: "blur" }
        ],
        email: [
            { required: true, message: "请输入邮箱。", trigger: "blur" },
            { type: "email", message: "请输入正确的邮箱地址！", trigger: "blur" }
        ],
        vCode: [{ required: true, message: "请输入验证码。", trigger: "blur" }]
    };

    function showMessage(message: string, type: "success" | "warning" | "info" | "error") {
        ElMessage({
            showClose: false,
            message,
            type,
            duration: 3000
        });
    }

    function getVCode() {
        if (signUpForm.email === "") {
            showMessage("请输入邮箱！", "error");
            return;
        }

        timer.start();
        const params = { email: signUpForm.email, taskType: 1 };
        axios(ApiUrl.sendVCode, { params, timeout: 3000 }).then((res) => {
        }).catch((error) => {
            showMessage("请求超时，请稍后重试。", "error");
            requestingService.value = false;
            timer.stop();
        });
    }

    function submitSignUpForm() {
        signUpFormRef.value?.validate((valid) => {
            if (!valid) return;

            requestingService.value = true;
            axios.get(ApiUrl.signUp, { params: signUpForm, timeout: 3000 }).then((res) => {
                if (res.data.statusCode === StatusCode.success) {
                    showMessage("注册成功！", "success");
                    router.push("/singin");
                }
                if (res.data.statusCode === StatusCode.userExists)
                    showMessage("用户名已存在！", "error");
                if (res.data.statusCode === StatusCode.vCodeError)
                    showMessage("验证码错误！", "error");
                if (res.data.statusCode === StatusCode.vCodeInvalid)
                    showMessage("验证码超时！", "error");
                if (res.data.statusCode === StatusCode.vCodeNoRecord)
                    showMessage("没有验证码记录！", "error");
                if (res.data.statusCode === StatusCode.uuidConflict)
                    showMessage("用户池故障，请稍后重试！", "error");
                requestingService.value = false;
            }).catch((error) => {
                showMessage("请求超时，请稍后重试。", "error");
                requestingService.value = false;
            });
        });
    }
</script>

<style scoped>
    .getVCodeButton {
        background-color: var(--el-button-bg-color) !important;
        color: white !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }

    .getVCodeButton:hover {
        background-color: var(--el-button-hover-bg-color) !important;
    }

    .getVCodeButton:active {
        background-color: var(--el-button-active-bg-color) !important;
    }

    .form-button {
        width: 100%;
    }
</style>
