<template>
    <video
        :id="flvJsId"
        class="flv-js-custom"
        crossorigin="anonymous"
        :controls="controls"
        muted
        disablePictureInPicture
        oncontextmenu="return false"
        @play="playHandler"
        @pause="pauseHandler"
        @error="error($event)"
        @loadeddata="loadeddata($event)"
        @timeupdate="timeupdate($event)"
        @loadedmetadata="loadedmetadata($event)"
    ></video>
</template>

<script>
export default {
  name: 'Core',
  props: {
    flvJsId: {
      type: String,
      default: 'demo'
    },
    controls: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    player: null,
    srcWidth: 0,
    srcHeight: 0,
    interval: null
  }),
  watch: {},
  beforeDestroy () {
    this.dispose()
  },
  created () {},
  methods: {
    playHandler () {
      this.$emit('play')
    },
    pauseHandler () {
      this.$emit('pause')
    },
    dispose () {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      if (this.player) {
        this.player.pause()
        this.player.unload()
        this.player.detachMediaElement()
        this.player.destroy()
        this.player = null
      }
    },
    requestFullscreen () {
      if (this.player) {
        document.getElementById(this.flvJsId).requestFullscreen()
      }
    },
    exitFullScreen () {
      if (this.player) {
        document.getElementById(this.flvJsId).exitFullScreen()
      }
    },
    loadedmetadata (e) {
      this.srcWidth = e.target.videoWidth
      this.srcHeight = e.target.videoHeight
    },
    loadeddata (e) {
      this.$emit('ready', e.target)
    },
    timeupdate (e) {
      this.$emit('timeupdate', e.target.currentTime)
    },
    sync () {
      const video = document.getElementById(this.flvJsId)
      if (!video || !this.player) {
        return
      }
      if (!video.buffered.length) {
        return
      }
      const end = video.buffered.end(0)
      const diff = end - video.currentTime
      if (diff <= 0) {
        this.player.pause()
        this.player.unload()
        this.player.load()
        this.player.play()
      }
      if (diff >= 3) {
        console.info('缓存大于3s, ' + this.flvJsId + '同步时间轴')
        video.currentTime = end - 0.5
      }
      /* if (video) {
                let buffered = video.buffered;
                if (buffered.length > 0) {
                    let end = buffered.end(0);
                    if (end - video.currentTime > 0.15) {
                        video.currentTime = end - 0.1;
                    }
                }
            } */
    },
    error (e) {
      if (e.target) {
        this.$emit('error', '视频资源加载失败：' + e.target.message)
      } else {
        this.$emit('error', e)
      }
    },
    // 截图
    capture () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const videoElement = document.getElementById(this.flvJsId)
      canvas.width = this.srcWidth
      canvas.height = this.srcHeight
      ctx.drawImage(videoElement, 0, 0, this.srcWidth, this.srcHeight)
      canvas.toBlob(
        function (blob) {
          const eleLink = document.createElement('a')
          eleLink.download =
                        new Date() + '截图'
          eleLink.style.display = 'none'
          // 字符内容转变成blob地址
          eleLink.href = URL.createObjectURL(blob)
          // 触发点击
          document.body.appendChild(eleLink)
          eleLink.click()
          // 然后移除
          document.body.removeChild(eleLink)
        },
        'image/png',
        1
      )
    },
    // eslint-disable-next-line no-unused-vars
    async setPlayerSrc ({ url, type = 'flv' }) {
      if (!url) {
        throw new Error('缺少视频源')
      }
      if (this.player) {
        this.dispose()
      }
      const videoElement = document.getElementById(this.flvJsId)
      this.player = this.$flvjs.createPlayer({
        type,
        url,
        isLive: true
      })
      this.player.attachMediaElement(videoElement)
      this.player.load()
      if (this.autoPlay) {
        this.player.play()
      }
      this.player.on('error', e => {
        this.error(e)
      })
      if (type === 'flv') {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
        this.interval = setInterval(() => {
          this.sync()
        }, 1000)
      }
    },
    play () {
      if (this.player) {
        this.player.play()
      }
    },
    pause () {
      if (this.player) {
        this.player.pause()
      }
    }
  }
}
</script>

<style lang="scss">
.flv-js-custom {
    /*width: 612px;*/
    /*height: 470px;*/
    //object-fit: fill;
    background-color: #383838;
    outline: none;
}
</style>
