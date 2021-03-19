<template>
    <div>

        <div class="data-show">
            <h1>HIV感染待确定报告</h1>
            <div class="text-align-right">样品受理编号：{{ sampleBasicInfo.acceptanceNumber }}</div>

            <!-- 表单 快速填写样品基本信息 -->
            <div>
                <el-form :model="sampleBasicInfo" :rules="rules" ref="sampleBasicInfo">

                    <!-- 第一行 -->
                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">送检单位</div>
                        </el-col>

                        <el-col :span="6">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="sampleBasicInfo.inspectionUnit"></el-input>
                            </div>
                        </el-col>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">送检日期</div>
                        </el-col>

                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.inspectionDate"></el-input>
                        </el-col>

                        <!--第一行-->
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">送检样品</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.sampleType"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">送检人群</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.inspectedType"></el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">姓名</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.name"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">性别</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.sex"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">年龄</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.age"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">职业</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.profession"></el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">国籍</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.country"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">民族</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.nation"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">婚姻状况</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.marriage"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">文化程度</div>
                        </el-col>
                        <el-col :span="3">
                            <el-input readonly v-model="sampleBasicInfo.educationalLevel"></el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">身份证号</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.IDNumber"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">联系电话</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.phone"></el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">现住址</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input readonly v-model="sampleBasicInfo.presentAddress"></el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">户籍地址</div>
                        </el-col>
                        <el-col :span="18">
                            <el-input readonly v-model="sampleBasicInfo.residenceAddress"></el-input>
                        </el-col>
                    </el-row>

                    <!-- 第一行 -->
                    <el-row   id="detectionMethod">

                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测方法</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="detectionRecord.detectionMethod"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测日期</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="detectionRecord.detectionDate"></el-input>
                        </el-col>

                        <!--第一行-->
                    </el-row>

                    <!-- 第一行 -->
                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">试剂厂家</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="detectionRecord.reagentsAndManufacturers"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">批号</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="detectionRecord.batchNumber"></el-input>
                        </el-col>

                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">有效日期</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="detectionRecord.effectiveDate"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测结果</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="detectionRecord.testResult"></el-input>
                        </el-col>

                        <!--第一行-->
                    </el-row>

                    <!-- 第一行 -->
                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">筛查结论</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="detectionRecord.conclusion"></el-input>
                            </div>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测者</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="detectionRecord.inspectorName"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">审核者</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="detectionRecord.reviewerName"></el-input>
                        </el-col>
                    </el-row>
                    <!-- 表单 快速填写样品基本信息 -->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SampleInfo",
        data() {
            return {
                sampleBasicInfo: {},
                detectionRecord: {
                    reviewerName:''
                },
                rules: {}
            }
        },
        created() {
            const _this = this
            const acceptanceNumber = sessionStorage.getItem("acceptanceNumber");
            this.$axios.get("/sampleBasicInfo/getSampleInfo/" + acceptanceNumber).then(res => {
                    console.log(res.data.data)
                    _this.sampleBasicInfo = res.data.data
                }
            )

            this.$axios.get("/detectionRecord/getFirstDetectionRecord/"+acceptanceNumber).then(res => {
                    console.log(res.data.data)
                    _this.detectionRecord = res.data.data
                }
            )

        }
    }
</script>

<style scoped>

</style>