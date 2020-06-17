<template>
  <div>
    <div class="header">
      <span>视频监控管理</span>
    </div>
    <div class="flex">
      <div class="circular-fir-max">
        <div class="name">视频监控</div>
        <div class="info">
          <span class="info-name">设备总数：</span>
          <span class="number">145</span>
          <span>（个）</span>
          <span class="space"></span>
          <span class="info-name">设备异常：</span>
          <span class="number1">4</span>
          <span>（个）</span>
          <span class="space"></span>
          <span class="open">开:</span>
          <span class="open">4</span>
          <span class="close">关:</span>
          <span class="numbcloseer2">4</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="circular-fir-min">
        <span class="selectText">选择编号</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
        <el-button class="button-query">搜索</el-button>
      </div>
    </div>
    <div class="flex">
      <div class="circular-fir-maxBox">
        <DialogVideo v-for="(item,index) in videoList" :key="index" :propsVideo="item" />
      </div>
    </div>
  </div>
</template>
<script>
import DialogVideo from "../../components/DialogVideoList/index";

export default {
  name: "",
  components: {
    DialogVideo
  },
  data() {
    return {
      videoList: [
        {
          url:
            "http://61.168.1.12:38080/iscvideo/http-flv/live/A010102-00003.flv?vhost=zlmediakit",
          id: 1
        },
        {
          url:
            "http://61.168.1.12:38080/iscvideo/http-flv/live/A010102-00004.flv?vhost=zlmediakit",
          id: 2
        },
        {
          url:
            "http://61.168.1.12:38080/iscvideo/http-flv/live/A010102-00005.flv?vhost=zlmediakit",
          id: 3
        },
        {
          url:
            "http://61.168.1.12:38080/iscvideo/http-flv/live/A010102-00006.flv?vhost=zlmediakit",
          id: 4
        },
        {
          url:
            "http://61.168.1.12:38080/iscvideo/http-flv/live/A010102-00002.flv?vhost=zlmediakit",
          id: 5
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>