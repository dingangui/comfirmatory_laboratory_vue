<template>


    <div>
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
                        <el-button type="primary" @click="operation(sampleList.flag,sampleList.acceptanceNumber)">
                            {{ sampleList.operation }}
                        </el-button>
                        <el-button type="info" @click="handleClick(sampleList.acceptanceNumber)">查看</el-button>
                        <el-button type="warning">修改</el-button>
                        <el-button type="danger">删除</el-button>
                    </div>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>

export default {
    name: "SampleList",
    data() {
        return {
            sampleLists: []
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
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
                this.$router.push("/FormOutput/" + acceptanceNumber);
            }
        }
    },
    created() {
        const _this = this;

        const path = this.$route.path.split('/')[1];

        if(path === "Index")
        this.$axios.get("/sampleBasicInfo/getAllOperableSampleList").then(res => {
            _this.sampleLists = res.data.data
        })

        if(path === "DetectionDataReview")
            this.$axios.get("/sampleBasicInfo/getAllReviewableSampleList").then(res => {
                _this.sampleLists = res.data.data
            })

        if(path === "DetectionDataInput")
            this.$axios.get("/sampleBasicInfo/getAllDetectableSampleList").then(res => {
                _this.sampleLists = res.data.data
            })

    }
}
</script>

<style scoped>

</style>