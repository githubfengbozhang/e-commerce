<template>
  <div class="lay-header">
    <div class="icon">
      <i class="iconfont header-icon1">&#xe67f;</i>
      <i class="iconfont header-icon">&#xe637;</i>
    </div>
    <div class="icon">

    </div>
    <div class="title">天下大足电商直播基地智慧管理系统</div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'LayHeader',
  data () {
    return {
      headerImg: require("../../../assets/header/logo1.png"),
      headerImg1: require("../../../assets/header/sjt.png"),
    }
  }
}
</script>
<style lang="sass">
@import './index.scss'
</style>