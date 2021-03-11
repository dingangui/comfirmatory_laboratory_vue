<template>
  <!--  最外层 唯一 div -->
  <div>
    <!-- 唯一 div 内负责布局管理的 -->
    <el-container>

      <!-- 导航栏 -->
      <el-header>Header</el-header>

      <!-- 唯一 div 内负责布局管理的，分为导航栏和主区域 -->
      <el-container>

        <!-- 左侧，样品基本信息显示 -->
        <el-col :span="12">

          <!-- 负责左侧布局管理的 div -->
          <div class="grid-content bg-purple">

            <!-- 表单 快速填写样品基本信息 -->
            <el-form :model="sampleBasicInfo" ref="sampleBasicInfo">


              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">送检单位</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">
                    <el-input v-model="sampleBasicInfo.inspectionUnit"></el-input>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">送检日期</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{ inspectionDate }}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">送检样品</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{ sampleType }}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">送检人群</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{ inspectedType }}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3">
                  <div class="grid-content bg-purple">姓名</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ name }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">性别</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ sex }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">年龄</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ age }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">职业</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ profession }}</div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3">
                  <div class="grid-content bg-purple">国籍</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ country }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">民族</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ nation }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">婚姻状况</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ marriage }}</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple">文化程度</div>
                </el-col>
                <el-col :span="3">
                  <div class="grid-content bg-purple-light">{{ educationalLevel }}</div>
                </el-col>
              </el-row>

              <!-- 表单 快速填写样品基本信息 -->
            </el-form>

            <!-- 负责左侧布局管理的 div -->
          </div>
          <!-- 左侧，样品基本信息显示 -->
        </el-col>

        <el-col :span="1">
          <div class="grid-content bg-purple-light"></div>
        </el-col>

        <!-- 右侧 -->
        <el-col :span="12">
          <div class="grid-content bg-purple-light"></div>

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
export default {
  name: "DetectionDataInput",
  data() {
    return {
      sampleBasicInfo: {
        inspectionUnit: ""
      }
    };
  },
  created() {
    const _this = this
    this.$axios("/sample-basic-info/getSampleInfoByAcceptanceNumber/2021 - 10").then(res => {
          console.log(res.data.data)
          _this.sampleBasicInfo = res.data.data
        }
    )
  }

}
</script>

<style scoped>
.el-col {
  border: solid 1px #000;
  height: 50px;
}
</style>