<template>


    <div>
        <!--显示待处理样品列表-->
        <!--信息输入页面-->
        <h1>待处理样品列表</h1>
        <div class="data-show" id="data-show-index">
            <el-row>
                <el-col :span="3">
                    <div class="grid-content bg-purple">样品受理编号</div>
                </el-col>

                <el-col :span="2">
                    <div class="grid-content bg-purple">姓名</div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">年龄</div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">性别</div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">送检单位</div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">送检样品</div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">状态</div>
                </el-col>

                <el-col :span="9">
                    <div class="grid-content bg-purple">操作</div>
                </el-col>

                <!--第一行-->
            </el-row>

            <el-row v-for="sampleList in sampleLists">
                <el-col :span="3">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.acceptanceNumber }}
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.name }}
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.age }}
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.sex }}
                    </div>
                </el-col>

                <el-col :span="2">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.inspectionUnit }}
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.sampleType }}
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                        {{ sampleList.currentState }}
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-purple-light">
                        <el-button-group>
                            <el-tooltip placement="left">
                                <div slot="content">{{ sampleList.operation }}</div>
                                <el-button class="operation"
                                           type="primary"
                                           icon="el-icon-mouse"
                                           @click="operation(sampleList.flag,sampleList.acceptanceNumber)">
                                </el-button>
                            </el-tooltip>
                            <el-button type="primary"
                                       icon="el-icon-view"
                                       @click="infoShow(sampleList.acceptanceNumber)"></el-button>

                            <el-drawer
                                :visible.sync="drawer"
                                :direction="direction"
                                size="60%"
                                :destroy-on-close="true"
                                :before-close="handleClose">
                                <el-container>

                                    <el-main><info-show></info-show></el-main>
                                </el-container>

                            </el-drawer>

                            <el-button type="primary"
                                       icon="el-icon-edit"
                                       @click="infoEdit(sampleList.acceptanceNumber)"></el-button>
                            <el-button type="primary"
                                       icon="el-icon-delete"
                                       @click="infoDelete(sampleList.acceptanceNumber)"></el-button>
                        </el-button-group>
                    </div>
                </el-col>
            </el-row>


        </div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-light text-align-right data-show">
                    <el-button class="operation"
                               type="primary"
                               icon="el-icon-plus"
                               @click="addSample()">
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import InfoShow from "@/components/InfoShow";

export default {
    name: "SampleList",
    components: {InfoShow},
    data() {
        return {
            sampleLists: [
                {currentState: ''}
            ],
            dialogVisible: false,
            drawer: false,
            direction: 'ltr',
        }
    },
    methods: {
        handleClose(done) {
            done();
        },
        infoShow(acceptanceNumber) {
            this.drawer = true
            sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
        },

        addSample(){
            this.$router.push('/SampleInput/')
        },
        infoEdit(acceptanceNumber) {
            sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
            this.$router.push("/InfoEdit/" + acceptanceNumber);
        },
        operation(flag, acceptanceNumber) {
            if (flag === 'waitingForTest') {
                sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
                this.$router.push("/DetectionDataInput/" + acceptanceNumber);
            }
            if (flag === 'waitingForReview') {
                sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
                this.$router.push("/DetectionDataReview/" + acceptanceNumber);
            }
            if (flag === 'waitingForOutput') {
                sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
                this.$axios.get("/report/confReportOutput/"+ acceptanceNumber).then(res => {
                        // console.log(res.data);
                    }
                )
            }
        },
        infoDelete(acceptanceNumber) {
            const _this = this
            sessionStorage.setItem("acceptanceNumber", acceptanceNumber);
            this.$confirm('此操作将删除该样品信息，不可恢复，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                _this.$axios.get("/sampleBasicInfo/delete/"+ acceptanceNumber).then(res => {
                        // console.log(res.data);
                    }
                )

                this.$message({
                    type: 'success',
                    message: '删除成功!',
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
    created() {
        const _this = this;

        const path = this.$route.path.split('/')[1];

        if (path === "Index")
            this.$axios.get("/sampleBasicInfo/getAllOperableSampleList").then(res => {
                _this.sampleLists = res.data.data
            })

//        审核样品的功能暂时取消
        /*
                if(path === "DetectionDataReview")
                    this.$axios.get("/sampleBasicInfo/getAllReviewableSampleList").then(res => {
                        _this.sampleLists = res.data.data
                    })
        */

        if (path === "DetectionDataInput")
            this.$axios.get("/sampleBasicInfo/getAllDetectableSampleList").then(res => {
                _this.sampleLists = res.data.data
            })

    }
}
</script>

<style scoped>

</style>