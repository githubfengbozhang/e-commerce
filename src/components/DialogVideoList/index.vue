<template>
  <div class="vide">
    <div @click="clickVideo">
      <div class="dialog-video">
        <img :src="src" />
      </div>
      {{url}}
      <!-- <div class="text">位置{{index}}</div> -->
    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               v-if="dialogVisible"
               width="70%">
      <card-player :videoUrl="video"></card-player>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CardPlayer from "@/components/Video/CardPlayer";
import axios from "axios";

export default {
  name: "DialogVideo",
  components: { CardPlayer },
  props: {
    propsVideo: Object
  },
  data () {
    return {
      // url:
      //   "http://192.168.1.12:38080/iscvideo/http-flv/live/A010102-00001.flv?vhost=zlmediakit",
      url: "",
      src: '',
      img1: require("../../assets/img/sp1.png"),
      img2: require("../../assets/img/sp2.png"),
      img3: require("../../assets/img/sp3.png"),
      img4: require("../../assets/img/sp4.png"),
      img5: require("../../assets/img/sp5.png"),
      dialogVisible: false,
      video: "",
      index: ""
    };
  },
  watch: {
    propsVideo: {
      immediate: true,
      handler (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.video = newValue.url;
          this.index = newValue.id;
          switch (this.index) {
            case 2:
              this.src = this.img1;
              break;
            case 5:
              this.src = this.img2;
              break;
            case 6:
              this.src = this.img3;
              break;
            case 7:
              this.src = this.img4;
              break;
            case 8:
              this.src = this.img5;
              break;
          }
        }
      }
    }
  },
  mounted () { },
  methods: {
    clickVideo () {
      this.vide(this.video, this.index);
    },
    vide (video, id) {
      let that = this;
      axios
        .get(
          `http://61.161.91.90:38080/iscvideo/api/baseinfo/local/getCamStreamUrlByAssetNo?assetNo=${video}&protocol=HTTP_FLV&streamType=MAIN`
        )
        .then(res => {
          if (res.data) {
            let url = `http://61.161.91.90:38080${res.data}`;
            that.video = url;
            that.index = id;
            that.dialogVisible = true;
          }
        });
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
