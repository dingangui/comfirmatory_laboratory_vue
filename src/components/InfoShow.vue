<template>
    <!--  最外层 div -->
    <div>
            <!-- 左侧，样品基本信息显示 -->
            <!--展示筛查实验室的报告-->
            <SampleInfo></SampleInfo>
            <!-- 负责左侧布局管理的 div -->
            <!-- 右侧 检测检测结果显示和输入栏  -->
            <DetectionRecords></DetectionRecords>
    </div>
</template>

<script>
import SampleInfo from "@/components/SampleInfo";
import DetectionRecords from "@/components/DetectionRecords";

export default {
    name: "InfoShow",
    components: {SampleInfo, DetectionRecords},
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