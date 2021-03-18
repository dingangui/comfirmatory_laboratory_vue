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

                        <div class="data-show" v-show="false">
                            <h1 v-show="false">第一次复检结果</h1>
                            <h1 v-show="false">第二次复检结果</h1>
                            <h1>确证检测结果</h1>
                            <!-- 表单 快速填写样品基本信息 -->
                            <el-form :model="detectionRecords" :rules="rules" ref="sampleBasicInfo"
                                     class="sample-info-form">

                                <!-- 第一行 -->
                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测方法</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecords[0].detectionMethod"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测日期</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecords.detectionDate"></el-input>
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
                                                      v-model="detectionRecords.reagentsAndManufacturers"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">批号</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecords.batchNumber"></el-input>
                                    </el-col>

                                </el-row>

                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">有效日期</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecords.effectiveDate"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测结果</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecords.testResults"></el-input>
                                    </el-col>

                                </el-row>

                                <el-row>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测结论</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple-light">
                                            <el-input readonly v-model="detectionRecords.conclusion"></el-input>
                                        </div>
                                    </el-col>

                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">送检日期</div>
                                    </el-col>

                                    <el-col :span="6">
                                        <el-input readonly v-model="detectionRecords.testResults"></el-input>
                                    </el-col>

                                </el-row>
                            </el-form>
                        </div>

                        <div v-show="true" class="grid-content bg-purple-light detection-data-input-area">
                            <h1 v-show="true">第一次复检结果输入</h1>
                            <h1 v-show="false">第二次复检结果输入</h1>
                            <el-form :model="detectionRecord" :rules="rules" ref="sampleBasicInfo"
                                     class="sample-info-form">
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
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测结果</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-select v-model="detectionRecord.testResults" placeholder="请选择">
                                            <el-option
                                                    v-for="item in testResults"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">检测结论</div>
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

                                <el-row>
                                    <el-col :span="24">

                                        <div class="text-align-right">
                                            本次检测结果输入人：{{ username }}
                                            <el-button type="primary" @click="submitForm('sampleBasicInfo')">保存</el-button>
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
                    testResults: '',
                    conclusion: '',
                },
                    {
                        detectionMethod: '33',
                        detectionDate: '',
                        reagentsAndManufacturers: '',
                        batchNumber: '',
                        effectiveDate: '',
                        testResults: '',
                        conclusion: '',
                    }],
                detectionRecord:{
                    acceptanceNumber:'',
                    detectionMethod: '22',
                    detectionDate: '',
                    reagentsAndManufacturers: '',
                    batchNumber: '',
                    effectiveDate: '',
                    testResults: '',
                    conclusion: '',
                    inspectorAccountID:'',
                    inspectorName:'',
                },
                testResults: [{
                    value: '有反应',
                    label: '有反应'
                }, {
                    value: '无反应',
                    label: '无反应'
                }],
                conclusions: [{
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

                        this.$axios.post("/detectionRecords/save", this.detectionRecord).then(res => {
                                alert(res.data.msg);
                                console.log(res.data);
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
            // this.$axios.get("/detectionRecords/selectAll").then(res => {
            //         console.log(res.data.data)
            //         _this.sampleBasicInfo = res.data.data
            //
            //     }
            // )
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