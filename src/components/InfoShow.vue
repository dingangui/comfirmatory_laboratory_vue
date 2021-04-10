<template>
    <!--  最外层 div -->
    <div>
        <!-- 左侧，样品基本信息显示 -->
        <!--展示筛查实验室的报告-->
        <div v-show="hasReportNumber" class="text-align-right data-show">报告编号：{{ sampleBasicInfo.reportNumber }}</div>
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
    data() {
        return {
            hasReportNumber: false,
            sampleBasicInfo: {
                reportNumber: ''
            }
        }
    },
    created() {
        let acceptanceNumber = sessionStorage.getItem("acceptanceNumber")
        const _this = this
        this.$axios.get("/sampleBasicInfo/getSampleInfo/" + acceptanceNumber).then(res => {
            _this.sampleBasicInfo = res.data.data
            if (_this.sampleBasicInfo.reportNumber != null)
                _this.hasReportNumber = true;

        })
    }
}
</script>

<style scoped>

</style>