<template>
    <div>

        <el-container>

            <!--导航栏-->
            <el-header>
                <NavMenu></NavMenu>
            </el-header>

            <!--信息输入页面-->
            <el-main class="sample-input">

                <!--标题和编号显示-->
                <h1>样品基本信息录入</h1>
                <div class="text-align-right">样品受理编号：{{ acceptanceNumber }}</div>

                <!--表单输入界面-->
                <div>
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


                    </el-form>


                    <div v-show="true" class="grid-content bg-purple-light detection-data-input-area">
                        <h1 v-show="true">筛查实验室筛查检测结果录入</h1>
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

                                <el-col :span="12">
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
                                    <el-form-item label="检测者" prop="reviewerName">
                                        <el-input v-model="detectionRecord.inspectorName"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="审核者" prop="reviewerName">
                                        <el-input v-model="detectionRecord.reviewerName"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <el-row>
                            <el-col :span="24">
                                <div class="text-align-right">
                                    <el-button type="primary" @click="submitForm('sampleBasicInfo', 'detectionRecord')">
                                        保存
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>

import NavMenu from "@/components/NavMenu";

export default {

    name: "SampleInput",
    components: {NavMenu},
    data() {
        return {
            sampleBasicInfo: {
                inspectionUnit: '第一医院',
                inspectionDate: new Date,
                sampleType: '血液',
                inspectedType: '门诊',
                name: '王铅华',
                sex: '男',
                age: '29',
                profession: '工人',
                country: '中国',
                nation: '汉',
                marriage: '已婚',
                educationalLevel: '高中',
                IDNumber: '155547196805232241',
                phone: '18566589632',
                presentAddress: '河北省邢台市XX村',
                residenceAddress: '四川省攀枝花市XX镇',
                dataEntryStaffName: '',
                dataEntryStaffAccountID: ''
            },
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
            acceptanceNumber: '',
            testResult: [{
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
                ]
            },

            pickerOptions
    :
        {
            disabledDate(time)
            {
                return time.getTime() > Date.now();
            }
        ,
            [{
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
        submitForm(sampleBasicInfo, detectionRecord) {

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
                    this.$axios.post("/sampleBasicInfo/save", this.sampleBasicInfo).then(res => {
                            console.log(res.data.msg);
                            // console.log(res.data);
                        }
                    )
                } else {
                    alert('error submit!!');
                    return false;
                }
            });

            this.$refs[detectionRecord].validate((valid) => {
                if (valid) {
                    this.detectionRecord.inspectorName = this.$store.getters.getUser.username
                    this.detectionRecord.inspectorAccountID = this.$store.getters.getUser.id
                    this.detectionRecord.acceptanceNumber = this.acceptanceNumber

                    sessionStorage.setItem("acceptanceNumber", this.acceptanceNumber)

                    const _this = this;

                    this.$axios.post("/detectionRecord/save", this.detectionRecord).then(res => {
                            alert(res.data.msg);
                            _this.$router.push("/DetectionDataInput/" + _this.acceptanceNumber);
                        }
                    )
                } else {
                    alert('error submit!!');
                    return false;
                }
            });

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
        const _this = this
        this.$axios.get("/sampleBasicInfo/getAcceptanceNumber").then(res => {
                _this.acceptanceNumber = res.data.data;
            }
        )
        if (this.$store.getters.getUser.username) {
            this.username = this.$store.getters.getUser.username
        }
    }
}
</script>

<style scoped>

</style>