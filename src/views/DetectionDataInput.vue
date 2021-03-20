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

                        <DetectionRecords></DetectionRecords>
                        <!--输入结果的部分-->
                        <!--当检测记录 =4 时，说明确证检测都结束了，不需要继续检测 -->
                        <!--当状态不是 waitingForTest 时，不显示输入检测结果的表格 -->
                        <div v-if="testTime < 4 && flag ==='waitingForTest'"
                             class="grid-content bg-purple-light detection-data-input-area">
                            <h1 v-if="testTime === 1">第一次复检结果输入</h1>
                            <h1 v-if="testTime === 2">第二次复检结果输入</h1>
                            <h1 v-if="testTime === 3">确证检测结果输入</h1>
                            <el-form :model="detectionRecord" :rules="rules" ref="detectionRecord">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测方法</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="detectionRecord.detectionMethod"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测日期</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-date-picker
                                            v-model="detectionRecord.detectionDate"
                                            align="left"
                                            type="date"
                                            placeholder="选择日期"
                                            size="large"
                                            :picker-options="pickerOptions">
                                        </el-date-picker>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">试剂厂家</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="detectionRecord.reagentsAndManufacturers"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">批号</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="detectionRecord.batchNumber"></el-input>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">有效日期</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-date-picker
                                            v-model="detectionRecord.effectiveDate"
                                            align="left"
                                            type="date"
                                            placeholder="选择日期"
                                            size="large"
                                            :picker-options="pickerOptions">
                                        </el-date-picker>
                                    </el-col>

                                    <div v-if="testTime === 3">
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple">检测结果(带型)</div>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-select v-model="detectionRecord.testResult" placeholder="请选择">
                                                <el-option
                                                    v-for="item in testResultStripType"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </div>

                                    <div v-else>
                                        <el-col :span="6">
                                            <div class="grid-content bg-purple">检测结果</div>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-select v-model="detectionRecord.testResult" placeholder="请选择">
                                                <el-option
                                                    v-for="item in testResult"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </div>

                                </el-row>

                                <el-row>
                                    <el-col :span="24">

                                        <div class="text-align-right">
                                            本次检测结果输入人：{{ username }}
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

export default {
    name: "DetectionDataInput",
    components: {NavMenu, SampleInfo, DetectionRecords},
    inject: ['reload'],
    data() {
        return {
            /*历史检测记录*/
            detectionRecords: [],
            /*当前输入检测记录*/
            detectionRecord: {
                acceptanceNumber: '',
                detectionMethod: 'ELISA',
                detectionDate: '2021-03-19',
                reagentsAndManufacturers: '哈药六厂',
                batchNumber: '990011',
                effectiveDate: '2021-02-11',
                testResult: '有反应',
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

            rules: {},
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
    },
    created() {
        const _this = this;
        const acceptanceNumber = sessionStorage.getItem("acceptanceNumber");

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

        if (this.$store.getters.getUser.username) {
            this.username = this.$store.getters.getUser.username
        }
    }

}
</script>

<style scoped>


.el-input__inner {
    padding: 0;
}

</style>