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
                    <div class="grid-content bg-purple sample-info-div">

                        <!-- 表单 快速填写样品基本信息 -->
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

                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">本样品信息录入员</div>
                                </el-col>
                                <el-col :span="12">
                                    <el-input readonly v-model="sampleBasicInfo.dataEntryStaffName"></el-input>
                                </el-col>
                            </el-row>
                            <!-- 表单 快速填写样品基本信息 -->
                        </el-form>

                        <!-- 负责左侧布局管理的 div -->
                    </div>
                    <!-- 左侧，样品基本信息显示 -->
                </el-col>


                <!-- 右侧 检测数据输入栏  -->
                <el-col :span="12" class="data-input">
                    <div class="grid-content bg-purple-light">

                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple">户籍地址</div>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="sampleBasicInfo.residenceAddress"></el-input>
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

export default {
    name: "DetectionDataInput",
    components: {NavMenu},
    data() {
        return {
            sampleBasicInfo: {
                inspectionUnit: ""
            },
            rules: {}
        }
    },
    created() {
        const _this = this
        this.$axios("/sample-basic-info/getSampleInfoByAcceptanceNumber/2021 - 14").then(res => {
                console.log(res.data.data)
                _this.sampleBasicInfo = res.data.data
            }
        )
    }

}
</script>

<style scoped>


.el-input__inner {
    padding: 0;
}

</style>