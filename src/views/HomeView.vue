<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <el-button type="primary">Primary</el-button>
            <el-icon>
                <Finished/>
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'HomeView'
    });
</script>
