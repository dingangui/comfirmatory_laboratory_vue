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

            <!--

            主区域分为两类，
            当路径是 /DetectionDataInput 时，此时，路径通过 '/' 分隔符分开，长度为2
                显示可检测样品的列表

            当路径是 /DetectionDataInput/A2021 - x 时，此时，路径通过 '/' 分隔符分开，长度为3
                显示具体检测数据的表格

            -->
            <!-- 显示可检测样品的列表  -->
            <el-main v-if="this.$route.path.split('/').length === 2">
                <SampleList></SampleList>
            </el-main>

            <!-- 显示具体检测数据的表格  -->
            <el-main v-else>
                <el-page-header @back="goBack" content="输入检测结果">
                </el-page-header>

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
                    <el-col class="el-main-right-side" :span="12">

                        <DetectionRecords></DetectionRecords>
                        <!--输入结果的部分-->
                        <!--当检测记录 =4 时，说明确证检测都结束了，不需要继续检测 -->
                        <!--当状态不是 waitingForTest 时，不显示输入检测结果的表格 -->
                        <div v-if="testTime < 4 && flag ==='waitingForTest'"
                             class="grid-content bg-purple-light detection-data-input-area">
                            <h2 v-if="testTime === 1">第一次复检结果输入</h2>
                            <h2 v-if="testTime === 2">第二次复检结果输入</h2>
                            <h2 v-if="testTime === 3">确证检测结果输入</h2>
                            <el-form :model="detectionRecord"
                                     :rules="rules"
                                     ref="detectionRecord"
                                     label-width="140px">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item prop="detectionMethod" label="检测方法">
                                            <el-input v-model="detectionRecord.detectionMethod"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item prop="detectionDate" label="检测日期">
                                            <el-date-picker
                                                v-model="detectionRecord.detectionDate"
                                                type="date"
                                                placeholder="选择日期"
                                                size="large"
                                                :picker-options="pickerOptions">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="试剂厂家" prop="reagentsAndManufacturers">
                                            <el-input v-model="detectionRecord.reagentsAndManufacturers"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="批号" prop="batchNumber">
                                            <el-input v-model="detectionRecord.batchNumber"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="有效日期" prop="effectiveDate">
                                            <el-date-picker
                                                v-model="detectionRecord.effectiveDate"
                                                align="left"
                                                type="date"
                                                placeholder="选择日期"
                                                size="large"
                                                :picker-options="pickerOptions">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12" v-if="testTime === 3">
                                        <el-form-item label="检测结果(带型)" prop="testResult">
                                            <el-select v-model="detectionRecord.testResult" placeholder="请选择">
                                                <el-option
                                                    v-for="item in testResultStripType"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12" v-else>
                                        <el-form-item label="检测结果" prop="testResult">
                                            <el-select v-model="detectionRecord.testResult" placeholder="请选择">
                                                <el-option
                                                    v-for="item in testResult"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                </el-row>

                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple">
                                            <el-form-item prop="conclusion" label="结论" v-if="testTime === 3">
                                                <el-select v-model="detectionRecord.conclusion" placeholder="请选择">
                                                    <el-option
                                                        v-for="item in conclusions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item prop="conclusion" label="筛查结论" v-else>
                                                <el-select v-model="detectionRecord.conclusion" placeholder="请选择">
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

                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="text-align-right">
                                            <el-button type="primary" @click="saveDetectionRecord('detectionRecord')">保存
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </div>

                        <!-- 右侧 -->
                    </el-col>

                </el-row>

                <!-- 负责布局管理，其中分为左右各一半两个区域 -->
            </el-main>
            <!-- 唯一 div 内负责布局管理的，分为导航栏和主区域 -->
        </el-container>

        <!--  最外层 唯一 div -->
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import SampleInfo from "@/components/SampleInfo";
import DetectionRecords from "@/components/DetectionRecords";
import SampleList from "@/components/SampleList";

export default {
    name: "DetectionDataInput",
    components: {NavMenu, SampleInfo, DetectionRecords, SampleList},
    inject: ['reload'],
    data() {
        return {
            /*历史检测记录*/
            detectionRecords: [],
            /*当前输入检测记录*/
            detectionRecord: {
                acceptanceNumber: '',
                detectionMethod: 'ELISA',
                detectionDate: new Date,
                reagentsAndManufacturers: '哈药六厂',
                batchNumber: '990011',
                effectiveDate: '2021-02-11',
                testResult: '',
                inspectorAccountID: '',
                inspectorName: '',
            },

            /*检测结果（带型）的选项（复检用）*/
            testResult: [{
                value: '有反应',
                label: '有反应'
            }, {
                value: '无反应',
                label: '无反应'
            }],

            /*检测结果（带型）的选项（确证检测用）*/
            testResultStripType: [
                {
                    value: '无特异条带',
                    label: '无特异条带'
                }, {
                    value: 'gp160',
                    label: 'gp160'
                }, {
                    value: 'gp120\\gp160,p24,p17',
                    label: 'gp120\\gp160,p24,p17'
                }, {
                    value: 'gp120\\gp160,p24,p18',
                    label: 'gp120\\gp160,p24,p18'
                }
            ],
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
                detectionMethod: [
                    {required: true, message: '请选择检测方法', trigger: 'change'},
                ], detectionDate: [
                    {required: true, message: '请选择检测日期', trigger: 'change'},
                ], reagentsAndManufacturers: [
                    {required: true, message: '请选择试剂厂家', trigger: 'change'},
                ], batchNumber: [
                    {required: true, message: '请选择批号', trigger: 'change'},
                ], effectiveDate: [
                    {required: true, message: '请选择有效日期', trigger: 'change'},
                ], testResult: [
                    {required: true, message: '请选择检测结果', trigger: 'change'},
                ], conclusion: [
                    {required: true, message: '请输入结论', trigger: 'change'},
                ]
            },
            /*日期选择器*/
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },


                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            /*当前样品已检测的次数*/
            testTime: 0,
            /*当前样品的状态
            * 当他处于waitingForTest的时候，才允许输入记录
            *
            * */
            flag: ''
        }
    },
    methods: {

        /*
        * 保存本次检测记录
        * */
        saveDetectionRecord(detectionRecord) {
            this.$refs[detectionRecord].validate((valid) => {
                if (valid) {

                    /*
                    * 本次记录对应的样品受理编号
                    * 检测人姓名
                    * 检测人ID
                    *
                    * */
                    this.detectionRecord.acceptanceNumber = sessionStorage.getItem("acceptanceNumber")

                    this.detectionRecord.inspectorName = this.$store.getters.getUser.username
                    this.detectionRecord.inspectorAccountID = this.$store.getters.getUser.id

                    const _this = this;

                    this.$axios.post("/detectionRecord/save", this.detectionRecord).then(res => {
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

        goBack() {
            history.go(-1);
        }
    },

    watch: {
        '$route'() {

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
                        console.log("testTime", this.testTime)
                    }
                );
            }
        }

    },
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

.el-input__inner {
    padding: 0;
}

</style>