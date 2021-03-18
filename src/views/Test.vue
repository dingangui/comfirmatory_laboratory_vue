<template>
    <div>
        <el-menu
            :default-active="1"
            router
            mode="horizontal"
            @select="handleSelect"
            class="el-menu-demo"
            active-text-color="#ffd04b">

            <template class="el-menu-demo1" v-for="item in navigateItem">

                <el-submenu v-if="item.items.length" :index="item.key" :key="item.key">

                    <template slot="title">
                        menu {{ item.title }}
                    </template>

                    <el-menu-item
                        v-for="(items, key) in item.items"
                        :key="key"
                        :index="items.key">
                        submenu {{ items.title }}
                    </el-menu-item>

                </el-submenu>

                <el-menu-item v-else :index="item.key" :key="item.key">
                    {{ item.title }}
                </el-menu-item>

            </template>
        </el-menu>
    </div>
</template>


<script>
export default {
    name: "Test",
    data() {
        return {
            navigateItem: [
                {
                    title: "首页",
                    key: "1",
                    path: "",
                    items: [],
                },
                {
                    title: "找人才",
                    key: "2",
                    path: "",
                    items: [
                        {
                            title: "选项1",
                            key: "2-1",
                            path: "",
                        },
                        {
                            title: "选项2",
                            key: "2-2",
                            path: "",
                        },
                    ],
                },
                {
                    title: "找资金",
                    key: "3",
                    path: "",
                    items: [
                        {
                            title: "选项1",
                            key: "/DetectionDataInput",
                            path: "",
                        },
                        {
                            title: "选项2",
                            key: "3-2",
                            path: "",
                        },
                    ],
                },
                {
                    title: "提身价",
                    key: "4",
                    path: "",
                    items: [
                        {
                            title: "选项1",
                            key: "4-1",
                            path: "",
                        },
                        {
                            title: "选项2",
                            key: "4-2",
                            path: "",
                        },
                    ],
                },
            ]
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log("handle selected: " + key + " " + keyPath);
            this.$router.push(key);
        }
    },
}
</script>

<style scoped>
.el-menu-demo1{
    float: left;
    display: inline-block;
    background-color: #fff;
    color: #d52b2b;
}
</style>