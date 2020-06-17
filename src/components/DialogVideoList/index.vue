<template>
  <div class="vide">
    <div @click="dialogVisible=true">
      <div class="dialog-video">
        <img :src="src" />
      </div>
      <div class="text">位置{{index}}</div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <card-player :videoUrl="video"></card-player>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CardPlayer from "@/components/Video/CardPlayer";

export default {
  name: "DialogVideo",
  components: { CardPlayer },
  props: {
    propsVideo: Object
  },
  data() {
    return {
      url:
        "http://192.168.1.12:38080/iscvideo/http-flv/live/A010102-00001.flv?vhost=zlmediakit",
      src: require("../../assets/img/vide.png"),
      dialogVisible: false,
      video: "",
      index: ""
    };
  },
  watch: {
    propsVideo: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.video = newValue.url;
          this.index = newValue.id;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.vide {
  cursor: pointer;
}
.dialog-video {
  width: 300px;
  height: 201px;
  margin: 20px 10px;
  img {
    width: 100%;
    height: 100%;
    border: 1px dashed white;
  }
}
.text {
  width: 300px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
}
/deep/ .el-dialog__body {
  height: 430px;
  .video-card {
    top: 5px;
    left: 0px;
  }
}
</style>
