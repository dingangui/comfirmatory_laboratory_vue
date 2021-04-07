<template>
    <div v-title data-title="HIV抗体检测中心">

        <el-container>

            <!--导航栏-->
            <el-header>
                <NavMenu></NavMenu>
            </el-header>

            <!--信息输入页面-->
            <el-main>
                <SampleList></SampleList>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import SampleList from "@/components/SampleList";

export default {
    name: "Index",
    components: {NavMenu, SampleList},
}
</script>

<style scoped>

</style>