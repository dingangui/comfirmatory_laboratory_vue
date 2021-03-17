<template>
    <div>
        <div class="data-show">
            <h1>HIV感染待确定报告(筛查实验室)</h1>
            <!-- 表单 快速填写样品基本信息 -->

            <div class="text-align-right">样品受理编号：{{ acceptanceNumber }}</div>

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
                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测方法</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="sampleBasicInfo.inspectionUnit"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测日期</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="sampleBasicInfo.inspectionDate"></el-input>
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
                                <el-input readonly v-model="sampleBasicInfo.inspectionUnit"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">批号</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="sampleBasicInfo.inspectionDate"></el-input>
                        </el-col>

                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <div class="grid-content bg-purple">有效日期</div>
                        </el-col>

                        <el-col :span="18">
                            <div class="grid-content bg-purple-light">
                                <el-input readonly v-model="sampleBasicInfo.inspectionUnit"></el-input>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测结果</div>
                        </el-col>

                        <el-col :span="18">
                            <el-input readonly v-model="sampleBasicInfo.inspectionDate"></el-input>
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
                                <el-input readonly v-model="sampleBasicInfo.inspectionUnit"></el-input>
                            </div>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">检测者</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.dataEntryStaffName"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">审核者</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input readonly v-model="sampleBasicInfo.dataEntryStaffName"></el-input>
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
                rules: {}
            }
        },
        created() {
            const _this = this
            this.$axios.get("/sample-basic-info/getSampleInfoByAcceptanceNumber/2021 - 14").then(res => {
                    console.log(res.data.data)
                    _this.sampleBasicInfo = res.data.data
                }
            )

        }
    }
</script>

<style scoped>

</style>