<template>
    <div id="app">
        <!--原则上整个前端所有的页面只会显示 App.vue 里面的 router-view 的内容-->
        <router-view v-if="isReloadAlive"/>

    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isReloadAlive: true
        }
    },
    methods: {
        reload() {
            this.isReloadAlive = false;
            this.$nextTick(function () {
                this.isReloadAlive = true;
            })
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>
