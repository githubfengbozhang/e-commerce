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
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option label="1"
                     value="1"></el-option>
          <el-option label="2"
                     value="2"></el-option>
          <el-option label="3"
                     value="3"></el-option>
        </el-select>
        <el-button class="button-query">搜索</el-button>
      </div>
    </div>
    <div class="flex">
      <div class="circular-fir-maxBox">
        <DialogVideo v-for="(item,index) in list"
                     :key="index"
                     :propsVideo="item"
                     @click="clickVideo(item.url)" />
      </div>
    </div>
  </div>
</template>
<script>
import DialogVideo from "../../components/DialogVideoList/index";
import axios from 'axios'

export default {
  name: "",
  components: {
    DialogVideo
  },
  data () {
    return {
      videoList: [
        {
          url:
            "A010102-00008",
          id: 8
        },
        {
          url:
            "A010102-00007",
          id: 7
        },
        {
          url:
            "A010102-00006",
          id: 6
        },
        {
          url:
            "A010102-00005",
          id: 5
        },
        {
          url:
            "A010102-00002",
          id: 2
        }
      ],
      list: []
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    clickVideo (video) {
      debugger

      this.vide(video)
    },
    init () {
      this.videoList.map((item, index) => {
        this.vide(item.url, item.id);
      })
    },
    vide (video, id) {
      debugger
      let that = this
      axios.get(`/iscvideo/iscvideo/api/baseinfo/local/getCamStreamUrlByAssetNo?assetNo=${video}&protocol=HTTP_FLV&streamType=MAIN`).then(res => {
        if (res.data) {
          let url = `http://61.161.91.90:38080${res.data}`;
          let temp = {
            url,
            id
          }
          that.list.push(temp)
        }


      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>