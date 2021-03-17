<template>
    <div>
        <el-menu
            :default-active="this.$route.path"
            router
            mode="horizontal"
            @select="handleSelect"
            class="el-menu-demo"
            active-text-color="#ffd04b">

            <template class="el-menu-demo1" v-for="item in navigateItem">

                <el-submenu v-if="item.items.length" :index="item.key" :key="item.key">

                    <template slot="title">
                        {{ item.title }}
                    </template>

                    <el-menu-item
                        v-for="(items, key) in item.items"
                        :key="key"
                        :index="items.key">
                        {{ items.title }}
                    </el-menu-item>

                </el-submenu>

                <el-menu-item v-else :index="item.key" :key="item.key">
                    {{ item.title }}
                </el-menu-item>

            </template>
            <div class="text-align-right">
                <span>当前用户：{{ username }}</span>&emsp;&emsp;&emsp;
                <span><el-link type="danger" @click="logout">&emsp;退出</el-link></span>
            </div>
        </el-menu>


    </div>
</template>

<script>
export default {
    name: "NavMenu",
    data() {
        return {
            username: '',
            navigateItem: [
                {
                    title: "首页",
                    key: "/",
                    path: "",
                    items: [],
                },
                {
                    title: "录入样品信息",
                    key: "/SampleInput",
                    path: "",
                    items: [],
                },
                {
                    title: "输入检测结果",
                    key: "/DetectionDataInput",
                    path: "",
                    items: [],
                },
                {
                    title: "导出报表",
                    key: "/DetectionDataInput",
                    path: "",
                    items: [
                        {
                            title: "导出A表",
                            key: "/DetectionDataInput",
                            path: "",
                        },
                        {
                            title: "导出B表",
                            key: "/SampleInput",
                            path: "",
                        },
                    ],
                },
            ]
        }
    },
    props: {},
    methods: {
        logout() {
            const _this = this
            this.$axios.get("/logout", {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then((res) => {
                _this.$store.commit('REMOVE_INFO')
                _this.$router.push('/')
            });
        },
        handleSelect(key, keyPath) {
            console.log("handle selected: " + key + " " + keyPath);
            this.$router.push(key);
        },

    },
    created() {
        if (this.$store.getters.getUser.username) {
            console.log(this.$store.getters.getUser.username)
            this.username = this.$store.getters.getUser.username
        }
    }


}
</script>

<style scoped>

</style>