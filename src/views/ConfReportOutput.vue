<template>
<div>
    <!--确证检测报表导出-->
    <el-container>

        <!--导航栏-->
        <el-header>
            <NavMenu></NavMenu>
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="导出确证报告">
            </el-page-header>
            <br/>

        </el-main>
    </el-container>


</div>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
    name: "ConfReportOutput",
    components:{NavMenu},
    data(){
        return{

        }
    },
    methods: {
        goBack() {
            history.go(-1);
        }
    },
    created() {
    }
}
</script>

<style scoped>

</style>