<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">样品信息输入</el-menu-item>
            <el-menu-item index="3">检测结果输入</el-menu-item>
            <el-menu-item index="4">审核检测结果</el-menu-item>
            <el-submenu index="2">
                <template slot="title">导出报表</template>
                <el-menu-item index="2-1">导出A表</el-menu-item>
                <el-menu-item index="2-2">导出A表</el-menu-item>
                <el-menu-item index="2-3">导出B表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "NavMenu",
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>

</style>