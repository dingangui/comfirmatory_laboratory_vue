<template>
    <div>
        <el-container>

            <el-header>
                <NavMenu></NavMenu>
            </el-header>

            <!--信息修改页面-->
            <el-main class="sample-input">

                <!--标题和编号显示-->
                <h1>修改样品基本信息</h1>
                <div class="text-align-right">样品受理编号：{{ acceptanceNumber }}</div>

                <el-form :model="sampleBasicInfo" :rules="rules" ref="sampleBasicInfo" label-width="100px"
                         class="demo-ruleForm">

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

                    <el-form-item label="现住址" prop="presentAddress">
                        <el-input v-model="sampleBasicInfo.presentAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="户籍住址" prop="residenceAddress">
                        <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('sampleBasicInfo')">修改</el-button>
                        <el-button @click="cancel()">取消修改</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import NavMenu from "@/components/NavMenu";

    export default {
        components: {NavMenu},
        name: "SampleInfoUpdate",
        data() {
            return {
                sampleBasicInfo: {},
                acceptanceNumber: '',
                options: [{
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }],

                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

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
                                console.log(res.data);
                            }
                        )
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel() {
                this.$router.push("/");
            }
        },
        created() {
            const acceptanceNumber = this.$route.params.AcceptanceNumber
            const _this = this
            _this.acceptanceNumber = acceptanceNumber;


        }
    }
</script>

<style scoped>

</style>