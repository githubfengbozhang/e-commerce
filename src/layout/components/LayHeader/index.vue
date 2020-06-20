<template>
  <div class="lay-header">
    <div class="icon">
      <i class="iconfont">&#xe67f;</i>
      <i class="iconfont">&#xe637;</i>
      <img :src="headerImg" />
    </div>
    <div class="title">天下大足电商直播基地智慧管理系统</div>
    <div class="time">{{time}}</div>
  </div>
</template>

<script>
export default {
  name: 'LayHeader',
  data () {
    return {
      headerImg: require("../../../assets/img/zlj.png"),

      time: this.initTime()
    }
  },
  mounted () {
    let that = this
    setInterval(() => {
      that.time = that.initTime()
    }, 1000)

  },
  methods: {
    initTime () {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1 > 9 ? (time.getMonth() + 1) : `0${time.getMonth() + 1}`
      let day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
      let hours = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`
      let minutes = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`
      let seconds = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`
      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>
<style lang="sass">
@import './index.scss'
</style>