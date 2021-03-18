<template>
    <div>

        <el-container>

            <!--导航栏-->
            <el-header>
                <NavMenu></NavMenu>
            </el-header>

            <!--信息输入页面-->
            <el-main>
                <h1>待处理样品列表</h1>
                <div class="data-show" id="data-show-index">
                    <el-row>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">样品受理编号</div>
                        </el-col>

                        <el-col :span="3">
                            <div class="grid-content bg-purple">姓名</div>
                        </el-col>

                        <el-col :span="9">
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
                        <el-col :span="3">
                            <div class="grid-content bg-purple-light">
                                {{ sampleList.name }}
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="grid-content bg-purple-light">
                                {{ sampleList.currentState }}
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="grid-content bg-purple-light">
                                <el-button type="primary" @click="operation(sampleList.flag,sampleList.acceptanceNumber)">{{ sampleList.operation}}</el-button>
                                <el-button type="info" @click="handleClick(sampleList.acceptanceNumber)">查看</el-button>
                                <el-button type="warning">修改</el-button>
                                <el-button type="danger">删除</el-button>
                            </div>
                        </el-col>
                    </el-row>

                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";

export default {
    name: "Index",
    components: {NavMenu},
    data() {
        return {
            sampleLists: [
                {
                    acceptanceNumber: '1',
                    name: '1',
                    currentState: '1',
                    operation: '1',
                    flag:''
                },
                {
                    acceptanceNumber: '2',
                    name: '2',
                    currentState: '2',
                    operation: '2',
                    flag:''
                }
            ]
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        operation(flag,acceptanceNumber){
            if(flag === 'waitingForTest'){
                sessionStorage.setItem("acceptanceNumber",acceptanceNumber);
                this.$router.push("/DetectionDataInput/"+acceptanceNumber);

            }
        }
    },
    created() {
        const _this = this;
        this.$axios.get("/sampleBasicInfo/getAllOperableSampleList").then(res => {
            _this.sampleLists = res.data.data
            console.log(res.data.data)

        })
    }
}
</script>

<style scoped>

</style>