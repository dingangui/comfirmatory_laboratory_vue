<template>
    <!--  最外层 唯一 div -->
    <div class="detection-data-input">
        <!-- 唯一 div 内负责布局管理的 -->
        <el-container>

            <!-- 导航栏 -->
            <el-header>
                <NavMenu></NavMenu>
            </el-header>

            <!-- 唯一 div 内负责布局管理的，分为导航栏和主区域 -->
            <el-container>

                <!-- 左侧，样品基本信息显示 -->
                <el-col :span="12" class="sample-info">

                    <!-- 负责左侧布局管理的 div -->
                    <div class="grid-content bg-purple">

                        <SampleInfo></SampleInfo>

                        <!-- 负责左侧布局管理的 div -->
                    </div>
                    <!-- 左侧，样品基本信息显示 -->
                </el-col>


                <!-- 右侧 检测检测结果显示和输入栏  -->
                <el-col :span="12" class="data-input">

                    <div class="grid-content bg-purple-light">
                        <h1 v-show="true">初筛数据输入</h1>
                        <h1 v-show="false">第一次复检结果输入</h1>
                        <h1 v-show="false">第二次复检结果输入</h1>
                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">检测方法</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="detectionRecords.residenceAddress"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">检测日期</div>
                            </el-col>
                            <el-col :span="6">
                                <el-date-picker
                                    v-model="detectionRecords.inspectionDate"
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
                                <el-input v-model="detectionRecords.residenceAddress"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">批号</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="detectionRecords.residenceAddress"></el-input>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">有效日期</div>
                            </el-col>
                            <el-col :span="6">
                                <el-date-picker
                                    v-model="detectionRecords.inspectionDate"
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
                                <el-select v-model="detectionRecords.sex" placeholder="请选择">
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
                                <div class="grid-content bg-purple">筛查结论</div>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="detectionRecords.sex" placeholder="请选择">
                                    <el-option
                                        v-for="item in conclusions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <div class="username">
                                    本次检测结果输入人：{{ username }}
                                </div>
                            </el-col>

                        </el-row>


                    </div>

                    <!-- 右侧 -->
                </el-col>
                <!-- 负责布局管理，其中分为左右各一半两个区域 -->
            </el-container>

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
            detectionRecords:{
            },
            testResults: [{
                value: '有反应',
                label: '有反应'
            }, {
                value: '无反应',
                label: '无反应'
            }],
            conclusions:[{
                value: 'HIV抗体阴性',
                label: 'HIV抗体阴性'
            },{
                value: 'HIV抗体阳性',
                label: 'HIV抗体阳性'
            },{
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