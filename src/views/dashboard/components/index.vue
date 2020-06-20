<template>
  <div>
    <el-form ref="form"
             :inline="true"
             :model="form"
             label-width="120px">
      <el-form-item label="直播参观日期1">
        <el-input v-model="form.broadcast[0].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数1">
        <el-input v-model="form.broadcast[0].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期2">
        <el-input v-model="form.broadcast[1].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数2">
        <el-input v-model="form.broadcast[1].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期3">
        <el-input v-model="form.broadcast[2].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数3">
        <el-input v-model="form.broadcast[2].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期4">
        <el-input v-model="form.broadcast[3].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数4">
        <el-input v-model="form.broadcast[3].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期5">
        <el-input v-model="form.broadcast[4].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数5">
        <el-input v-model="form.broadcast[4].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期6">
        <el-input v-model="form.broadcast[5].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数6">
        <el-input v-model="form.broadcast[5].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-form-item label="直播参观日期7">
        <el-input v-model="form.broadcast[6].day"
                  placeholder="请输入直播参观日期"></el-input>
      </el-form-item>
      <el-form-item label="直播参观人数7">
        <el-input v-model="form.broadcast[6].number"
                  placeholder="请输入直播参观人数"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="销售数量1">
        <el-input v-model="form.phbList[0].number"
                  placeholder="请输入销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售类别1">
        <el-input v-model="form.phbList[0].phb"
                  placeholder="请输入销售类别"></el-input>
      </el-form-item>
      <el-form-item label="销售数量2">
        <el-input v-model="form.phbList[1].number"
                  placeholder="请输入销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售类别2">
        <el-input v-model="form.phbList[1].phb"
                  placeholder="请输入销售类别"></el-input>
      </el-form-item>
      <el-form-item label="销售数量3">
        <el-input v-model="form.phbList[2].number"
                  placeholder="请输入销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售类别3">
        <el-input v-model="form.phbList[2].phb"
                  placeholder="请输入销售类别"></el-input>
      </el-form-item>
      <el-form-item label="销售数量4">
        <el-input v-model="form.phbList[3].number"
                  placeholder="请输入销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售类别4">
        <el-input v-model="form.phbList[3].phb"
                  placeholder="请输入销售类别"></el-input>
      </el-form-item>
      <el-form-item label="销售数量5">
        <el-input v-model="form.phbList[4].number"
                  placeholder="请输入销售数量"></el-input>
      </el-form-item>
      <el-form-item label="销售类别5">
        <el-input v-model="form.phbList[4].phb"
                  placeholder="请输入销售类别"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="当天销售总额">
        <el-input v-model="form.zje"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js">
</script>