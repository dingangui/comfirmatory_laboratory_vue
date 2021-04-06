<template>
    <!--  最外层 div -->
    <div>

        <!-- 最外层 div 内负责布局管理的 -->
        <el-container>

            <!-- 导航栏 -->
            <el-header>
                <NavMenu></NavMenu>
            </el-header>
            <!-- 负责布局管理，内部分为左右各一半两个区域 -->



            <!-- 显示具体检测数据的表格  -->
            <el-main>
                <!-- 最外层 div 内负责布局管理的，分为导航栏和主区域 -->
                <el-row>

                    <!-- 左侧，样品基本信息显示 -->
                    <el-col :span="12">

                        <!-- 负责左侧布局管理的 div -->
                        <div class="grid-content bg-purple">
                            <!--展示筛查实验室的报告-->
                            <SampleInfo></SampleInfo>

                            <!-- 负责左侧布局管理的 div -->
                        </div>

                    </el-col>

                    <!-- 右侧 检测检测结果显示和输入栏  -->
                    <el-col class="el-main-right-side" :span="12">
                        <DetectionRecords></DetectionRecords>
                    </el-col>

                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import SampleInfo from "@/components/SampleInfo";
import DetectionRecords from "@/components/DetectionRecords";
import SampleList from "@/views/SampleList";

export default {
    name: "InfoShow",
    components: {NavMenu, SampleInfo, DetectionRecords, SampleList},
    created() {


        if (this.$store.getters.getUser.username) {
            this.username = this.$store.getters.getUser.username
        }

        const _this = this;
        const acceptanceNumber = sessionStorage.getItem("acceptanceNumber");

        console.log("DetectionDataInput", this.$route.path.split('/'))
        console.log("testTime", this.testTime)

        if (this.$route.path.split('/').length > 2) {

            /*
            * 获取样品当前状态 等待检测or等待审核
            *
            * 等待检测：显示输入检测结果的表格
            * 等待审核：不显示
            *
            * */
            this.$axios.get("/sampleBasicInfo/getFlag/" + acceptanceNumber).then(res => {
                    _this.flag = res.data.data
                    console.log("flag：" + _this.flag);
                }
            );

            /*
            * 获取当前样品已检测次数
            * 根据次数决定标题内容
            *
            * */
            this.$axios.get("/detectionRecord/getTestTime/" + acceptanceNumber).then(res => {
                    _this.testTime = res.data.data
                }
            );
        }
    }
}
</script>

<style scoped>

</style>