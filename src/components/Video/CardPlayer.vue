<template>
  <div :id="flvJsId + 'card'"
       v-loading="loading"
       class="video-card"
       :class="{ active: isActive }"
       element-loading-text="拼命加载中"
       element-loading-background="transparent"
       @click="$emit('click')">
    <div v-if="error"
         class="center-holder ellipsis">
      {{ error }}
    </div>
    <template v-else>
      <core ref="videoPlayerCore"
            class="video-card-core"
            :controls="false"
            :flv-js-id="flvJsId"
            @ready="videoReady"
            @error="videoError"></core>
    </template>
    <div v-if="!loading"
         class="video-card-footer app-row px-4"
         :class="{ freeze: recordState !== 'disable' || controlling }">
      <div class="spacer"></div>
      <span class="fz-12 mr-16">{{ layoutData.showName }}</span>
      <svg-icon size="18"
                name="screen-capture"
                class="mr-16"
                @click.native="capture"></svg-icon>
      <svg-icon size="18"
                :name="fullscreen ? 'fullscreen-exit' : 'fullscreen'"
                class="mr-16"
                @click.native="toggleFullscreen"></svg-icon>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../SvgIcon'
import Core from './Core'
export default {
  name: 'CardPlayer',
  components: { SvgIcon, Core },
  props: {
    layoutData: {
      type: Object,
      default: () => ({
        height: 478,
        width: 612,
        left: 250,
        top: 50,
        alarm: false,
        value: '',
        windowsContentTypeEnum: '',
        showName: ''
      })
    },
    isActive: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: -1
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    recordState: 'disable', // disable | recording | ending | ended
    recordingId: '',
    recordSeconds: 0,
    error: '',
    loading: false,
    controlling: false,
    url: '',
    playerReady: false,
    pollGroupData: { cycle: 10 },
    pollGroupTime: 0,
    pollGroupCurrentIndex: -1,
    pollMode: false,
    isPollGroup: false,
    tempFlvJsId: '',
    fullscreen: false
  }),
  computed: {
    flvJsId () {
      const layoutData = Object.assign({}, this.layoutData)
      if (!layoutData.value) {
        layoutData.value = this.isPollGroup ? 'temp-pollGroup' : 'temp'
      }
      return (
        layoutData.value +
        '' +
        layoutData.left +
        layoutData.top +
        layoutData.width +
        layoutData.height
      )
        .split('.')
        .join('-')
    }
  },
  watch: {
    isActive (v) {
      if (!v) {
        this.controlling = false
      }
    }
  },
  async created () {
    this.setVideo(this.layoutData.value)
  },
  mounted () {
    const elem = document.getElementById(this.flvJsId + 'card')
    elem.onfullscreenchange = event => {
      const elem = event.target
      this.fullscreen = document.fullscreenElement === elem
    }
  },
  beforeRouteLeave () { },
  beforeDestroy () {
    this.pollMode = false
  },
  methods: {
    // video就绪
    videoReady () {
      this.playerReady = true
      this.loading = false
      // 计时器重新开始，避免加载时间过长影响计时
      if (this.pollMode) {
        this.pollGroupTime = 0
      }
    },
    videoError (e) {
      this.error = e || '播放器错误'
      this.loading = false
      this.pollMode = false
    },
    // 播放视频:获取url+播放源设置
    // async setVideo(assetNo, pollGroupTag) {
    //     if (!pollGroupTag) {
    //         this.isPollGroup = false;
    //         this.pollMode = false;
    //     }
    //     this.loading = true;
    //     const url = await this.getVideoUrl(assetNo);
    //     if (url && !this.error) {
    //         this.url = url;
    //         this.$nextTick(() => {
    //             if (this.$refs.videoPlayerCore) {
    //                 this.$refs.videoPlayerCore.setPlayerSrc({
    //                     url: '/iscvideo/http-flv' + new URL(url).pathname
    //                 });
    //             } else {
    //                 this.error = '视频播放失败：播放器未就绪';
    //             }
    //         });
    //     } else if (url === '') {
    //         this.error = '返还视频流地址为空';
    //         this.loading = false;
    //     }
    // },
    setVideo (assetNo, pollGroupTag) {
      if (!pollGroupTag) {
        this.isPollGroup = false
        this.pollMode = false
      }
      this.loading = true
      //  const url = await this.getVideoUrl(assetNo);
      // const url = '/iscvideo/http-flv/live/A010102-00001.flv'
      const url = this.videoUrl
      console.log(this.videoUrl, url)
      if (url && !this.error) {
        this.url = url
        this.$nextTick(() => {
          if (this.$refs.videoPlayerCore) {
            this.$refs.videoPlayerCore.setPlayerSrc({
              // url: '/iscvideo/http-flv' + new URL(url).pathname
              url: url
            })
          } else {
            this.error = '视频播放失败：播放器未就绪'
          }
        })
      } else if (url === '') {
        this.error = '返还视频流地址为空'
        this.loading = false
      }
    },
    // 全屏切换
    toggleFullscreen () {
      const elem = document.getElementById(this.flvJsId + 'card')
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
          this.$message.error('全屏失败：' + err)
        })
      } else {
        document.exitFullscreen().catch()
      }
    },

    // 截屏
    capture () {
      if (this.playerReady) {
        this.$refs.videoPlayerCore.capture()
      }
    },
    // 开启云台控制
    async control () {
      this.controlling = !this.controlling
    },
    // 获取视频流URL
    async getVideoUrl (assetNo) {
      this.error = ''
      let url
      try {
        const { data } = await this.$http.get(
          this.$myApi.monitor.camUrl,
          {
            params: {
              assetNo,
              protocol: 'HTTP_FLV',
              streamType: 'MAIN'
            }
          }
        )
        url = data
      } catch (e) {
        this.error = '获取视频流地址失败：' + e
        this.loading = false
      }
      return url
    },
    // 获取轮显组组信息
    async getPollGroupMessage (id) {
      this.error = ''
      try {
        const { data } = await this.$http.post(
          this.$myApi.monitor.pullGroup,
          {
            camId: '',
            pollGroupId: id || Number(this.layoutData.value),
            protocol: 'HTTP_FLV',
            streamType: 'MAIN'
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        )
        return data
      } catch (e) {
        this.error = '获取轮显组信息失败:' + e
      }
    },
    async setPollGroup (id) {
      this.isPollGroup = true
      this.pollMode = false
      this.pollGroupTime = 0
      const data = await this.getPollGroupMessage(id)
      if (data && data.camVoList && data.camVoList.length > 0) {
        this.pollGroupData.camVoList = data.camVoList
        if (data.cycle) {
          this.pollGroupData.cycle = data.cycle
        }
      }
      await this.pollGroupNext()
      this.pollMode = true
      this.pollGroupTimer()
    },
    // 轮显组开始/暂停轮巡
    async pollGroupTogglePlay () {
      this.pollMode = !this.pollMode
      if (this.pollMode) {
        this.pollGroupTimer()
      } else {
        this.pollGroupTime = 0
      }
    },
    // 切换轮显组
    async pollGroupNext () {
      const camList = this.pollGroupData.camVoList
      if (!camList || camList.length === 0) {
        return
      }
      if (this.pollGroupCurrentIndex === camList.length - 1) {
        this.pollGroupCurrentIndex = 0
      } else {
        this.pollGroupCurrentIndex += 1
      }
      this.loading = true
      await this.setVideo(
        camList[this.pollGroupCurrentIndex].assetNo,
        true
      )
      this.pollGroupTime = 0
    },
    // 轮显组计时
    pollGroupTimer () {
      if (!this.pollMode) {
        return
      }
      if (this.pollGroupTime < this.pollGroupData.cycle) {
        this.pollGroupTime++
      } else {
        this.pollGroupNext()
      }
      setTimeout(() => {
        this.pollGroupTimer()
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/variables";
.video-card {
  color: #ffffff;
  border: solid 2px black;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transition: 0.3s;
  background-color: #252525;
  video {
    background-color: #252525;
  }
  .ellipsis {
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .center-holder {
    font-size: 16px;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    user-select: none;
    text-align: center;
    /*color: grey;*/
    transform: translateY(-50%) translateX(-50%);
  }
  .icon {
    color: white;
    user-select: none;
    cursor: pointer;
    &.able {
      color: $app-primary-color;
    }
  }
  &.active {
    border-color: $app-primary-color;
  }
  &-footer {
    height: 36px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.3s;
    z-index: 12;
    box-sizing: border-box;
    &.freeze {
      opacity: 1;
    }
  }
  &-mask,
  &-core {
    height: 100%;
    width: 100%;
    left: 250px;
    top: 50px;
  }
  &-mask {
    z-index: 11;
  }
  &-core {
    z-index: 10;
  }
  &:hover {
    .video-card-footer {
      opacity: 1;
    }
  }
}
</style>
