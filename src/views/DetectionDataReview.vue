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
                        <!-- 左侧，样品基本信息显示 -->
                    </el-col>


                    <!-- 右侧 检测检测结果显示和输入栏  -->
                    <el-col :span="12">

                        <!--右侧上半部分，展示检测记录-->
                        <DetectionRecords></DetectionRecords>


                        <!--下半部分，录入审核结果-->
                        <div>

                            <el-form v-if="flag === 'waitingForReview'" :rules="rules" :model="reviewResult" ref="reviewResult"
                                     id="inputReviewResult"
                                     label-width="100px">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <el-form-item prop="conclusion" label="结论" v-if="testTime === 4">
                                                <el-select v-model="reviewResult.conclusion" placeholder="请选择">
                                                    <el-option
                                                        v-for="item in conclusions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item prop="conclusion" label="筛查结论" v-else>
                                                <el-select v-model="reviewResult.conclusion" placeholder="请选择">
                                                    <el-option
                                                        v-for="item in screeningConclusions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-light">
                                            检测结果审核人：{{ username }}
                                            <el-button type="primary" @click="inputReviewResult('reviewResult')">确定审核
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                                <!--当该样品检测三次后，说明最后一次是确证检测，则给出“结论”的选项-->
                                <el-row>


                                </el-row>

                            </el-form>
                        </div>

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

export default {
    name: "DetectionDataReview",
    components: {NavMenu, SampleInfo, DetectionRecords},
    inject: ['reload'],

    data() {
        return {
            /* 当前样品已检测的次数 */
            testTime: 0,
            flag:'',
            reviewResult: {
                id: '',
                acceptanceNumber: '',
                conclusion: '',
                sequence: 0,
                reviewerName: '',
                reviewerAccountID: ''
            },
            /*筛查结论的选项（复检用）*/
            screeningConclusions: [{
                value: 'HIV抗体阴性',
                label: 'HIV抗体阴性'
            }, {
                value: 'HIV抗体阳性',
                label: 'HIV抗体阳性'
            }, {
                value: 'HIV感染待确定',
                label: 'HIV感染待确定'
            },
            ],
            /*结论的选项（确证检测用）*/
            conclusions: [{
                value: 'HIV抗体阴性',
                label: 'HIV抗体阴性'
            }, {
                value: 'HIV-1抗体不确定',
                label: 'HIV-1抗体不确定'
            }, {
                value: 'HIV-1抗体阳性',
                label: 'HIV-1抗体阳性'
            },
            ],
            rules: {
                conclusion: [
                    {required: true, message: '请选择结论', trigger: 'change'},
                ]
            },
        }
    },
    methods: {
        inputReviewResult(reviewResult) {
            this.$refs[reviewResult].validate((valid) => {
                if (valid) {
                    this.reviewResult.acceptanceNumber = sessionStorage.getItem("acceptanceNumber")
                    this.reviewResult.reviewerName = this.$store.getters.getUser.username
                    this.reviewResult.reviewerAccountID = this.$store.getters.getUser.id
                    this.reviewResult.sequence = this.testTime
                    const _this = this;

                    this.$axios.post("/detectionRecord/inputReviewResult/", this.reviewResult).then(res => {
                            console.log(_this.reviewResult);
                            alert(res.data.msg)
                            _this.reload();
                        }
                    )
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    created() {
        const _this = this;
        const acceptanceNumber = sessionStorage.getItem("acceptanceNumber");

        /* 获取当前样品已检测次数 */
        this.$axios.get("/detectionRecord/getTestTime/" + acceptanceNumber).then(res => {
                _this.testTime = res.data.data
            }
        );

        /*
        * 获取样品当前状态 等待检测or等待审核
        *
        * 等待检测：显示输入检测结果的表格
        * 等待审核：不显示
        *
        * */
        this.$axios.get("/sampleBasicInfo/getFlag/" + acceptanceNumber).then(res => {
                _this.flag = res.data.data
            }
        );
        if (this.$store.getters.getUser.username) {
            this.username = this.$store.getters.getUser.username
        }
    }

}
</script>

<style scoped>

</style>