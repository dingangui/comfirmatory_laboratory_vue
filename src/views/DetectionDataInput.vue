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

                        <!--显示结果的部分-->
                        <div v-for="detectionRecord in detectionRecords" class="data-show" v-if="detectionRecord.testTime > 1">
                            <h1 v-if="detectionRecord.testTime === 2">第一次复检结果</h1>
                            <h1 v-if="detectionRecord.testTime === 3">第二次复检结果</h1>
                            <h1 v-if="detectionRecord.testTime === 4">确证检测结果</h1>
                            <!-- 表单 快速填写样品基本信息 -->
                            <el-form  :model="detectionRecords" :rules="rules" ref="detectionRecords">

                                <!-- 第一行 -->
                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测方法</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecord.detectionMethod"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测日期</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecord.detectionDate"></el-input>
                                    </el-col>

                                    <!--第一行-->
                                </el-row>
                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">试剂厂家</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly
                                                      v-model="detectionRecord.reagentsAndManufacturers"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">批号</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecord.batchNumber"></el-input>
                                    </el-col>

                                </el-row>

                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">有效日期</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecord.effectiveDate"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div v-if="detectionRecord.testTime === 4" class="grid-content bg-purple">检测结果(带型)</div>
                                        <div v-else class="grid-content bg-purple">检测结果</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecord.testResult"></el-input>
                                    </el-col>

                                </el-row>

                                <el-row>

                                    <el-col :span="6">
                                        <div  v-if="detectionRecord.testTime === 4" class="grid-content bg-purple">结论</div>
                                        <div  v-else class="grid-content bg-purple">筛查结论</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecord.conclusion"></el-input>
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
                                        <div  v-if="detectionRecord.testTime === 4" class="grid-content bg-purple">结论</div>
                                        <div  v-else class="grid-content bg-purple">检测者</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecord.inspectorName"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">审核者</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecord.inspectorName"></el-input>
                                    </el-col>

                                </el-row>
                            </el-form>
                        </div>

                        <!--输入结果的部分-->
                        <div v-if="testTime < 4" class="grid-content bg-purple-light detection-data-input-area">
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

                                <!--当该样品检测三次后，说明最后一次是确证检测，则给出“结论”的选项-->
                                <el-row v-if="testTime === 3">
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">结论</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select v-model="detectionRecord.conclusion" placeholder="请选择">
                                            <el-option
                                                v-for="item in conclusions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                                <el-row v-else>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">筛查结论</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select v-model="detectionRecord.conclusion" placeholder="请选择">
                                            <el-option
                                                v-for="item in screeningConclusions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="24">

                                        <div class="text-align-right">
                                            本次检测结果输入人：{{ username }}
                                            <el-button type="primary" @click="submitForm('detectionRecord')">保存
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

export default {
    name: "DetectionDataInput",
    components: {NavMenu, SampleInfo},
    data() {
        return {
            detectionRecords: [{
                detectionMethod: '22',
                detectionDate: '',
                reagentsAndManufacturers: '',
                batchNumber: '',
                effectiveDate: '',
                testResult: '',
                conclusion: '',
            },
                {
                    detectionMethod: '33',
                    detectionDate: '',
                    reagentsAndManufacturers: '',
                    batchNumber: '',
                    effectiveDate: '',
                    testResult: '',
                    conclusion: '',
                }],
            detectionRecord: {
                acceptanceNumber: '',
                detectionMethod: 'ELISA',
                detectionDate: '2021-03-19',
                reagentsAndManufacturers: '哈药六厂',
                batchNumber: '990011',
                effectiveDate: '2021-02-11',
                testResult: '有反应',
                conclusion: 'HIV抗体阳性',
                inspectorAccountID: '',
                inspectorName: '',
            },
            testResult: [{
                value: '有反应',
                label: '有反应'
            }, {
                value: '无反应',
                label: '无反应'
            }],
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
            testTime: 0,
            rules: {},
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
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    this.detectionRecord.acceptanceNumber = sessionStorage.getItem("acceptanceNumber")

                    this.detectionRecord.inspectorName = this.$store.getters.getUser.username
                    this.detectionRecord.inspectorAccountID = this.$store.getters.getUser.id
                    const _this = this;
                    console.log(this.detectionRecord)

                    this.$axios.post("/detectionRecord/save", this.detectionRecord).then(res => {
                            console.log(res.data);
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

        let testTime = 0;

        /*获取后面三次发生在确证实验室的检测记录*/
        this.$axios.get("/detectionRecord/getDetectionRecords/" + acceptanceNumber, _this.detectionRecord).then(res => {
                _this.detectionRecords = res.data.data
                _this.testTime = _this.detectionRecords.length

                console.log(testTime);
            }
        );
        if (this.$store.getters.getUser.username) {
            console.log(this.$store.getters.getUser.username)
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