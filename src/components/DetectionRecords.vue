<template>
    <div>
        <!--显示结果的部分-->
        <div v-for="detectionRecord in detectionRecords" class="data-show" v-if="detectionRecord.sequence > 1">
            <h1 v-if="detectionRecord.sequence === 2">第一次复检结果</h1>
            <h1 v-if="detectionRecord.sequence === 3">第二次复检结果</h1>
            <h1 v-if="detectionRecord.sequence === 4">确证检测结果</h1>
            <!-- 表单 快速填写样品基本信息 -->
            <el-form>

                <!-- 第一行 -->
                <el-row>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">检测方法</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{detectionRecord.detectionMethod}}
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">检测日期</div>
                    </el-col>

                    <el-col :span="6">
                        {{detectionRecord.detectionDate}}
                    </el-col>

                    <!--第一行-->
                </el-row>
                <el-row>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">试剂厂家</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{detectionRecord.reagentsAndManufacturers}}
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">批号</div>
                    </el-col>

                    <el-col :span="6">
                        {{detectionRecord.batchNumber}}
                    </el-col>

                </el-row>

                <el-row>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">有效日期</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{detectionRecord.effectiveDate}}
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div v-if="detectionRecord.sequence === 4" class="grid-content bg-purple">检测结果(带型)</div>
                        <div v-else class="grid-content bg-purple">检测结果</div>
                    </el-col>

                    <el-col :span="6">
                        {{detectionRecord.testResult}}
                    </el-col>

                </el-row>

                <el-row>

                    <el-col :span="6">
                        <div  v-if="detectionRecord.sequence === 4" class="grid-content bg-purple">结论</div>
                        <div  v-else class="grid-content bg-purple">筛查结论</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{detectionRecord.conclusion}}
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple"></div>
                    </el-col>

                    <el-col :span="6">
                        <el-input readonly></el-input>
                    </el-col>

                </el-row>

                <el-row>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">检测者</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            {{detectionRecord.inspectorName}}
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <div class="grid-content bg-purple">审核者</div>
                    </el-col>

                    <el-col :span="6">
                        <span v-if="detectionRecord.reviewerName === null">该结果未审核</span>
                        {{detectionRecord.reviewerName}}
                    </el-col>

                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetectionRecords",
    data(){
        return{
            detectionRecords:[]
        }
    },
    created() {
        const _this = this;
        const acceptanceNumber = sessionStorage.getItem("acceptanceNumber");

        /*获取后面三次发生在确证实验室的检测记录*/
        this.$axios.get("/detectionRecord/getDetectionRecords/" + acceptanceNumber).then(res => {
                _this.detectionRecords = res.data.data
            }
        );
    }
}

</script>

<style scoped>

</style>