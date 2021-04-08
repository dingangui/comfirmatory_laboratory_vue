<template>
    <el-container>

        <!--导航栏-->
        <el-header>
            <NavMenu></NavMenu>
        </el-header>
        <el-main>
            <el-page-header @back="goBack" content="修改样品数据">
            </el-page-header>
            <br/>
            <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="修改样品基本信息" name="1">
                    <!--标题和编号显示-->
                    <h2>样品基本信息</h2>

                    <div>样品受理编号：{{ acceptanceNumber }}</div>

                    <!--表单输入界面-->
                    <div class="sample-input">
                        <el-form :model="sampleBasicInfo"
                                 :rules="rules"
                                 ref="sampleBasicInfo"
                                 label-width="100px">

                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送检单位" prop="inspectionUnit">
                                            <el-input v-model="sampleBasicInfo.inspectionUnit"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="送检日期" prop="inspectionDate">
                                            <el-date-picker
                                                v-model="sampleBasicInfo.inspectionDate"
                                                align="left"
                                                type="date"
                                                placeholder="选择日期"
                                                size="large"
                                                :picker-options="pickerOptions">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送检样品" prop="sampleType">
                                            <el-input v-model="sampleBasicInfo.sampleType"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="送检人群" prop="inspectedType">
                                            <el-input v-model="sampleBasicInfo.inspectedType"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="姓名" prop="name">
                                            <el-input v-model="sampleBasicInfo.name"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="年龄" prop="age">
                                            <el-input v-model="sampleBasicInfo.age"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="性别" prop="sex">
                                            <el-select v-model="sampleBasicInfo.sex" placeholder="请选择">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="职业" prop="profession">
                                            <el-input v-model="sampleBasicInfo.profession"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="国籍" prop="country">
                                            <el-input v-model="sampleBasicInfo.country"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="民族" prop="nation">
                                            <el-input v-model="sampleBasicInfo.nation"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="婚姻状况" prop="marriage">
                                            <el-input v-model="sampleBasicInfo.marriage"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="文化程度" prop="educationalLevel">
                                            <el-input v-model="sampleBasicInfo.educationalLevel"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="身份证号" prop="IDNumber">
                                            <el-input v-model="sampleBasicInfo.IDNumber"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                        <el-form-item label="联系电话" prop="phone">
                                            <el-input v-model="sampleBasicInfo.phone"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-form-item label="现住址" prop="presentAddress">
                                    <el-input v-model="sampleBasicInfo.presentAddress"></el-input>
                                </el-form-item>
                            </el-row>

                            <el-row>
                                <el-form-item label="户籍住址" prop="residenceAddress">
                                    <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="text-align-right">
                                        <el-button type="primary" @click="updateSampleInfo('sampleBasicInfo')">修改
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>

                    </div>

                </el-collapse-item>
                <el-collapse-item v-for="detectionRecord in detectionRecords"
                                  v-name=detectionRecord.sequence>
                    <template slot="title">
                        修改
                        <span v-if="detectionRecord.sequence === 1">筛查检测结果</span>
                        <span v-if="detectionRecord.sequence === 2">第一次复检结果</span>
                        <span v-if="detectionRecord.sequence === 3">第二次复检结果</span>
                        <span v-if="detectionRecord.sequence === 4">确证检测结果</span>
                    </template>

                    <div class="grid-content bg-purple-light detection-data-input-area sample-input">
                        <h2 v-if="detectionRecord.sequence === 1">筛查实验室筛查检测结果</h2>
                        <h2 v-if="detectionRecord.sequence === 2">第一次复检结果</h2>
                        <h2 v-if="detectionRecord.sequence === 3">第二次复检结果</h2>
                        <h2 v-if="detectionRecord.sequence === 4">确证检测结果</h2>

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

                                <el-col :span="12" v-if="detectionRecord.sequence === 4">
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
                                        <el-form-item prop="conclusion" label="结论"
                                                      v-if="detectionRecord.sequence === 4">
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
                                        <el-button type="primary"
                                                   @click="updateDetectionRecord('detectionRecord',detectionRecord.sequence)">
                                            修改
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>
                    </div>

                </el-collapse-item>

            </el-collapse>


        </el-main>
    </el-container>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
    name: "InfoEdit",
    components: {NavMenu},
    data() {
        return {
            sampleBasicInfo: {},
            detectionRecords: {},
            acceptanceNumber: '',
            detectionRecord: {
                acceptanceNumber: '',
                detectionMethod: 'ELISA',
                detectionDate: new Date,
                reagentsAndManufacturers: '哈药六厂',
                batchNumber: '990011',
                effectiveDate: '2021-02-11',
                testResult: '有反应',
                conclusion: 'HIV抗体阳性',
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
            options: [{
                value: '男',
                label: '男'
            }, {
                value: '女',
                label: '女'
            }],
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
                ], inspectorName: [
                    {required: true, message: '请选择检测者姓名', trigger: 'change'},
                ], reviewerName: [
                    {required: true, message: '请选择审核者姓名', trigger: 'change'},
                ], conclusion: [
                    {required: true, message: '请输入结论', trigger: 'change'},
                ]
            },

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
            activeNames: ['1']
        }
    },
    methods: {
        /*
        多个表单在遍历中的校验实现过程

        */
        updateDetectionRecord(detectionRecord, sequence) {
            const _this = this

            this.$refs[detectionRecord][sequence - 1].validate((valid) => {
                if (valid) {
                    console.log(this.detectionRecords[sequence - 1]);
                    this.$axios.post("/detectionRecord/update", this.detectionRecords[sequence - 1]).then(res => {
                            alert(res.data.msg);
                            // console.log(res.data);
                            _this.$router.push('/DetectionDataInput/'+this.acceptanceNumber)

                        }
                    )
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        updateSampleInfo(sampleBasicInfo) {
            const _this = this

            this.$refs[sampleBasicInfo].validate((valid) => {
                if (valid) {

                    this.sampleBasicInfo.acceptanceNumber = this.acceptanceNumber
                    this.sampleBasicInfo.dataEntryStaffName = this.$store.getters.getUser.username
                    this.sampleBasicInfo.dataEntryStaffAccountID = this.$store.getters.getUser.id
                    // alert('提交成功!');
                    /*
                    * post 中的 this.sampleBasicInfo 表示 post 提交到对应链接时的内容
                    * res 是从链接返回来的数据
                    *
                    * 引入 axios.js 后，就可以不用在 url 中写上 http://localhost:5000 了
                    * 引入 axios.js 需要 在main.js 中 import "./axios"
                    * */
                    this.$axios.post("/sampleBasicInfo/update", this.sampleBasicInfo).then(res => {
                            alert(res.data.msg);
                            // console.log(res.data);
                            _this.$router.push('/DetectionDataInput/'+this.acceptanceNumber)
                        }
                    )

                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        goBack() {
            history.go(-1);
        }
    },
    created() {
        let acceptanceNumber = sessionStorage.getItem("acceptanceNumber")
        this.acceptanceNumber = acceptanceNumber;
        const _this = this
        this.$axios.get("/sampleBasicInfo/getSampleInfo/" + acceptanceNumber).then(res => {
            _this.sampleBasicInfo = res.data.data
        })

        this.$axios.get("/detectionRecord/getDetectionRecords/" + acceptanceNumber).then(res => {
            _this.detectionRecords = res.data.data
        })

    }
}
</script>

<style scoped>

</style>