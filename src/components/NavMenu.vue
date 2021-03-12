<template>
    <div>
        <el-menu :default-active="this.$route.path"
                 router
                 mode="horizontal"
                 @select="handleSelect"
                 class="el-menu-demo"
                 active-text-color="#ffd04b">
            <el-menu-item v-for="(item,i) in navList"
                          :key="i"
                          :index="item.name">
                <template slot="title">
                    <span> {{ item.navItem }}</span>
                </template>
            </el-menu-item>
        </el-menu>

    </div>
</template>

<script>
export default {
    name: "NavMenu",
    data() {
        return {
            navList: [
                { name: '/', navItem: '首页' },
                { name: '/SampleInput', navItem: '样品信息输入' },
                { name: '/DetectionDataInput', navItem: '检测结果输入' },
                { name: '/SampleInfoUpdate/2021 - 4', navItem: '审核检测结果' },
                { name: '/EmMa', navItem: '导出报表' },
            ]
        };
    },
    props: {
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log("handle selected: "+ key+" " + keyPath);
            this.$router.push(key);
            this.activeIndex = key;
        }
    },
    created() {
        console.log("created: "　+　this.activeIndex);
    }
}
</script>

<style scoped>

</style>